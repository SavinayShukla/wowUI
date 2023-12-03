import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';

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

  constructor(private authService : AuthService, private _snackBar: MatSnackBar, private router: Router, private fb: FormBuilder){
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
      const formData = this.loginForm.value;
      // const formDataJson = JSON.stringify(formData);
      // console.log(formDataJson);
      this.isLoading = true;
      if(email && password){
        this.authService.checkLogin(email.value, password.value).subscribe(
          (response) => {
            this.authService.login();
            console.log('Login Successful', response);
            this.isLoading = false;
            this.router.navigate(['/home']);
            // Optionally, you can navigate to another page or perform additional actions here
          },
          (error) => {
            console.log(error);
            this.error = "Incorrect Email/Password!";
            this.openSnackBar();
            this.isLoading = false;
          }
        );
      }
    }
  }
  openSnackBar() {
    this._snackBar.openFromComponent(DefaultAlertComponent, {
      data: this.error,
      duration: 30000,
      panelClass: ['success-snackbar']
    });
  }
}
