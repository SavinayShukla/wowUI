import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UpdatePasswordComponent } from '../../cards/update-password/update-password.component';
import { AddpaymentComponent } from '../../cards/addpayment/addpayment.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PopupService } from '../../services/alerts/popup.service';
import { MetadataService } from '../../services/metadata.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../cards/confirm-delete/confirm-delete.component';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatBadgeModule, MatButtonModule, MatDialogModule,
    MatBottomSheetModule, UpdatePasswordComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  basicInfoForm: FormGroup;
  corpInfoForm: FormGroup;
  persInfoForm: FormGroup;
  staticInfo: any;
  paymentData: any;
  individual_customer : any;
  corporate_customer :any;
  metadata: any;

  constructor(private _bottomSheet: MatBottomSheet, private popup: PopupService, private paymentService: PaymentService, private dialog: MatDialog,
    private fb: FormBuilder, private userService: UserService, private metadataService: MetadataService) {
    this.basicInfoForm = this.fb.group({
      address_street: ['', [Validators.required]],
      address_state: ['', [Validators.required]],
      address_city: ['', [Validators.required]],
      address_zipcode: ['', [Validators.required]],
    });

    this.corpInfoForm = this.fb.group({
      emp_id: ['', [Validators.required]],
    });

    this.persInfoForm = this.fb.group({
      dl_number: ['', [Validators.required]],
      insurance_company: ['', [Validators.required]],
      insurance_policy_no: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    //Subscribe to metaData
    this.metadataService.metadata$.subscribe((metadata) => {
      this.metadata = metadata;
      this.paymentData = metadata.payment;
      this.individual_customer = metadata.individual_customer;
      this.corporate_customer = metadata.corporate_customer;
      this.staticInfo = metadata.user;

      //Populate Basic Form
      this.basicInfoForm.patchValue({
          address_street: this.staticInfo.address_street,
          address_state: this.staticInfo.address_state,
          address_city: this.staticInfo.address_city,
          address_zipcode: this.staticInfo .address_zipcode,
        });

      if (this.individual_customer.length != 0) {
        this.persInfoForm.patchValue({
          dl_number: this.individual_customer[0].dl_number,
          insurance_company: this.individual_customer[0].insurance_company,
          insurance_policy_no: this.individual_customer[0].insurance_policy_no,
        });
      }
      else if(this.corporate_customer.length != 0){
        this.corpInfoForm.patchValue({
          emp_id: this.corporate_customer[0].emp_id,
        });
      }
    });
    this.metadataService.fetchMetaData().subscribe((metadata) => {
      this.metadataService.updateMetaData(metadata);
    });
  }

  //Update Basic Information.
  updateBasicInfo() {
    if (this.basicInfoForm.valid) {
      const basicDataUpdated = this.basicInfoForm.value;
      basicDataUpdated['email'] = this.staticInfo.email;
      basicDataUpdated['phone'] = this.staticInfo.phone;
      basicDataUpdated['first_name'] = this.staticInfo.first_name;
      basicDataUpdated['last_name'] = this.staticInfo.last_name;
      basicDataUpdated['user_type'] = this.staticInfo.user_type;
      this.userService.updateBasicInfo(basicDataUpdated).subscribe(
        (response) => {
          this.popup.openSnackBar({
            message : "Basic Info Updated Successfully!",
            status : 'success',
            duration : 3000
          });
        },
        (error) => {
          this.popup.openSnackBar({
            message : "Error while updating basic info!",
            status : 'error',
            duration : 3000
          });
        }
      );
    }
  }

  //Update Personal Information.
  updatePersonalInfo() {
    if (this.persInfoForm.valid) {
      const persInfoUpdated = this.persInfoForm.value;
      this.userService.updateOtherInfo(persInfoUpdated).subscribe(
        (response) => {
          this.metadataService.fetchMetaData().subscribe((metadata) => {
            //Update Observable.
            this.metadataService.updateMetaData(metadata);
          });
          this.popup.openSnackBar({
            message : "Personal Info Updated Successfully!",
            status : 'success',
            duration : 3000
          });
        },
        (error) => {
          this.popup.openSnackBar({
            message : "Error while updating personal info!",
            status : 'error',
            duration : 3000
          });
        }
      );
    }
  }

  //Update Corporate Information.
  updateCorporateInfo() {
    if (this.corpInfoForm.valid) {
      const corpInfoUpdated = this.corpInfoForm.value;
      this.userService.updateOtherInfo(corpInfoUpdated).subscribe(
        (response) => {
          this.metadataService.fetchMetaData().subscribe((metadata) => {
            //Update Observable.
            this.metadataService.updateMetaData(metadata);
          });
          this.popup.openSnackBar({
            message : "Corporate Info Updated Successfully!",
            status : 'success',
            duration : 3000
          });
        },
        (error) => {
          this.popup.openSnackBar({
            message : "Error while updating corporate info!",
            status : 'error',
            duration : 3000
          });
        }
      );
    }
  }

  //Delete Payment
  deletePayment(id: any) {
    const deleteDialog = this.dialog.open(ConfirmDeleteComponent);
    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.paymentService.deletePayment(id).subscribe(
          (response) => {
            //Call the API again,
            this.metadataService.fetchMetaData().subscribe((metadata) => {
              //Update Observable.
              this.metadataService.updateMetaData(metadata);
            });
            this.popup.openSnackBar({
              message : "Your card was deleted successfully!",
              status : 'success',
              duration : 3000
            });
          },
          (error) => {
            this.popup.openSnackBar({
              message : "Error in deleting payment!",
              status : 'error',
              duration : 3000
            });
          }
        );
      }
    });
  }

  openUpdatePassword(): void {
    this._bottomSheet.open(UpdatePasswordComponent);
  }

  openAddCard(): void {
    this._bottomSheet.open(AddpaymentComponent);
  }
  
}
