import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(private authService : AuthService, private router: Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const formDataJson = JSON.stringify(formData);
      console.log(formDataJson);
      this.isLoading = true;

    // Simulate an API call (replace this with your actual API call)
      setTimeout(() => {
      // After API call is complete, set isLoading back to false
        this.isLoading = false;
      }, 2000);

      setTimeout(() => {
        // After API call is complete, set isLoading back to false
          this.authService.login();
          this.router.navigate(['/home']);
      }, 3000);
    }
  }
}
