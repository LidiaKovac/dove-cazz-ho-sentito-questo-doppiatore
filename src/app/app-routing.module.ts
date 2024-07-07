import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingGuard } from './landing/landing.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren:  () => import("./auth/auth.module").then(c => c.AuthModule)
  },
  {
    path: "landing",
    loadChildren: () => import("./landing/landing.module").then(c => c.LandingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
