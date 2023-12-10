import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-order',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './finish-order.component.html',
  styleUrl: './finish-order.component.css'
})
export class FinishOrderComponent implements OnInit{

  selectedBooking : any;
  constructor(private bookingService : BookingService) {}
  ngOnInit(): void {
    
    this.bookingService.selectedBooking$.subscribe((data) =>{
      this.selectedBooking = data;
    })
  }
}
