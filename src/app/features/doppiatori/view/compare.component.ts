import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DoppiatoriService } from '../doppiatori.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../../auth/auth.service';
import { CompareCardComponent } from '../../characters/compare-card/compare-card.component';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  standalone: false,
})
export class CompareComponent {
  doppiatori: ICompare[] = [];

  title: string = '';
  compareTo: string = '';

  workQuery: string = '';
  compareToQuery: string = '';
  watchListQuery: string = '';
  showQuery: string = '';

  isLogged!: boolean;
  isLoading!: boolean;

  window = window;

  @ViewChildren(CompareCardComponent) cards!: QueryList<CompareCardComponent>;
  @ViewChild('grid') grid!: ElementRef;
  gridRowEnd!: number;

  constructor(
    private readonly doppiatoriSrv: DoppiatoriService,
    private readonly loadingSrv: LoadingService,
    private readonly authSrv: AuthService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(
        switchMap((qp) => {
          this.workQuery = qp['title'];
          this.title = qp['title'];
          this.compareToQuery = qp['compareTo'];
          this.compareTo = qp['compareTo'];
          this.watchListQuery = qp['query'];
          this.showQuery = qp['query'];
          if (!this.watchListQuery && this.compareTo && this.title) {
            return this.doppiatoriSrv.getComparison(qp['title'], qp['compareTo']);
          } else {
            console.log(qp['query']);
            return this.doppiatoriSrv.getUserComparison(qp['query']);
          }
        }),
        switchMap((res) => {
          this.doppiatori = res;
          return this.cards.changes;
        })
      )
      .subscribe();
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.workQuery.subscribe((res) => (this.workQuery = res));
    this.doppiatoriSrv.compareToQuery.subscribe((res) => (this.compareToQuery = res));
    this.doppiatoriSrv.watchListQuery.subscribe((res) => (this.watchListQuery = res));
    this.loadingSrv.$loading.asObservable().subscribe((val) => (this.isLoading = val));
  }

  calculateTotalHeight(arr: CompareCardComponent[]) {
    return arr.reduce((acc, curr, i) => {
      console.log(curr.elementRef.nativeElement);
      const html = curr.elementRef.nativeElement as HTMLElement;

      return acc + html.getBoundingClientRect().height;
    }, 0);
  }

  get averageCardHeight() {
    return (
      this.cards.reduce((acc, curr, i) => {
        console.log(curr.elementRef);
        const html = curr.elementRef.nativeElement as HTMLElement;

        return acc + html.getBoundingClientRect().height;
      }, 0) / this.cards.length
    );
  }

  navigateToComparison = () => {
    this.doppiatoriSrv.navigateToComparison();
  };
  navigateToUserComparison = () => {
    this.doppiatoriSrv.navigateToUserComparison();
  };
}
