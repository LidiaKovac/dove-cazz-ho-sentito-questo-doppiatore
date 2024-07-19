import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { workGuard } from './features/works/work.guard';

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
  {
    path: 'works',
    loadChildren: () => import('./features/works/works.module').then((c) => c.WorksModule),
    canActivate: [workGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
