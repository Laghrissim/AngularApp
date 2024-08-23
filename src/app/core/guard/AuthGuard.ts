import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, switchMap} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {ProjectService} from "../services/project.service";
import {Utilisateur} from "../model/utilisateur.model";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private projects!: Project[];
  user:Utilisateur = {} as Utilisateur;

  constructor(private authService: AuthService,
              private router: Router,
              private projectService: ProjectService,
              private userService: UserService) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }
    const isProjectRoute = state.url.startsWith('/project/');
    if (isProjectRoute) {

      // Get the projectId from the route parameters
      const projectId = route.paramMap.get('id');

      // Check if projectId is not null before proceeding
      if (projectId === null) {
        console.error('Invalid project ID in the URL');
        return this.router.createUrlTree(['/home']); // Redirect to home or any other desired route
      }

      return this.userService.currentUser.pipe(
        switchMap((user: Utilisateur) => {
          this.user = user;
          return this.projectService.getProjectsByClientId(this.user.id);
        }),
        map((projects: Project[]) => {
          this.projects = projects;
          const projectFound = this.projects.some(project => project.id === parseInt(projectId, 10));

          if (projectFound) {
            return true; // Allow access to the route
          } else {
            return this.router.createUrlTree(['/home']); // Redirect to home or any other desired route
          }
        }),
        // catchError((error) => {
        //   console.error('Error fetching user or projects:', error);
        //   return this.router.createUrlTree(['/home']); // Redirect to home or any other desired route
        // })
      );
    }
    return true;
  }

}
