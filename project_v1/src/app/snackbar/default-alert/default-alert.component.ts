import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-alert.component.html',
  styleUrl: './default-alert.component.css',
})
export class DefaultAlertComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<DefaultAlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
