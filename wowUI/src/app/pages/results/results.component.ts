import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ResultcardComponent } from '../../cards/resultcard/resultcard.component';
import { SharedService } from '../../services/shared.service';
import { BookingService } from '../../services/booking.service';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/alerts/popup.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MetadataService } from '../../services/metadata.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ResultcardComponent, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  //Search Results goes here.
  searchResults: any[] = [];
  loading: boolean = true;
  searchDetails: any;
  make = [];
  type: number[] = [];
  totalCars = 0;
  vehicle_class = {
    'Sedan': 1,
    'SUV': 2,
    'Truck': 3,
    'Compact Car': 4,
    'Luxury Car': 5,
    'Convertible': 6,
    'Sports Car': 7,
    'Minivan': 8,
    'Electric Car': 9,
    'Hybrid': 10
  }
  vehicle_gt = 0;

  constructor(private shared: SharedService, private authService: AuthService, private popup: PopupService,
    private bookingService: BookingService, private metadataService: MetadataService, private router: Router) { }

  public ngOnInit(): void {
    this.shared.searchDetails$.subscribe((details) => {
      this.searchDetails = details;
      console.log(details);
    });

    this.metadataService.metadata$.subscribe((response) => {
      console.log(response);
    })

    this.shared.results$.subscribe((results) => {
      this.loading = false;
      this.searchResults = results.data as any[];
      this.totalCars = results.count;
      this.vehicle_gt = results.previous_page__gt;
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

  //This is for make checkboxes.
  onCheckboxChange(object: string, list: string[]): void {
    const index = list.indexOf(object);
    if (index !== -1) {
      list.splice(index, 1);
    } else {
      list.push(object);
    }
  }

  //This is for type checkboxes.
  onTypeCheckboxChange(selectedObject: string, isChecked: boolean): void {
    // Find the index of the selectedObject in the keys of vehicle_class
    const index = Object.keys(this.vehicle_class).indexOf(selectedObject) + 1;

    if (isChecked) {
      // If the object is found in the keys and the checkbox is checked,
      // push its index into this.type if it doesn't already exist
      if (index !== -1 && !this.type.includes(index)) {
        this.type.push(index);
      }
    } else {
      // If the checkbox is unchecked, remove the index from this.type if it exists
      const indexToRemove = this.type.indexOf(index);
      if (indexToRemove !== -1) {
        this.type.splice(indexToRemove, 1);
      }
    }
    console.log(this.type);
  }


  //This method is for Searching when filter apply is clicked.
  filterSearch() {
    console.log(this.searchDetails);
    const pickup_date = moment(this.searchDetails.pickupDate).format("YYYY-MM-DD");
    const dropoff_date = moment(this.searchDetails.dropoffDate).format("YYYY-MM-DD");
    const pickup_location = this.searchDetails.pickupLocData.location_id;
    const dropoff_location = (this.searchDetails.dropoffLocData != undefined ? this.searchDetails.dropoffLocData.location_id : pickup_location);
    const make = this.make;
    const type = this.type;

    const searchObj = {
      pickup_date: pickup_date,
      dropoff_date: dropoff_date,
      pickup_location: pickup_location,
      dropoff_location: dropoff_location,
      make: make,
      class_id: type
    }

    this.shared.getVehicles(searchObj).subscribe((response) => {
      console.log(searchObj);
      if (response) {
        this.shared.updateResults(response);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    const last_car = this.searchResults[this.searchResults.length - 1].vehicle_id;
    if (e.previousPageIndex != null && e.pageIndex != null && e.previousPageIndex < e.pageIndex) {
      // User navigated to the next page
      const request = {
        'pickup_date': moment(this.searchDetails.pickupDate).format("YYYY-MM-DD"),
        'dropoff_date': moment(this.searchDetails.dropoffDate).format("YYYY-MM-DD"),
        'pickup_location': this.searchDetails.pickupLocData.location_id,
        'dropoff_location': (this.searchDetails.dropoffLocData != undefined) ? this.searchDetails.dropoffLocData.location_id : this.searchDetails.pickupLocData.location_id,
        'vehicle_id__gt': last_car,
        'make': this.make,
        'class_id': this.type

      };

      this.shared.getVehicles(request).subscribe((response) => {
        this.shared.updateResults(response);
      })

    } else if (e.previousPageIndex != null && e.pageIndex != null && e.previousPageIndex > e.pageIndex) {
      // User navigated to the previous page
      const request = {
        'pickup_date': moment(this.searchDetails.pickupDate).format("YYYY-MM-DD"),
        'dropoff_date': moment(this.searchDetails.dropoffDate).format("YYYY-MM-DD"),
        'pickup_location': this.searchDetails.pickupLocData.location_id,
        'dropoff_location': (this.searchDetails.dropoffLocData != undefined) ? this.searchDetails.dropoffLocData.location_id : this.searchDetails.pickupLocData.location_id,
        'vehicle_id__gt': this.vehicle_gt,
        'make': this.make,
        'class_id': this.type
      };

      this.shared.getVehicles(request).subscribe((response) => {
        this.shared.updateResults(response);
      })
    }
  }
}
