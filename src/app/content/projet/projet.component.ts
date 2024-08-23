import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from "../../core/model/project";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../core/services/project.service";
import {DatePipe} from "@angular/common";
import {UserService} from "../../core/services/user.service";
import {Utilisateur} from "../../core/model/utilisateur.model";
import {Message} from "../../core/model/message";
import {AuthService} from "../../core/services/auth.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
  providers: [DatePipe]
})
export class ProjetComponent implements OnInit, OnDestroy {

  projectId!: number;
  project!: Project;
  currentDate: string="";
  manager!:Utilisateur ;
  messageList: Message[] = [];
  firstMessages: Message[] = [];
  newMessage: string = '';
  showAllMessages: boolean = false;
  private messagesSubscription: Subscription | null = null;


  isLoggedIn:boolean = false;
  user:Utilisateur = {} as Utilisateur;


  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private datePipe: DatePipe,
              private authService:AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

      this.currentDate = this.getCurrentDate();


    this.authService.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        if(this.isLoggedIn){
        this.route.params.subscribe(params => {
          this.projectId = +params['id']; // Get the project ID from the route
          this.getProjectById(this.projectId); // Call the method to fetch the project
          this.projectService.joinRoom(this.projectId);
          this.projectService.getOldMessages(this.projectId).subscribe(messages => {
            this.messageList = [...messages];
            const messagesTemp = [...messages];
            this.firstMessages = messagesTemp.reverse().slice(0, 4);
          });

        });}
      }
    );
    this.userService.currentUser.subscribe(
      (user: Utilisateur) => {
        this.user = user;
        console.log("from nav bar", this.user?.username); // Ensure user is defined before accessing its properties
      }
    );
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.userService.currentUserValue;

    this.lisenerMessage();

  }

  getProjectById(id: number): void {
    this.projectService.getProjectById(id)
      .subscribe(project => {
        this.project = project;
        if (project && project.manager_id) {
          this.userService.getUserById(project.manager_id)
            .subscribe(manager => this.manager = manager);
            console.log("manager :" + this.manager);
        }
      });
  }


  private getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'MMMM dd yyyy');
    return formattedDate || '';
  }


  sendMessage(content: string): void {
    if (this.project && this.project.id) {
      this.projectService.sendMessage(this.project.id, this.user.username, content);
      this.newMessage="";

    } else {
      console.error("Project ID is undefined.");
    }
  }
  lisenerMessage() {
   this.messagesSubscription= this.projectService.getMessageSubject().subscribe((messages: any) => {
      this.messageList.push(...messages);
      const messagesTemp = [...this.messageList];
      this.firstMessages = messagesTemp.reverse().slice(0,4);
    });
  }
  showAll() {
    this.showAllMessages = true;
  }
  showLess(){
    this.showAllMessages = false;

  }

  ngOnDestroy(): void {
    this.projectService.leaveRoom(this.projectId);
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
      this.messagesSubscription = null;
    }
  }

}
