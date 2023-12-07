/// <reference types="@types/googlemaps" />

//The above is important for autocomplete to work.

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutocompleteService } from '../../services/autocomplete.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
  predictions : any;
  location: string = '';
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, 
              private popup: PopupService, private shared: SharedService,
              private placesAutocompleteService: AutocompleteService, 
              private metadataService: MetadataService, private sharedService: SharedService) {
    this.searchForm = this.fb.group({
      intercity: [false, Validators.required],
      pickupLoc: ['', Validators.required],
      dropoffLoc: [{value: '', disabled: true}, Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      
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

    this.sharedService.searchDetails$.subscribe((data) =>{
      console.log(data);
      this.searchForm.patchValue({
        // intercity: data.intercity,
        pickupLoc: data.pickupLoc,
        dropoffLoc: data.dropoffLoc,
        dropoffDate: new Date(data.dropoffDate),
        pickupDate: new Date(data.pickupDate),
      });
    })

  }

  onInput(event: any): void {
    const input = event.target.value;
    this.placesAutocompleteService.getPlacePredictions(input)
      .subscribe(predictions => {
        console.log(predictions);
        this.predictions = predictions as any[]});
  }

  // selectPrediction(prediction: google.maps.places.AutocompletePrediction): void {
  //   this.location = prediction.description;
  //   this.predictions = []; // Clear predictions after selecting one
  // }

  onSubmit() {
    if(this.searchForm.valid){
    const formattedPickupDate = moment(this.searchForm.value.pickupDate);
    const formattedDropoffDate = moment(this.searchForm.value.dropoffDate);
    this.searchForm.patchValue({
      pickupDate : formattedPickupDate.format("MM/DD/YYYY"),
      dropoffDate : formattedDropoffDate.format("MM/DD/YYYY")
    })

    this.shared.updateSearchDetails(this.searchForm.value);
    this.router.navigate(['home/results'])

    }
    
  }

  //This handles the scenarios if the metadata fetches empty profiles.
  handleProfileRoute(metadata: any){
    if(!metadata.is_profile_complete){
      this.router.navigate(['/home/profile']);
      this.popup.openSnackBar({
        message : "Please update your profile before proceeding!",
        status : 'alert',
        duration : 5000
      });
    }
  }
}
