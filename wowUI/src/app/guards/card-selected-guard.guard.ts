import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const cardSelectedGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const selectedCard = inject(SharedService).getResultCardData();
  const authStatus = inject(AuthService).isAuthenticated();
  const router = inject(Router);

  if (!authStatus) {
    router.navigate(['/login']);
    return false;
  }
  else if (authStatus && selectedCard) {
    //If there is a card selected, then return
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
