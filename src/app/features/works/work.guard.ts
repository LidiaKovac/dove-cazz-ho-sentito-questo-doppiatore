import { CanActivateFn } from '@angular/router';

export const workGuard: CanActivateFn = (route, state) => {
  return !!route.queryParamMap.get('query');
};
