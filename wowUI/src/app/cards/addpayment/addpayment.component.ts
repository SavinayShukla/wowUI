import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PopupService } from '../../services/alerts/popup.service';
import { PaymentService } from '../../services/payment.service';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'app-addpayment',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './addpayment.component.html',
  styleUrl: './addpayment.component.css'
})
export class AddpaymentComponent {
  loading:boolean = false;
  addPaymentForm: FormGroup;

  constructor(private metadataService: MetadataService, private paymentService: PaymentService, private fb: FormBuilder, private popup : PopupService) {
    this.addPaymentForm = this.fb.group({
      payment_method: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      card_name: ['', [Validators.required]],
      card_exp_date: ['', [Validators.required]],
      card_zipcode: ['', [Validators.required]],
    });
  }

  addPayment() {
    this.loading = true;
    if (this.addPaymentForm.valid) {
      const paymentData = this.addPaymentForm.value;
      this.paymentService.addPayment(paymentData).subscribe(
        (response) => {
          this.loading = false;
          //Call the API again,
          this.metadataService.fetchMetaData().subscribe((metadata) => {
            //Update Observable.
          this.metadataService.updateMetaData(metadata);
          });
          // this._bottomSheetRef.dismiss();
          // this.success = true;
          this.paymentService.fetchPayments();
          this.popup.openSnackBar({
            message : "Added a payment method successfully!",
            status : 'success',
            duration : 3000
          });
        },
        (error) => {
          this.loading = false;
          this.popup.openSnackBar({
            message : "Error in adding a payment method!",
            status : 'error',
            duration : 3000
          });
        }
      );
    }
  }
}
