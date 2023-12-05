import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from '../../services/alerts/popup.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  updatePasswordForm: FormGroup;
  loading: boolean = false;
  success: boolean = false;

  constructor(private userService: UserService, 
             private router: Router, private _bottomSheetRef: MatBottomSheetRef<UpdatePasswordComponent>,
            private fb:FormBuilder, 
            private popup: PopupService) {
    this.updatePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
    });
  }

  updatePassword() {
    this.loading = true;
    if (this.updatePasswordForm.valid) {
      const passwordData = this.updatePasswordForm.value;
      this.userService.updatePassword(passwordData).subscribe(
        (response) => {
          this.loading = false;
          // this._bottomSheetRef.dismiss();
          this.success = true;
          this.popup.openSnackBar({
            message : "Password updated successfully!",
            status : 'success',
            duration : 3000
          });
        },
        (error) => {
          this.loading = false;
          this.popup.openSnackBar({
            message : "Error in updating password!",
            status : 'error',
            duration : 3000
          });
        }
      );
    }
  }

}
