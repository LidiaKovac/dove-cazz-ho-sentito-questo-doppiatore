import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DoppiatoriService } from '../../doppiatori/doppiatori.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: false,
})
export class LandingComponent {
  isLogged!: boolean;
  constructor(
    private readonly authSrv: AuthService,
    private readonly doppiatoriSrv: DoppiatoriService
  ) {
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
  }

  navigateToComparison = () => {
    this.doppiatoriSrv.navigateToComparison();
  };

  navigateToUserComparison = () => {
    this.doppiatoriSrv.navigateToUserComparison();
  };

  logout() {
    this.authSrv.logout();
  }
}
