import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { PopupService } from '../services/alerts/popup.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService).isAuthenticated();
  const popup = inject(PopupService);
  const router = inject(Router);
  console.log(authStatus);
  if (authStatus == null || !authStatus) {
    router.navigate(['/login']);
    popup.openSnackBar({
      message : "Please Login Before Proceeding!",
      status : 'alert',
      duration : 3000
    });
    return false;
  }
  return true;
};
