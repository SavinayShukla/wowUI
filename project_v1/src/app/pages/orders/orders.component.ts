import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompOrdersComponent } from '../../cards/comp-order/comp-orders.component';
import { PendOrderComponent } from '../../cards/pend-order/pend-order.component';
import { FinishOrderComponent } from '../../cards/finish-order/finish-order.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CompOrdersComponent, PendOrderComponent, MatBottomSheetModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  warning = false;

  constructor(private _bottomSheet: MatBottomSheet) {}

  openModal(){
    this.warning = true;
  }

  closeModal(){
    this.warning = false;
  }

  receiveData(data: string) {
    // this.openModal();
    this.openConfirmOrder();
  }

  openConfirmOrder(): void {
    this._bottomSheet.open(FinishOrderComponent);
  }
}
