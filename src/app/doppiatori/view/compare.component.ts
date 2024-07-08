import { Component } from '@angular/core';
import { DoppiatoriService } from '../doppiatori.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {
  doppiatori: ICompare[] = [];
  title!: string;
  compareTo!: string;

  showOneQuery: string = '';
  showTwoQuery: string = '';
  suggestionsOne: string[] = [];
  suggestionsTwo: string[] = [];

  isLogged!: boolean;

  constructor(
    private doppiatoriSrv: DoppiatoriService,
    private authSrv: AuthService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams
      .pipe(
        switchMap((qp) => {
          this.title = qp['title'];
          this.compareTo = qp['compareTo'];
          return this.doppiatoriSrv.getComparison(qp['title'], qp['compareTo']);
        }),
      )
      .subscribe((res) => {
        this.doppiatori = res;
      });
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.showOneQuery.subscribe(
      (res) => (this.showOneQuery = res),
    );
    this.doppiatoriSrv.showTwoQuery.subscribe(
      (res) => (this.showTwoQuery = res),
    );
    this.doppiatoriSrv.suggestionsOne.subscribe(
      (res) => (this.suggestionsOne = res),
    );
    this.doppiatoriSrv.suggestionsTwo.subscribe(
      (res) => (this.suggestionsTwo = res),
    );
  }

  getSuggestions = (ev: Event, varName: string) => {
    this.doppiatoriSrv.fetchSuggestions(ev, varName);
  };

  emptySuggestions = (input: string) => {
    this.doppiatoriSrv.emptySuggestions(input);
  };

  pickSuggestion(ev: Event) {
    this.doppiatoriSrv.pickSuggestion(ev);
  }

  navigateToComparison = () => {
    this.doppiatoriSrv.navigateToComparison();
  };
}
