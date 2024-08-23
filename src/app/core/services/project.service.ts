import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, merge, Observable, Subject, switchMap} from "rxjs";
import {Project} from "../model/project";
import {Message} from "../model/message";
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
// declare var SockJS:any;
// declare var Stomp:any;


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8081/project-service/projects'; // Update the base URL with your API endpoint
  private baseUrl2 = 'http://localhost:8081/project-service/messages'; // Update the base URL with your API endpoint

  private stompClient: any;
  private messagesSubject: Subject<Message[]> = new Subject<Message[]>();
  private projectCountSubject: any = new BehaviorSubject<number>(0);
  private messageSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  projectCount$ = this.projectCountSubject.asObservable();


  constructor(private http: HttpClient) {
  }


  initializeWebSocketConnection() {
    const serverUrl = '//localhost:8080/ichat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

  }
  joinRoom(projectId: number) {
    this.initializeWebSocketConnection();
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(`/topic/messages/${projectId}`, (messages: any) => {
        if (messages.body) {
          console.log("Connected to web socket: " + messages.body);
          const messageContent = JSON.parse(messages.body);
          console.log("message" + messageContent);

          // Access messageSubject using arrow function to maintain 'this' context
          const currentMessage = this.messageSubject.getValue();
          currentMessage.push(messageContent);

          // Update messageSubject using arrow function to maintain 'this' context
          this.messageSubject.next(currentMessage);
        }
      });
    });
  }

  leaveRoom(projectId: number): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log(`Disconnected from project ${projectId}`);
        const ws = null;
        this.stompClient = null;
      });
    }
  }
  getProjectsByClientId(clientId: number): Observable<Project[]> {
    const url = `${this.baseUrl}/client/${clientId}`; // Assuming your API endpoint is /projects/findByClientId/{clientId}
    return this.http.get<Project[]>(url);
  }
  getProjectsCountByClientId(clientId: number): void {
    const url = `${this.baseUrl}/count/${clientId}`;
    this.http.get<number>(url).subscribe(count => {
      this.projectCountSubject.next(count);
    });
  }
  getProjectById(id: number): Observable<Project> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Project>(url);
  }
  getProjectId(solutionId: number, clientId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getProjectId?solutionId=${solutionId}&clientId=${clientId}`);
  }
  sendMessage(projectId: number, username: string, content: string): void {
    const message: Message = {
      project: { id: projectId },
      sender: username,
      content: content
    };
    this.stompClient.send('/app/ichat', {}, JSON.stringify(message));
  }

  //for chat
  getOldMessages(projectId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl2}/${projectId}`);
  }

  listenForNewMessages(projectId: number): Observable<Message[]> {
    return new Observable<Message[]>(observer => {
      this.stompClient.subscribe(`/topic/messages/${projectId}`, (message: any) => {
        const newMessage: Message = JSON.parse(message.body);
        console.log("real time message" + newMessage);
        observer.next([newMessage]);
      });
    });
  }


  getMessageSubject(){
    return this.messageSubject.asObservable();
  }
}
