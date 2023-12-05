import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-default-alert',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './default-alert.component.html',
  styleUrl: './default-alert.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DefaultAlertComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<DefaultAlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
