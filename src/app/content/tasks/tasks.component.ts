import {Component, OnInit} from '@angular/core';
import {Project} from "../../core/model/project";
import {filter, forkJoin, map, Observable, of, switchMap} from "rxjs";
import {ProjectService} from "../../core/services/project.service";
import {Utilisateur} from "../../core/model/utilisateur.model";
import {AuthService} from "../../core/services/auth.service";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{
  projects$!: Observable<Project[]>;
  isLoggedIn:boolean = false;
  user:Utilisateur = {} as Utilisateur;
  manager:Array<Utilisateur>=[];
  searchTerm: string = '';
  sortBy: string = '';
  sortDir: string = 'asc';

  constructor(private projectService: ProjectService,private authService:AuthService,private userService : UserService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
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
      this.getProjectsByClientId(this.user.id);
    }
  }
  getProjectsByClientId(clientId: number): void {
    this.projectService.getProjectsByClientId(clientId).pipe(
      filter(projects => projects !== null),
      switchMap(projects => {
        const observables = projects.map(project => {
          if (project && project.manager_id) {
            return this.userService.getUserById(project.manager_id).pipe(
              map(manager => {
                if (manager && manager.username) {
                  project.manager_name = manager.username;
                }
                return project;
              })
            );
          } else {
            return of(project);
          }
        });
        return forkJoin(observables);
      })
    ).subscribe(
      projects => {
        this.projects$ = of(projects);
        console.log("Projects with manager names:", projects);
      },
      error => {
        console.error("Error fetching projects:", error);
      }
    );
  }


  getManagerName(manager_id: number) {
    const manager = this.manager.find(m => m.id === manager_id);
    return manager ? manager.username : '';
  }
  searchProjects() {
    if (this.projects$ && this.searchTerm) {
      this.projects$ = this.projects$.pipe(map(projects =>
        projects.filter(project =>
          (project.name?.toLowerCase()?.includes(this.searchTerm.toLowerCase()) ?? false) ||
          (project.description?.toLowerCase()?.includes(this.searchTerm.toLowerCase()) ?? false) ||
          (project.stage?.toLowerCase()?.includes(this.searchTerm.toLowerCase()) ?? false) ||
          (this.getManagerUsername(project.manager_id)?.toLowerCase()?.includes(this.searchTerm.toLowerCase()) ?? false)
        )
      ));
    }
  }
  getManagerUsername(manager_id: number | undefined): string | undefined {
    if (typeof manager_id === 'number') {
      const manager = this.manager.find(m => m.id === manager_id);
      return manager ? manager.username : undefined;
    }
    return undefined;
  }

  sortProjects() {
    if (this.projects$) {
      this.projects$ = this.projects$.pipe(
        map((projects) => {
          if (!this.sortBy) return projects; // If sortBy is not provided, return projects as it is
          return projects.slice(0).sort((a, b) => {
            let aValue = (a as any)[this.sortBy];
            let bValue = (b as any)[this.sortBy];
            if (typeof aValue === 'string') {
              aValue = aValue.toLowerCase();
            }
            if (typeof bValue === 'string') {
              bValue = bValue.toLowerCase();
            }
            if (this.sortDir === 'asc') {
              return aValue > bValue ? 1 : -1;
            } else {
              return aValue < bValue ? 1 : -1;
            }
          });
        })
      );
    }
  }

  // Method to set sorting direction
  sortDirection(event: any) {
    const direction = event.target.value;
    this.sortDir = direction;
    this.sortProjects();
  }


}
