import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjetComponent } from './projet/projet.component';
import { TasksComponent } from './tasks/tasks.component';
import { SolutionComponent } from './solution/solution.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { PrincipesComponent } from './principes/principes.component';
import { VisionComponent } from './vision/vision.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TableBordComponent } from './table-bord/table-bord.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { VideothequeComponent } from './videotheque/videotheque.component';
import { EvenementsComponent } from './evenements/evenements.component';
import {AuthGuard} from "../core/guard/AuthGuard";

  const routes: Routes = [
    {
      path: '',
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        {
          path: 'home',
          component: HomeComponent,
          title: 'Home',
        },
        {
          path: 'project/:id', // Path for the project component
          component: ProjetComponent, // Load the ProjectComponent
          data: { title: 'Project' },
          canActivate: [AuthGuard]// Metadata for the route
        },
        {
          path: 'login',
          component: LoginComponent,
          title: 'Connexion',
        },
        {
          path: 'tasks', // Path for the project component
          component: TasksComponent,
          data: { title: 'Tasks' },
          canActivate: [AuthGuard]
        },
        {
          path: 'solution/:id', // Path for the project component
          component: SolutionComponent, // Load the ProjectComponent
          data: { title: 'solution' }, // Metadata for the route
        },
        {
          path: 'solutions', // Path for the project component
          component: SolutionsComponent,
          data: { title: 'solutions' },
        },
        {
          path: 'principes', // Path for the project component
          component: PrincipesComponent,
          data: { title: 'principes' },
        },
        {
          path: 'vision',
          component: VisionComponent,
          data: { title: 'Vision' },
        },
        {
          path: 'password/reset',
          component: PasswordResetComponent,
          data: { title: 'Apps Egov' },
        },
        {
          path: 'table-bord',
          component: TableBordComponent,
          data: { title: 'table de bord' },
        },
        {
          path: 'evenements',
          component: EvenementsComponent,
          data: { title: 'Événements' },
        },
        {
          path: 'blog', // Path for the project component
          component: BlogComponent, // Load the ProjectComponent
          data: { title: 'blog' }, // Metadata for the route
        },
        {
          path: 'blog-details', // Path for the project component
          component: BlogDetailsComponent, // Load the ProjectComponent
          data: { title: 'blog-details' }, // Metadata for the route
        },
        {
          path: 'videotheque', // Path for the project component
          component: VideothequeComponent, // Load the ProjectComponent
          data: { title: 'Vidéothèque' }, // Metadata for the route
        },
      ],
    },
  ];
@NgModule({
  imports: [BrowserModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
