/// <reference types="@types/googlemaps" />

//The above is important for autocomplete to work.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutocompleteService } from '../../services/autocomplete.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MatNativeDateModule, MatDatepickerModule,
            MatCheckboxModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //Variables
  predictions: google.maps.places.AutocompletePrediction[] = [];
  location: string = '';
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private placesAutocompleteService: AutocompleteService) {
    this.searchForm = this.fb.group({
      intercity: [false],
      pickupLoc: [''],
      dropoffLoc: [{value: '', disabled: true}],
      pickupDate: [''],
      dropoffDate: [''],
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

  onInput(event: any): void {
    const input = event.target.value;
    this.placesAutocompleteService.getPlacePredictions(input)
      .then(predictions => {this.predictions = predictions})
      .catch(error => console.error(error));
  }

  selectPrediction(prediction: google.maps.places.AutocompletePrediction): void {
    this.location = prediction.description;
    this.predictions = []; // Clear predictions after selecting one
  }

  onSubmit() {
    // Perform form processing here
    // ...
    // call CheckUser(ob)

    // Navigate to the new component upon form submission
    
    // if(this.authService.login()){
    //   this.router.navigate(['/home']);
    // }
    this.router.navigate(['home/results'])
  }
}
