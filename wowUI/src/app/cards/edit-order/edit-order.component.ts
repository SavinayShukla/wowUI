import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AutocompleteService } from '../../services/autocomplete.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetadataService } from '../../services/metadata.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingService } from '../../services/booking.service';
import { PopupService } from '../../services/alerts/popup.service';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent implements OnInit {
  dropoffPredictions: any;
  editForm: FormGroup;
  selectedBooking : any;
  paymentData: any[] = [];

  constructor(private fb: FormBuilder, private _bottomSheetRef: MatBottomSheetRef<EditOrderComponent>,
    private placesAutocompleteService: AutocompleteService, private metadataService: MetadataService,
    private bookingService: BookingService, private popup: PopupService) {
    this.editForm = this.fb.group({
      dropoffLoc: ['', Validators.required],
      payment_id: this.fb.array([]),
      dropoff_location : null,
      booking_id : null
    });
  }
  ngOnInit(): void {
    this.metadataService.metadata$.subscribe((metadata) => {
      this.paymentData = metadata.payment;
    });

    this.metadataService.fetchMetaData().subscribe((metadata) => {
      this.metadataService.updateMetaData(metadata);
    });

    this.bookingService.selectedBooking$.subscribe((data) =>{
      this.selectedBooking = data;
      var paymentIDArray = this.editForm.get('payment_id') as FormArray;
      let bookingPayments = this.selectedBooking.payment as any[];
      console.log(bookingPayments);
      bookingPayments.forEach((payment) => {
        paymentIDArray.push(this.fb.control(payment.payment_id));
      });

      this.editForm.patchValue({
        dropoffLoc : this.selectedBooking.dropoff_location.address_street + ", "
                    + this.selectedBooking.dropoff_location.address_city + ", "
                    + this.selectedBooking.dropoff_location.address_state + " - "
                    + this.selectedBooking.dropoff_location.address_zipcode 
      })
    })

  }

  closeSheet() {
    this._bottomSheetRef.dismiss();
  }

  onInput(event: any): void {
    const input = event.target.value;
    this.placesAutocompleteService.getPlacePredictions(input)
      .subscribe(predictions => {
        this.dropoffPredictions = (predictions as any[]).slice(0, 4);
      });
  }

  selectPrediction(prediction: any) {
    const street = prediction.address_street;
    const state = prediction.address_state;
    const city = prediction.address_city;
    const zipcode = prediction.address_zipcode;
    this.editForm.patchValue({
      dropoffLoc: street + ", " + city + ", " + state + " - " + zipcode,
      dropoff_location : prediction.location_id
    });
    this.dropoffPredictions = [];
  }

  confirmOrder() {
    
    this._bottomSheetRef.dismiss();
    // this.loading = true;
    // setTimeout(()=>{
    //   this.loading = false;
    //   this.router.navigate(['/home/orders']);
    //   this._bottomSheetRef.dismiss();
    // }, 3000);
  }


  //The following for selection of payment cards
  get paymentIdsArray(): FormArray {
    return this.editForm.get('payment_id') as FormArray;
  }
  ischecked(card : any){
    const paymentIDArray = this.editForm.get('payment_id') as FormArray;
    const index = paymentIDArray.value.indexOf(card.payment_id);
    return (index != -1);
  }
  onCheckboxChange(cardId: string): void {
    const paymentIDArray = this.editForm.get('payment_id') as FormArray;
    const index = paymentIDArray.value.indexOf(cardId);
    if (index !== -1) {
      this.paymentIdsArray.removeAt(index);
    } else {
      this.paymentIdsArray.push(new FormControl(cardId));
    }
  }

  onSubmit() {
    if(this.editForm.get('payment_id')?.value.length > 0){
      if(this.editForm.valid){
        const requestBody = {
          booking_id : this.selectedBooking.booking_id,
          dropoff_location : this.editForm.get('dropoff_location')?.value,
          payment_id: this.editForm.get('payment_id')?.value
        }
        this.bookingService.bookingUpdate(requestBody).subscribe((response) =>{
          this.bookingService.refreshBookingLists();
          this.popup.openSnackBar({
            message : "Successfully Updated Order!",
            status : 'success',
            duration : 3000
          });
        },
        (error) =>{
          this.popup.openSnackBar({
            message : "Error Updating Order Details!",
            status : 'error',
            duration : 3000
          });
        });
      }
    }
    else{
      this.popup.openSnackBar({
        message : "Please Select At Least One Payment Method!",
        status : 'alert',
        duration : 3000
      });
    }
  }
}
