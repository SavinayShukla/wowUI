import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmOrderComponent } from '../../cards/confirm-order/confirm-order.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MetadataService } from '../../services/metadata.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddpaymentComponent } from '../../cards/addpayment/addpayment.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatExpansionModule, ConfirmOrderComponent, MatBottomSheetModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedCarData: any;
  metadata: any;
  paymentData: any;
  user:any;
  searchDetails: any;
  couponData: any;
  pricing: any;
  success =  false;
  confirmForm: FormGroup; 
  bookingData: any;
  warning = false;

  constructor(private sharedService: SharedService, private fb : FormBuilder, private metadataService: MetadataService,
    private _bottomSheet: MatBottomSheet, private popup: PopupService, private bookingService: BookingService) {
    this.confirmForm = this.fb.group({
      booking_id: [''],
      payment_id: this.fb.array([], [Validators.minLength(1)]),
      coupon_code: ['']
    });
  }

  ngOnInit() {
    this.metadataService.metadata$.subscribe((metadata) => {
      this.metadata = metadata;
      this.paymentData = metadata.payment;
      this.user = metadata.user;
    });

    this.bookingData = this.bookingService.getBookingData();

    this.confirmForm.patchValue({
      booking_id: this.bookingData.booking_id,
    });

    this.metadataService.fetchMetaData().subscribe((metadata) => {
      this.metadataService.updateMetaData(metadata);
    });

    //This calls for the selected car.
    this.sharedService.searchCardData$.subscribe(data => {
      this.selectedCarData = data;
    });

    //This subscribe to search Changes.
    this.sharedService.searchDetails$.subscribe(data => {
      this.searchDetails = data;
    });

    //This subscribes to the pricing.
    this.sharedService.pricingInfo$.subscribe(data => {
      this.pricing = data;
    });
    this.sharedService.updatePricing();
    
  }
  
  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  openConfirmOrder(): void {
    if(this.confirmForm.get('payment_id')?.value.length > 0){
      console.log(this.confirmForm.value);
      this.bookingService.updateFinalBooking(this.confirmForm.value);
      this._bottomSheet.open(ConfirmOrderComponent);
    }
    else{
      this.popup.openSnackBar({
        message : "Please Select At Least One Payment Method!",
        status : 'alert',
        duration : 3000
      });
    }
  }

  openAddCard(): void {
    this._bottomSheet.open(AddpaymentComponent);
  }

  get paymentIdsArray(): FormArray {
    return this.confirmForm.get('payment_id') as FormArray;
  }

  onCheckboxChange(cardId: string): void {
    const paymentIDArray = this.confirmForm.get('payment_id') as FormArray;
    const index = paymentIDArray.value.indexOf(cardId);
    if (index !== -1) {
      this.paymentIdsArray.removeAt(index);
    } else {
      this.paymentIdsArray.push(new FormControl(cardId));
    }
  }

  validateCoupon(): any{
    this.sharedService.applyCoupon(0.4);
    this.success = true;
    // this.confirmForm.patchValue({
    //   coupon_code: this.bookingData.booking_id,
    // });
  }

}
