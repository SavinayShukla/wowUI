import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";

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

  constructor(private router: Router, public _snackBar: MatSnackBar, private fb: FormBuilder) { 
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
      const formData = this.regForm.value;
      const formDataJson = JSON.stringify(formData);
      console.log(formDataJson);

      this.isLoading = true;

    // Simulate an API call (replace this with your actual API call)
      setTimeout(() => {
      // After API call is complete, set isLoading back to false
        this.isLoading = false;
        this.isRegistered = true;
      }, 2000);

      setTimeout(() => {
        // After API call is complete, set isLoading back to false
          this.router.navigate(['/home']);
      }, 3000);
    }
  }

  popup(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass : '.alert-type-fill-info',
      duration: 5000,
      verticalPosition: "top"
    });
  }

}
