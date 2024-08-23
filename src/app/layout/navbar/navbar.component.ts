import {Component, OnInit,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../core/services/auth.service";
import {Utilisateur} from "../../core/model/utilisateur.model";
import {UserService} from "../../core/services/user.service";
import {ProjectService} from "../../core/services/project.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{

isLoggedIn:boolean = false;
user:Utilisateur = {} as Utilisateur;
projectCount$!:Observable<number>;
  constructor(private router: Router,private authService:AuthService,private userService : UserService,private projectService : ProjectService) {}

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        console.log("loggdIn :" + loggedIn);
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
    if (this.isLoggedIn && this.user){
      this.projectService.getProjectsCountByClientId(this.user.id);
      this.projectCount$ = this.projectService.projectCount$;
      console.log("projet" + this.projectCount$)
    }
}
  toLogin() {
    this.router.navigateByUrl('/login');

  }
  toRegister() {
    this.router.navigateByUrl('/login');
    setTimeout(() => {
      this.authService.switchCardToRegister();
    }, 2);
  }
  toTableauBord() {
    this.router.navigateByUrl('/table-bord');
  }

  ToMarketplace() {
    this.router.navigateByUrl('/solutions');
  }

  toHome() {
    this.router.navigateByUrl('/');

  }
  logOut() {
    this.router.navigateByUrl('/');
    this.authService.logout();
    this.authService.isLoggedInSubject.next(false);


  }


  toTasks() {
    this.router.navigateByUrl('/tasks');

  }
}
