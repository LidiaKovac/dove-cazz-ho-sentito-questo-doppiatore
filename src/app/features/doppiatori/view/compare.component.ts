import { Component } from '@angular/core';
import { DoppiatoriService } from '../doppiatori.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent {
  doppiatori: ICompare[] = [];

  title: string = '';
  compareTo: string = '';

  showOneQuery: string = '';
  showTwoQuery: string = '';
  watchListQuery: string = '';
  showQuery: string = '';

  isLogged!: boolean;
  isLoading!: boolean;

  constructor(
    private doppiatoriSrv: DoppiatoriService,
    private loadingSrv: LoadingService,
    private authSrv: AuthService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams
      .pipe(
        switchMap((qp) => {
          this.showOneQuery = qp['title'];
          this.title = qp['title'];
          this.showTwoQuery = qp['compareTo'];
          this.compareTo = qp['compareTo'];
          this.watchListQuery = qp['query'];
          this.showQuery = qp['query'];
          if (!this.watchListQuery && this.compareTo && this.title) {
            return this.doppiatoriSrv.getComparison(qp['title'], qp['compareTo']);
          } else {
            return this.doppiatoriSrv.getUserComparison(qp['query']);
          }
        }),
      )
      .subscribe((res) => {
        this.doppiatori = res;
      });
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.showOneQuery.subscribe((res) => (this.showOneQuery = res));
    this.doppiatoriSrv.showTwoQuery.subscribe((res) => (this.showTwoQuery = res));
    this.doppiatoriSrv.watchListQuery.subscribe((res) => (this.watchListQuery = res));
    this.loadingSrv.$loading.asObservable().subscribe((val) => (this.isLoading = val));
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
  navigateToUserComparison = () => {
    this.doppiatoriSrv.navigateToUserComparison();
  };
}
