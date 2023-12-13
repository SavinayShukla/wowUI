/// <reference types="@types/googlemaps" />

//The above is important for autocomplete to work.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutocompleteService } from '../../services/autocomplete.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MetadataService } from '../../services/metadata.service';
import { PopupService } from '../../services/alerts/popup.service';
import { SharedService } from '../../services/shared.service';
import moment from 'moment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatDatepickerModule,
    MatCheckboxModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  //Variables
  // predictions: google.maps.places.AutocompletePrediction[] = [];
  pickupPredictions: any;
  dropoffPredictions: any;

  pickupLocationData: any;
  dropoffLocationData: any;  // This is being fetched seperately to update location IDs in later components.
  searchForm: FormGroup;     // Form for the search

  constructor(private fb: FormBuilder, private router: Router,
    private popup: PopupService, private shared: SharedService,
    private placesAutocompleteService: AutocompleteService,
    private metadataService: MetadataService, private sharedService: SharedService) {
    this.searchForm = this.fb.group({
      intercity: [false, Validators.required],
      pickupLoc: ['', Validators.required],
      dropoffLoc: [{ value: '', disabled: true }, Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      pickupLocData: null,
      dropoffLocData: null,
      pickup_date: null,
      dropoff_date: null,
    });

    // Subscribe to changes in the disableInput control
    this.searchForm.get('intercity')?.valueChanges.subscribe((value) => {
      const inputFieldControl = this.searchForm.get('dropoffLoc');
      if (inputFieldControl) {
        // Enable or disable the input based on the checkbox value
        value ? inputFieldControl.enable() : inputFieldControl.disable();
      }
    });
  }

  ngOnInit() {
    this.metadataService.fetchMetaData().subscribe(
      (metadata) => {
        console.log(metadata);
        this.handleProfileRoute(metadata);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onInput(event: any, inputBox: string): void {
    const input = event.target.value;
    this.placesAutocompleteService.getPlacePredictions(input)
      .subscribe(predictions => {
        if (inputBox === 'pickupLoc') {
          this.pickupPredictions = predictions as any[];
        }
        else {
          this.dropoffPredictions = predictions as any[];
        }
      });
  }

  // selectPrediction(prediction: google.maps.places.AutocompletePrediction): void {
  //   this.location = prediction.description;
  //   this.predictions = []; // Clear predictions after selecting one
  // }

  selectPrediction(prediction: any, inputBox: string) {
    const street = prediction.address_street;
    const state = prediction.address_state;
    const city = prediction.address_city;
    if (inputBox === 'dropoff') {
      this.searchForm.patchValue({
        dropoffLoc: street + ", " + city + ", " + state,
      });
      this.dropoffPredictions = [];
      this.dropoffLocationData = prediction;
    }
    else {
      this.searchForm.patchValue({
        pickupLoc: street + ", " + city + ", " + state,
      });
      this.pickupPredictions = [];
      this.pickupLocationData = prediction;
    }
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const formattedPickupDate = moment(this.searchForm.value.pickupDate);
      const formattedDropoffDate = moment(this.searchForm.value.dropoffDate);

      this.searchForm.patchValue({
        pickupLocData: this.pickupLocationData,
        dropoffLocData: this.dropoffLocationData,
        pickup_date: formattedPickupDate.format("MM/DD/YYYY"),
        dropoff_date: formattedDropoffDate.format("MM/DD/YYYY")
      })

      this.shared.updateSearchDetails(this.searchForm.value);

      const request = {
        'pickup_date': formattedPickupDate.format("YYYY-MM-DD"),
        'dropoff_date': formattedDropoffDate.format("YYYY-MM-DD"),
        'pickup_location': this.pickupLocationData.location_id,
      };

      this.shared.getVehicles(request).subscribe((response) => {
        if (response) {
          this.shared.updateResults(response);
          this.router.navigate(['home/results'])
        }
      });
    }
  }

  //This handles the scenarios if the metadata fetches empty profiles.
  handleProfileRoute(metadata: any) {
    if (!metadata.is_profile_complete) {
      this.router.navigate(['/home/profile']);
      this.popup.openSnackBar({
        message: "Please update your profile before proceeding!",
        status: 'alert',
        duration: 5000
      });
    }
  }
}
