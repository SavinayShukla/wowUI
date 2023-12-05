import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  submitted = false;
  error:string = "";

  constructor(private userService: UserService, private popup : PopupService,
              private router: Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    const email = this.loginForm.get('email');
    const password = this.loginForm.get('password');
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.isLoading = true;
      if(email && password){
        this.userService.loginUser(loginData).subscribe(
          (response) => {
            // this.authService.login();
            this.isLoading = false;
            this.router.navigate(['/home']);
            this.popup.openSnackBar({
              message : "Login Successful!",
              status : 'success',
              duration : 3000
            });
            // Optionally, you can navigate to another page or perform additional actions here
          },
          (error) => {
            this.popup.openSnackBar({
              message : "Unauthorized!",
              status : 'error',
              duration : 3000
            });
            this.isLoading = false;
          }
        );
      }
    }
  }
}