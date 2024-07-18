import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DoppiatoriService } from 'src/app/doppiatori/doppiatori.service';

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
    private authSrv: AuthService,
    private doppiatoriSrv: DoppiatoriService,
  ) {
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.showOneQuery.subscribe(
      (res) => (this.showOneQuery = res),
    );
    this.doppiatoriSrv.showTwoQuery.subscribe(
      (res) => (this.showTwoQuery = res),
    );
    this.doppiatoriSrv.watchListQuery.subscribe(
      (res) => (this.watchListQuery = res),
    );
    this.doppiatoriSrv.suggestionsOne.subscribe(
      (res) => (this.suggestionsOne = res),
    );
    this.doppiatoriSrv.suggestionsTwo.subscribe(
      (res) => (this.suggestionsTwo = res),
    );
    this.doppiatoriSrv.suggestionsWatchList.subscribe(
      (res) => (this.suggestionsWatchList = res),
    );
  }

  navigateToComparison = () => {
    this.doppiatoriSrv.navigateToComparison();
  };

  logout() {
    this.authSrv.logout();
  }
}
