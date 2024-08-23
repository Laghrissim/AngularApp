import { HttpClient } from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/core/dto/user-dto.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterDto } from '../../core/dto/register-dto';
import { MailRequest } from 'src/app/core/dto/mail-request.model';
import { LoginDTO } from 'src/app/core/dto/login-dto.model';
import { tap } from 'rxjs';
import { ContactDto } from 'src/app/core/dto/contact-dto';
import { ContactService } from 'src/app/core/services/contact.service';
import {UserService} from "../../core/services/user.service";
import { Utilisateur } from 'src/app/core/model/utilisateur.model';
import {ProjectService} from "../../core/services/project.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registrationForm!: FormGroup;
  loginForm!: FormGroup;
  forgotpasswordForm!: FormGroup;
  fieldTextType!: boolean;
  repeatFieldTextType!: boolean;
  submitted: boolean = false;
  backendError: string = '';
  registrationError: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private contactService: ContactService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}
  contacts: ContactDto[] = [];

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initRegForm();
    this.initLoginForm();
    this.initForgotPasswordForm();
    this.loadContacts();
  }

  switchCard(): void {
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

  switchCardToPasswordChange(): void {
    const loginCard = document.querySelector<HTMLElement>(
      '.container .card:nth-child(1)'
    );
    const passwordChangeCard = document.querySelector<HTMLElement>(
      '.container .card:nth-child(3)'
    );

    if (loginCard && passwordChangeCard) {
      if (loginCard.style.display === 'none') {
        loginCard.style.display = 'block';
        passwordChangeCard.style.display = 'none';
      } else {
        loginCard.style.display = 'none';
        passwordChangeCard.style.display = 'block';
      }
    }
  }

  validatePasswordMatch = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = this.registrationForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;

    if (password !== passwordConfirm) return { passwordMatch: false };

    return null;
  };

  initRegForm() {
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', [Validators.required, this.validatePasswordMatch]],
      selectedContactId: [null, Validators.required],
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  initForgotPasswordForm() {
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onLogin() {
    this.submitted = true;
    this.backendError = '';
    if (this.loginForm.invalid) {
      return;
    }
    let loginDTO: LoginDTO = this.loginForm.value;
    this.authService.login(loginDTO).subscribe(async (res: any) => {
      this.storeToken(res.accessToken);
      this.router.navigateByUrl('/home');
      this.getUserById(res.userId);
      this.authService.isLoggedInSubject.next(true);
    },
      (error: any) => {
        // Handle backend error here
        if (error.status === 400 || error.status === 401) {
          this.backendError = 'Invalid email or password';  // Customize the message as needed
        } else {
          this.backendError = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  storeToken(token: any) {
    sessionStorage.setItem('token', token);
    console.table(sessionStorage);
  }

  onRegister() {
    this.submitted = true;
    this.registrationError = '';
    if (this.registrationForm.invalid) {
      return;
    }
    let userDTO: RegisterDto = {
      username: this.registrationForm.get('username')?.value ?? '',
      email: this.registrationForm.get('email')?.value ?? '',
      password: this.registrationForm.get('password')?.value ?? '',
      contactId: this.registrationForm.get('selectedContactId')?.value ?? null,
    };
    console.log('conatctId' + userDTO.contactId);
    this.authService.register(userDTO).subscribe(async (res: any) => {
      this.storeToken(res.accessToken);
      this.getUserById(res.userId);
      this.authService.isLoggedInSubject.next(true);
      this.router.navigateByUrl('/home');
    },
      (error: any) => {
        // Handle backend error here
        if (error.status === 409) {
          const errorMessage = error.error.message;
          this.registrationError = errorMessage || 'Registration failed due to conflict. Please try again.';  // Customize the message as needed
        } else {
          this.registrationError = 'An unexpected error occurred. Please try again later.';
        }
      }

    );
  }

  sendMailIfUserExists() {
    this.submitted = true;
    if (this.forgotpasswordForm.invalid) {
      return;
    }
    let userDTO: MailRequest = {
      email: '',
      username: '',
    };
    if (this.forgotpasswordForm && this.forgotpasswordForm.get('email')) {
      userDTO.email = this.forgotpasswordForm.get('email')?.value;
      console.log(userDTO.email);
      this.authService
        .sendMailIfUserExists(userDTO)
        .pipe(
          tap((res: any) => {
            this.authService.setEmail(userDTO.email);
          })
        )
        .subscribe();
    }
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (data: ContactDto[]) => {
        this.contacts = data;
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  switchCardToRegister(): void {
    const registerCard = document.querySelector<HTMLElement>(
      '.container .card:nth-child(2)'
    );
    const passwordChangeCard = document.querySelector<HTMLElement>(
      '.container .card:nth-child(3)'
    );

    if (registerCard && passwordChangeCard) {
      if (passwordChangeCard.style.display === 'none') {
        passwordChangeCard.style.display = 'block';
        registerCard.style.display = 'none';
      } else {
        passwordChangeCard.style.display = 'none';
        registerCard.style.display = 'block';
      }
    }
  }

  private getUserById(id: number) {
    this.userService.getUserById(id).subscribe(
      (user: Utilisateur) => {
        this.userService.setUser(user); // Store user in the service
        this.projectService.getProjectsCountByClientId(user.id);
        console.log(user); // Do something with the user data
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
