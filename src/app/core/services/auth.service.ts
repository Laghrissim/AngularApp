import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/utilisateur.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, config, tap, throwError, BehaviorSubject } from 'rxjs';
import { UserDTO } from '../dto/user-dto.model';
import { LoginDTO } from '../dto/login-dto.model';
import { RegisterDto } from '../dto/register-dto';
import { MailRequest } from '../dto/mail-request.model';
import { PasswordResetDTO } from '../dto/password-reset-dto.model';
import { EmailDTO } from '../dto/email-dto.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  isLoggedInSubject: BehaviorSubject<boolean> ;
  email: string;

  constructor(private http: HttpClient, private router: Router) {
    this.email = localStorage.getItem('email') || '';
    const isLogged = this.isLoggedIn();
    this.isLoggedInSubject= new BehaviorSubject<boolean>(isLogged);
  }

  login(loginDTO: LoginDTO): Observable<LoginDTO> {
    return this.http
      .post<LoginDTO>(
        `http://localhost:8081/auth-service/api/auth/login`,
        loginDTO,
        httpOptions
      )
      .pipe(
        tap(async (res: any) => {
          console.log('response =>', res);
        })
      );
  }

  register(userDTO: RegisterDto): Observable<UserDTO> {
    return this.http
      .post<RegisterDto>(
        `http://localhost:8081/auth-service/api/auth/register`,
        userDTO,
        httpOptions
      )
      .pipe(
        tap(async (res: any) => {
          console.log('response =>', res);
          // this.isLogged=true;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  sendMailIfUserExists(userDTO: UserDTO): Observable<EmailDTO> {
    console.log('in');
    return this.http
      .post<EmailDTO>(
        `http://localhost:8081/auth-service/exists`,
        userDTO,
        httpOptions
      )
      .pipe(
        tap(async (res: any) => {}),
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  resetPassword(passwordResetDTO: PasswordResetDTO): Observable<any> {
    return this.http
      .post<any>(
        `http://localhost:8081/auth-service/password/reset`,
        passwordResetDTO,
        httpOptions
      );
  }
    switchCardToRegister(): void {
        const loginCard = document.querySelector<HTMLElement>(
            '.container .card:nth-child(1)'
        );
        const registerCard = document.querySelector<HTMLElement>(
            '.container .card:nth-child(2)'
        );

        if (loginCard && registerCard) {
            if (loginCard.style.display === 'none') {
                loginCard.style.display = 'block';
                registerCard.style.display = 'none';
            } else {
                loginCard.style.display = 'none';
                registerCard.style.display = 'block';
            }
        }
    }

  setEmail(mail: string) {
    localStorage.setItem('email', mail);
    this.email = mail;
    console.log('email in set method ', this.email);
  }

  getEmail() {
    console.log('email in get', localStorage.getItem('email'));

    return localStorage.getItem('email') || '';
  }

}
