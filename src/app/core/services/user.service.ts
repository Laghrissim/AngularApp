import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable } from 'rxjs';
import {Utilisateur} from "../model/utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8081/auth-service/api/users';
  private currentUserSubject: BehaviorSubject<Utilisateur>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(initialUser);
  }

  public get currentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }

  setUser(user: Utilisateur): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as Utilisateur);
  }

  get currentUser(): Observable<Utilisateur> {
    return this.currentUserSubject.asObservable();
  }
}
