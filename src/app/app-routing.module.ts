import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((c) => c.AuthModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/landing.module').then((c) => c.LandingModule),
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'compare',
    loadChildren: () =>
      import('./features/doppiatori/doppiatori.module').then((c) => c.DoppiatoriModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
