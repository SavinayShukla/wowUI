import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css'
})
export class ConfirmOrderComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ConfirmOrderComponent>, private router: Router,) {}

  closeSheet(){
    this._bottomSheetRef.dismiss();
  }

  confirmOrder(){
    setTimeout(()=>{
      this.router.navigate(['/home/orders']);
      this._bottomSheetRef.dismiss();
    }, 3000);
  }
}
