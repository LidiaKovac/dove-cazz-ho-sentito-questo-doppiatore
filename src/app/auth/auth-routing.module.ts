import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: "user",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
