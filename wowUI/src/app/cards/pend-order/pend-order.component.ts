import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'pend-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pend-order.component.html',
  styleUrl: './pend-order.component.css'
})
export class PendOrderComponent {
  @Input() orderData: any;

  constructor(private bookingService: BookingService){}

  startRide(){
    const startRideInfo  = {
      booking_id : this.orderData.booking_id
    }
    this.bookingService.startRide(startRideInfo).subscribe((response)=>{
      this.bookingService.refreshBookingLists();
    })
  }
}
