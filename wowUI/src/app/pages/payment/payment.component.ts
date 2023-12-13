import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { PopupService } from '../../services/alerts/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatRadioModule, MatCheckboxModule,
    MatExpansionModule, ConfirmOrderComponent, MatBottomSheetModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, OnDestroy {
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
  public seconds: number = 60;
  private intervalId: any;

  constructor(private sharedService: SharedService, private fb : FormBuilder, private metadataService: MetadataService,
    private _bottomSheet: MatBottomSheet, private popup: PopupService, 
    private router: Router, private bookingService: BookingService) {
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
    this.startTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }
  
  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  openConfirmOrder(): void {
    if(this.confirmForm.get('payment_id')?.value.length > 0){
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

  validateCoupon(){
    const couponRequest = {
        coupon_code : this.confirmForm.get('coupon_code')?.value
    };
    this.bookingService.validateCoupon(couponRequest).subscribe((response)=>{
      if(response){
        console.log(response);
        this.sharedService.applyCoupon(response.discount/100);
        this.success = true;
        this.popup.openSnackBar({
          message : "Coupon Applied!",
          status : 'success',
          duration : 3000
        });
      }
    },
    (error)=>{
      this.popup.openSnackBar({
        message : error.error.message,
        status : 'error',
        duration : 3000
      });
    });
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.intervalId);
        this.router.navigate(['/home']);
        this.popup.openSnackBar({
          message : "Booking Session Timed Out!",
          status : 'alert',
          duration : 3000
        });
      }
    }, 1000); // Update every 1 second
  }

  clearTimer() {
    // Clear the interval and reset the seconds
    clearInterval(this.intervalId);
    this.seconds = 60; // or reset to your initial value
  }

}
