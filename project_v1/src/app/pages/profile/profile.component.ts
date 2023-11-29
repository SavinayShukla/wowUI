import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatBottomSheet, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { UpdatePasswordComponent } from '../../cards/update-password/update-password.component';
import { AddpaymentComponent } from '../../cards/addpayment/addpayment.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatExpansionModule,
    MatBottomSheetModule, UpdatePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {

  constructor(private _bottomSheet: MatBottomSheet){}

  openUpdatePassword(): void {
    this._bottomSheet.open(UpdatePasswordComponent);
  }

  openAddCard(): void {
    this._bottomSheet.open(AddpaymentComponent);
  }
    
}
