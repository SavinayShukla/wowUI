import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService).isAuthenticated();
  const router = inject(Router);

  if (!authStatus) {
    router.navigate(['/login']);
    return false;
  }

  return true;
  
};
