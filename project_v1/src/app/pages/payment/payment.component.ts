import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmOrderComponent } from '../../cards/confirm-order/confirm-order.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, MatSelectModule, ConfirmOrderComponent, MatBottomSheetModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedCarData: any;

  constructor(private sharedService: SharedService, private _bottomSheet: MatBottomSheet) {}
  ngOnInit() {
    this.sharedService.searchCardData$.subscribe(data => {
      this.selectedCarData = data;
    });
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

}
