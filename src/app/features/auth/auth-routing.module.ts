import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './views/auth/auth.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ImportTutorialComponent } from './views/import-tutorial/import-tutorial.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'user',
    component: ProfileComponent,
  },
  {
    path: 'user/tutorial',
    component: ImportTutorialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
