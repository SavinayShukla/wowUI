import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PopupService } from '../../services/alerts/popup.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatProgressBarModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  regForm: FormGroup;
  submitted = false;
  isLoading = false;
  isRegistered = false;
  error: string = "";
  states: { state: string; abbr: string }[] = [
    { state: 'Alabama', abbr: 'AL' },
    { state: 'Alaska', abbr: 'AK' },
    { state: 'Arizona', abbr: 'AZ' },
    { state: 'Arkansas', abbr: 'AR' },
    { state: 'California', abbr: 'CA' },
    { state: 'Colorado', abbr: 'CO' },
    { state: 'Connecticut', abbr: 'CT' },
    { state: 'Delaware', abbr: 'DE' },
    { state: 'Florida', abbr: 'FL' },
    { state: 'Georgia', abbr: 'GA' },
    { state: 'Hawaii', abbr: 'HI' },
    { state: 'Idaho', abbr: 'ID' },
    { state: 'Illinois', abbr: 'IL' },
    { state: 'Indiana', abbr: 'IN' },
    { state: 'Iowa', abbr: 'IA' },
    { state: 'Kansas', abbr: 'KS' },
    { state: 'Kentucky', abbr: 'KY' },
    { state: 'Louisiana', abbr: 'LA' },
    { state: 'Maine', abbr: 'ME' },
    { state: 'Maryland', abbr: 'MD' },
    { state: 'Massachusetts', abbr: 'MA' },
    { state: 'Michigan', abbr: 'MI' },
    { state: 'Minnesota', abbr: 'MN' },
    { state: 'Mississippi', abbr: 'MS' },
    { state: 'Missouri', abbr: 'MO' },
    { state: 'Montana', abbr: 'MT' },
    { state: 'Nebraska', abbr: 'NE' },
    { state: 'Nevada', abbr: 'NV' },
    { state: 'New Hampshire', abbr: 'NH' },
    { state: 'New Jersey', abbr: 'NJ' },
    { state: 'New Mexico', abbr: 'NM' },
    { state: 'New York', abbr: 'NY' },
    { state: 'North Carolina', abbr: 'NC' },
    { state: 'North Dakota', abbr: 'ND' },
    { state: 'Ohio', abbr: 'OH' },
    { state: 'Oklahoma', abbr: 'OK' },
    { state: 'Oregon', abbr: 'OR' },
    { state: 'Pennsylvania', abbr: 'PA' },
    { state: 'Rhode Island', abbr: 'RI' },
    { state: 'South Carolina', abbr: 'SC' },
    { state: 'South Dakota', abbr: 'SD' },
    { state: 'Tennessee', abbr: 'TN' },
    { state: 'Texas', abbr: 'TX' },
    { state: 'Utah', abbr: 'UT' },
    { state: 'Vermont', abbr: 'VT' },
    { state: 'Virginia', abbr: 'VA' },
    { state: 'Washington', abbr: 'WA' },
    { state: 'West Virginia', abbr: 'WV' },
    { state: 'Wisconsin', abbr: 'WI' },
    { state: 'Wyoming', abbr: 'WY' },
  ];

  constructor(private router: Router, private fb: FormBuilder, private alertService: PopupService, private userService: UserService) {
    this.regForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address_street: ['', Validators.required],
      address_city: ['', Validators.required],
      address_state: ['', [Validators.required, this.stateValidator()]],
      address_zipcode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    }, {
      validator: this.confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.regForm.valid) {
      this.isLoading = true;
      let requestBody = null;
      const selectedStateObject = this.states.find(state => state.state === this.regForm.get('address_state')?.value);
      if (selectedStateObject){
        requestBody = {
          first_name: this.regForm.get('first_name')?.value,
          last_name: this.regForm.get('last_name')?.value,
          email: this.regForm.get('email')?.value,
          phone: this.regForm.get('phone')?.value,
          password: this.regForm.get('password')?.value,
          address_street: this.regForm.get('address_street')?.value,
          address_city: this.regForm.get('address_city')?.value,
          address_state: selectedStateObject.abbr,
          address_zipcode: this.regForm.get('address_zipcode')?.value
        }
      }
      //   this.regForm.patchValue({ address_state: selectedStateObject.abbr }, { emitEvent: false });

      // const signUpData = this.regForm.value;
      // delete signUpData.confirmPassword;
      // console.log(signUpData);

      // if (selectedStateObject)
      //   this.regForm.patchValue({ address_state: selectedStateObject.abbr }, { emitEvent: false });

      this.userService.registerUser(requestBody).subscribe(
        (response) => {
          this.isLoading = false;
          this.alertService.openSnackBar({
            message: response.message,
            status: 'success',
            duration: 5000
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.error = "It is not working!";
          this.alertService.openSnackBar({
            message: error.error.message,
            status: 'error',
            duration: 3000
          });
          this.isLoading = false;
        }
      );
    }
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }
      if (matchingControl.value === "") {
        matchingControl.setErrors({ required: true });
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  stateValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.value;
      if (!control) {
        return null;
      }
      const isValidState = this.states.some(state => state.state === control);
      return isValidState ? null : { invalidState: true };
    };
  }

}
