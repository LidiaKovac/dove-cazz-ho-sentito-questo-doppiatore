import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const LandingGuard: CanActivateFn = async (route, state) => {
  const authSrv: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user = authSrv.$user.value; // Get the current value from the BehaviorSubject

  if (user) {
    return true;
  } else {
    const token = localStorage.getItem('doppiatori');

    if (token) {
      try {
        const validatedUser = await authSrv.getMe().toPromise(); // Validate the token and get the user
        if (validatedUser) {
          return true;
        } else {
          router.navigate(['/auth']);
          return false;
        }
      } catch (error) {
        console.error('Error while validating token', error);
        router.navigate(['/auth']);
        return false;
      }
    } else {
      router.navigate(['/auth']);
      return false;
    }
  }
};
