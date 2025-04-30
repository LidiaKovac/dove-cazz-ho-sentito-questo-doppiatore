import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DoppiatoriService } from '../../doppiatori/doppiatori.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isLogged!: boolean;
  showOneQuery: string = '';
  showTwoQuery: string = '';
  watchListQuery: string = '';
  suggestionsOne: string[] = [];
  suggestionsTwo: string[] = [];
  suggestionsWatchList: string[] = [];
  constructor(
    private readonly authSrv: AuthService,
    private readonly doppiatoriSrv: DoppiatoriService,
  ) {
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.showOneQuery.subscribe((res) => (this.showOneQuery = res));
    this.doppiatoriSrv.showTwoQuery.subscribe((res) => (this.showTwoQuery = res));
    this.doppiatoriSrv.watchListQuery.subscribe((res) => (this.watchListQuery = res));
    this.doppiatoriSrv.suggestionsOne.subscribe((res) => (this.suggestionsOne = res));
    this.doppiatoriSrv.suggestionsTwo.subscribe((res) => (this.suggestionsTwo = res));
    this.doppiatoriSrv.suggestionsWatchList.subscribe((res) => (this.suggestionsWatchList = res));
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
