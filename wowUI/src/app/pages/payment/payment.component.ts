import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmOrderComponent } from '../../cards/confirm-order/confirm-order.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MetadataService } from '../../services/metadata.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddpaymentComponent } from '../../cards/addpayment/addpayment.component';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatRadioModule, 
    MatExpansionModule, ConfirmOrderComponent, MatBottomSheetModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedCarData: any;
  metadata: any;
  paymentData: any;
  user:any;
  searchDetails: any;
  couponData: any;
  pricing: any;
  success =  false;

  constructor(private sharedService: SharedService, private metadataService: MetadataService,
              private _bottomSheet: MatBottomSheet) {}
  ngOnInit() {

    this.metadataService.metadata$.subscribe((metadata) => {
      this.metadata = metadata;
      this.paymentData = metadata.payment;
      this.user = metadata.user;
    });

    this.metadataService.fetchMetaData().subscribe((metadata) => {
      this.metadataService.updateMetaData(metadata);
    });

    //This calls for the selected car
    this.sharedService.searchCardData$.subscribe(data => {
      this.selectedCarData = data;
    });

    //This subscribe to search Changes
    this.sharedService.searchDetails$.subscribe(data => {
      this.searchDetails = data;
    });

    this.sharedService.pricingInfo$.subscribe(data => {
      this.pricing = data;
    });
    this.sharedService.updatePricing();

    // This subscribes to coupon changes
    // this.sharedService.coupon$.subscribe(data => {
    //   this.couponData = data;
    // });
    
  }
  warning = false;
  
  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  openConfirmOrder(): void {
    this._bottomSheet.open(ConfirmOrderComponent);
  }

  openAddCard(): void {
    this._bottomSheet.open(AddpaymentComponent);
  }

  validateCoupon(): any{
    this.sharedService.applyCoupon(0.4);
    this.success = true;
  }

}
