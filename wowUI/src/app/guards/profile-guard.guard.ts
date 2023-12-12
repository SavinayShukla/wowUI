import { CanActivateFn, Router } from '@angular/router';
import { MetadataService } from '../services/metadata.service';
import { inject } from '@angular/core';
import { PopupService } from '../services/alerts/popup.service';
import { firstValueFrom } from 'rxjs';

export const profileGuardGuard: CanActivateFn = async (route, state) => {
  const metadataService = inject(MetadataService) as MetadataService;
  const popup = inject(PopupService);
  const router = inject(Router);
  try {
    // Wait for the first value emitted by the BehaviorSubject
    const metadata = await firstValueFrom(metadataService.metadata$);

    console.log(metadata);

    if (metadata && metadata.is_profile_complete) {
      return true;
    } else {
      router.navigate(['/home/profile']);
      popup.openSnackBar({
        message: 'Please Complete Your Profile!',
        status: 'alert',
        duration: 3000,
      });
      return false;
    }
  } catch (error) {
    console.error('Error getting metadata:', error);
    // Handle the error appropriately (e.g., redirect to an error page)
    return false;
  }
};
