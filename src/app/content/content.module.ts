import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home/home.component';
import { ProjetComponent } from './projet/projet.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { SolutionsComponent } from './solutions/solutions.component';
import { PrincipesComponent } from './principes/principes.component';
import { VisionComponent } from './vision/vision.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { TableBordComponent } from './table-bord/table-bord.component';
import { AuthService } from '../core/services/auth.service';
import {SolutionComponent} from "./solution/solution.component";
import {AuthInterceptor} from "../core/interceptors/auth.interceptor";
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { VideothequeComponent } from './videotheque/videotheque.component';
import { EvenementsComponent } from './evenements/evenements.component';
import {SearchPipe} from "../core/pipe/search.pipe";
import {CoreModule} from "../core/core.module";
import {SortPipe} from "../core/pipe/sort.pipe";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {AuthGuard} from "../core/guard/AuthGuard";

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    ProjetComponent,
    TasksComponent,
    SolutionComponent,
    LoginComponent,
    SolutionsComponent,
    EvenementsComponent,
    PrincipesComponent,
    VisionComponent,
    PasswordResetComponent,
    TableBordComponent,
    BlogComponent,
    BlogDetailsComponent,
    VideothequeComponent,
    SearchPipe,
    SortPipe,


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ContentRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    ButtonModule,
    CoreModule,
    ConfirmDialogModule,
    ToastModule,

  ],
  exports: [ContentComponent],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
    MessageService,
    ConfirmationService,
    AuthGuard]
})
export class ContentModule {}
