import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ResultcardComponent } from '../../cards/resultcard/resultcard.component';
import { SharedService } from '../../services/shared.service';
import { BookingService } from '../../services/booking.service';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ResultcardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit{
  // public modal = false;
  //Search Results goes here.
  searchResults: any[] = [];
  loading: boolean = true;
  searchDetails : any;

  constructor(private shared: SharedService, private authService: AuthService, private popup: PopupService,
    private bookingService: BookingService, private router: Router) { }

  public ngOnInit(): void {
    this.shared.searchDetails$.subscribe((details) =>{
      this.searchDetails = details;
      console.log(details);
    });

    this.shared.results$.subscribe((results) =>{
      this.loading = false;
      this.searchResults = results;
    })
  }


  //This method will be clicked when user, 
  //Clicks on a particular card
  //Will be redirected to payment page.
  handleButtonClick(data: any) {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.popup.openSnackBar({
        message: "Please login to create any booking ",
        status: 'alert',
        duration: 3000
      });
    }
    else {
      const vehicle_id = data.vehicle_id;
      const pickupDate = moment(this.searchDetails.pickupDate).format("YYYY-MM-DD");
      const dropoffDate = moment(this.searchDetails.dropoffDate).format("YYYY-MM-DD");
      const pickuplocID = this.searchDetails.pickupLocData.location_id;
      const dropoflocID = (this.searchDetails.intercity == false ? pickuplocID : this.searchDetails.dropoffLocData.location_id);
      const requestBooking = {
        vehicle_id: vehicle_id,
        pickup_date: pickupDate,
        dropoff_date: dropoffDate,
        dropoff_location: pickuplocID,
        pickup_location: dropoflocID
      }
      this.bookingService.bookingBegin(requestBooking).subscribe(response => {
        if (response) {
          this.bookingService.updateBooking(response);
          this.router.navigate(["/home/payment"]);
        }
      })
    }
  }
}
