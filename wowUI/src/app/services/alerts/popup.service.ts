import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultAlertComponent } from '../../snackbar/default-alert/default-alert.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(data:any) {
    this._snackBar.openFromComponent(DefaultAlertComponent, {
      data: data,
      duration: 5000,
      // panelClass: ['success-snackbar']
    });
  }
}
