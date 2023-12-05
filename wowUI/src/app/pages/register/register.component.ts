import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from '../../services/user.service';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regForm: FormGroup;
  submitted = false;
  isLoading = false;
  isRegistered = false;
  error : string = "";

  constructor(private router: Router, private fb: FormBuilder, private alertService : PopupService, private userService: UserService) { 
    this.regForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address_street: ['', Validators.required],
      address_city: ['', Validators.required],
      address_state: ['', Validators.required],
      address_zipcode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.regForm.valid) {
      this.isLoading = true;
      const signUpData = this.regForm.value;
      delete signUpData.confirmPassword;

      this.userService.registerUser(signUpData).subscribe(
        (response) => {
          this.isLoading = false;
          this.alertService.openSnackBar({
            message : response.message,
            status : 'success',
            duration : 5000
          });
          this.router.navigate(['/login']);
          // Optionally, you can navigate to another page or perform additional actions here
        },
        (error) => {
          console.log(error);
          this.error = "It is not working!";
          this.alertService.openSnackBar({
            message : error.error.message,
            status : 'error',
            duration : 3000
          });
          this.isLoading = false;
        }
      );
    }
  }
}
