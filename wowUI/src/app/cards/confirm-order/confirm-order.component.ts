import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BookingService } from '../../services/booking.service';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent implements OnInit{
  
  pricingData: any;
  searchDetails : any;
  selectedCar : any;
  loading = false;
  finalBooking : any;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ConfirmOrderComponent>, 
              private router: Router, private bookingService : BookingService,
              private popup : PopupService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.pricingInfo$.subscribe((data) =>{
      this.pricingData = data;
    })

    this.sharedService.searchDetails$.subscribe((data) =>{
      this.searchDetails = data;
    })

    this.bookingService.finalBooking$.subscribe((booking) =>{
      this.finalBooking = booking;
    })

    this.sharedService.searchCardData$.subscribe((data) =>{
      this.selectedCar = data;
    })
  }

  closeSheet(){
    this._bottomSheetRef.dismiss();
  }

  confirmOrder(){
    this.loading = true;
    this.bookingService.bookingConfirm(this.finalBooking).subscribe((response) =>{
      this.loading = false;
      this.router.navigate(['/home/orders']);
      this._bottomSheetRef.dismiss();
      this.popup.openSnackBar({
        message : "Your Ride is Available Now!",
        status : 'success',
        duration : 3000
      });
    },
    (error)=>{
      this.loading = false;
      this.popup.openSnackBar({
        message : error.error.message,
        status : 'error',
        duration : 3000
      });
    });
  }
}
