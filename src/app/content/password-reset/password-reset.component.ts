import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MailRequest } from 'src/app/core/dto/mail-request.model';
import { PasswordResetDTO } from 'src/app/core/dto/password-reset-dto.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  pwdresetForm!: FormGroup;

  fieldTextType!: boolean;
  repeatFieldTextType!: boolean;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initResetForm();
  }

  initResetForm() {
    this.pwdresetForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', [Validators.required, this.validatePasswordMatch]],
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  validatePasswordMatch = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = this.pwdresetForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;

    if (password !== passwordConfirm) return { passwordMatch: true };

    return { passwordMatch: false };
  };

  resetPassword() {
    const passwordResetDTO: PasswordResetDTO = {
      password: this.pwdresetForm.get('password')?.value,
      email: this.authService.getEmail(),
    };

    this.authService
      .resetPassword(passwordResetDTO)
      .subscribe(async (res: any) => {
        this.router.navigateByUrl('/login');
      });
  }
}
