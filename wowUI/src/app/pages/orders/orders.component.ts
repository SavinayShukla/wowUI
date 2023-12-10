import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompOrdersComponent } from '../../cards/comp-order/comp-orders.component';
import { PendOrderComponent } from '../../cards/pend-order/pend-order.component';
import { FinishOrderComponent } from '../../cards/finish-order/finish-order.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EditOrderComponent } from '../../cards/edit-order/edit-order.component';
import { OngoingOrderComponent } from '../../cards/ongoing-order/ongoing-order.component';
import { BookingService } from '../../services/booking.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CompOrdersComponent, PendOrderComponent, 
            OngoingOrderComponent, MatBottomSheetModule, MatDialogModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  warning = false;
  historicalOrders: any;
  ongoingOrders: any;
  pendingOrders: any;
  completedOrders: any;

  constructor(private _bottomSheet: MatBottomSheet, private dialog: MatDialog,
    private bookingService: BookingService, private popup: PopupService) {}

  ngOnInit(): void {
    this.bookingService.pendingOrders$.subscribe((data)=>{
      this.pendingOrders = data;
    })
    this.bookingService.completedOrders$.subscribe((data)=>{
      this.completedOrders = data;
    })
    this.bookingService.ongoingOrders$.subscribe((data)=>{
      this.ongoingOrders = data;
    })
    this.bookingService.refreshBookingLists();
  }

  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  receiveData(data:any) {
    if(data.command === 'confirm')
      this.openConfirmOrder(data.booking);
    else
      this.openEditOrder(data.booking);
  }

  openConfirmOrder(bookingData: any): void {
    this.bookingService.updateSelectedBooking(bookingData);
    // this._bottomSheet.open(FinishOrderComponent);
    const confirmBookingDialog = this.dialog.open(FinishOrderComponent);
    confirmBookingDialog.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.bookingEnd({
          booking_id : bookingData.booking_id
        }).subscribe(
          (response) => {
            //Refresh List.
            this.bookingService.refreshBookingLists();
            this.popup.openSnackBar({
              message : "Ride Completed!",
              status : 'success',
              duration : 3000
            });
          },
          (error) => {
            this.popup.openSnackBar({
              message : "Error in finishing ride!",
              status : 'error',
              duration : 3000
            });
          }
        );
      }
    });
  }

  openEditOrder(bookingData: any): void {
    this.bookingService.updateSelectedBooking(bookingData);
    this._bottomSheet.open(EditOrderComponent);
  }
}
