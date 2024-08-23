import {Component, OnInit} from '@angular/core';
import { SolutionDto } from '../../core/dto/solution-dto';
import { SolutionService } from '../../core/services/solution.service';
import { Utilisateur } from '../../core/model/utilisateur.model';
import { AuthService } from '../../core/services/auth.service';
import {RequestDto} from "../../core/dto/request-dto";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";
import {ProjectService} from "../../core/services/project.service";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit{
  solutions: SolutionDto[] = [];
  firstSolutions: SolutionDto[]=[];
  isLoggedIn: boolean = false;
  user:Utilisateur = {} as Utilisateur;
  show:boolean=false;


  constructor(
    private solutionService: SolutionService,
    private authService: AuthService,
    private userService:UserService,
    private router: Router,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (!this.isLoggedIn) {
        this.getDefaultSolutionData();
      } else {
        this.getSolutionData();
      }
      console.log('loggdIn :' + loggedIn);
    });
    this.userService.currentUser.subscribe(
      (user: Utilisateur) => {
        this.user = user;
        console.log("from nav bar", this.user?.username); // Ensure user is defined before accessing its properties
      }
    );
    this.user = this.userService.currentUserValue;



    this.isLoggedIn = this.authService.isLoggedIn();
    this.getDefaultSolutionData();
  }

  getDefaultSolutionData(): void {
    this.solutionService.getAllSolutions().subscribe(
      (data: SolutionDto[]) => {
        this.solutions = data;
        this.firstSolutions= this.solutions.slice(0,3);
        console.log('Solutions:', this.solutions); // Log solutions data to console
      },
      (error) => {
        console.error('Error fetching solutions:', error);
      }
    );
  }
  getSolutionData(): void {
    this.solutionService.getAllSolutionsForUser().subscribe(
      (data: SolutionDto[]) => {
        this.solutions = data;
        this.firstSolutions=this.solutions.slice(0,3);
        console.log('Solutions:', this.solutions); // Log solutions data to console
      },
      (error) => {
        console.error('Error fetching solutions:', error);
      }
    );
  }

  souscrire(id: number) {
    if(this.isLoggedIn && this.user) {
      const requestData: RequestDto = {
        solution_id: id
      };

      this.solutionService.souscrire(requestData).subscribe(
        response => {
          console.log('Request submitted successfully:', response);
          this.getSolutionData();
          this.projectService.getProjectsCountByClientId(this.user.id);

        },
        error => {
          console.error('Error submitting request:', error);
          // Handle error as needed
        }
      );
    }
    else {
      this.router.navigateByUrl('/login');

    }
  }
  getProject(solutionId: number, clientId: number): void {
    this.projectService.getProjectId(solutionId, clientId)
      .subscribe(projectId => {
        console.log('Project ID:', projectId);
        this.router.navigate(['/project', projectId]);
      });
  }

  confirm1($event: MouseEvent,solutionId:number) {
    if ($event.target) {
      this.confirmationService.confirm({
        target: $event.target as EventTarget,
        message: 'Êtes-vous sûr de vouloir continuer?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous êtes abonné avec succès' });
          this.souscrire(solutionId);
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté', life: 3000 });
        }
      });
    }
  }

  showAll() {
    this.show=true;
  }
  showLess() {
    this.show=false;
  }
}
