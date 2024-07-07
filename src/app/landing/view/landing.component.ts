import { Component, ElementRef, ViewChild } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DoppiatoriService } from 'src/app/services/doppiatori.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isLogged!: boolean;
  showOneQuery: string = '';
  showTwoQuery: string = '';
  suggestionsOne: string[] = [];
  suggestionsTwo: string[] = [];
  constructor(
    private authSrv: AuthService,
    private doppiatoriSrv: DoppiatoriService,
  ) {
    this.authSrv.$user
      .pipe(
        switchMap((user) => {
          const token = localStorage.getItem('doppiatori');
          if (!user && token) {
            return authSrv.getMe();
          }
          return of(user);
        }),
      )
      .subscribe((user) => {
        console.log(user);
        this.isLogged = !!user;
        console.log(this.isLogged);
      });
  }

  getSuggestions = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    if (target.name === 'showOneQuery') {
      this.showOneQuery = target.value;
      if (this.showOneQuery.length % 3 && target.value.length > 3) {
        this.doppiatoriSrv
          .getSuggestions(this.showOneQuery)
          .subscribe((res) => (this.suggestionsOne = res));
      }
    } else {
      this.showTwoQuery = target.value;
      if (this.showTwoQuery.length % 3 && target.value.length > 3) {
        this.doppiatoriSrv
          .getSuggestions(this.showTwoQuery)
          .subscribe((res) => (this.suggestionsTwo = res));
      }
    }
  };

  emptySuggestions = () => {
    // setTimeout(() => {
    //   this.suggestions = [];
    // }, 300);
  };

  pickSuggestion({ target }: Event, input: string) {
    const targetAsDiv = target as HTMLDivElement;
    if (input == 'first') {
      this.showOneQuery = targetAsDiv.innerText;
    } else {
      this.showTwoQuery = targetAsDiv.innerText;
    }
  }

  logout() {
    this.authSrv.logout();
  }
}
