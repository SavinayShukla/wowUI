import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from '../../services/user.service';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regForm: FormGroup;
  submitted = false;
  isLoading = false;
  isRegistered = false;
  error : string = "";

  constructor(private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar, private userService: UserService) { 
    this.regForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.regForm.valid) {
      this.isLoading = true;
      const formData = this.regForm.value;
      // const formDataJson = JSON.stringify(formData);
      this.userService.saveUser(formData).subscribe(
        (response) => {
          console.log('User registration successful', response);
          this.isLoading = false;
          this.router.navigate(['/home']);
          // Optionally, you can navigate to another page or perform additional actions here
        },
        (error) => {
          console.log(error);
          this.error = "It is not working!";
          this.openSnackBar();
          this.isLoading = false;
        }
      );
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(DefaultAlertComponent, {
      data: this.error,
      duration: 3000
    });
  }
}
