import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private userService: UserService, private authService: AuthService,
              private _snackBar: MatSnackBar, 
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
            this.openSnackBar("Login Successful!");
            // Optionally, you can navigate to another page or perform additional actions here
          },
          (error) => {
            this.openSnackBar(error);
            this.isLoading = false;
          }
        );
      }
    }
  }
  openSnackBar(data:any) {
    this._snackBar.openFromComponent(DefaultAlertComponent, {
      data: data,
      duration: 5000,
      // panelClass: ['success-snackbar']
    });
  }
}
