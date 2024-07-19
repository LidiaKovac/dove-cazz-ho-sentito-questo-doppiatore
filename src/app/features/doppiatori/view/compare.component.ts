import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DoppiatoriService } from '../doppiatori.service';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AuthService } from '../../auth/auth.service';
import { CompareCardComponent } from '../../characters/compare-card/compare-card.component';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements AfterViewInit, OnChanges {
  doppiatori: ICompare[] = [];

  title: string = '';
  compareTo: string = '';

  showOneQuery: string = '';
  showTwoQuery: string = '';
  watchListQuery: string = '';
  showQuery: string = '';

  isLogged!: boolean;
  isLoading!: boolean;

  @ViewChildren(CompareCardComponent) cards!: QueryList<CompareCardComponent>;
  @ViewChild('grid') grid!: ElementRef;
  gridRowEnd!: number;

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
        switchMap((res) => {
          this.doppiatori = res;
          return this.cards.changes;
        }),
        delay(100),
      )
      .subscribe((res) => {
        this.calculateSpan();
      });
    this.authSrv.recoverLoggedUser().subscribe((user) => {
      this.isLogged = !!user;
    });
    this.doppiatoriSrv.showOneQuery.subscribe((res) => (this.showOneQuery = res));
    this.doppiatoriSrv.showTwoQuery.subscribe((res) => (this.showTwoQuery = res));
    this.doppiatoriSrv.watchListQuery.subscribe((res) => (this.watchListQuery = res));
    this.loadingSrv.$loading.asObservable().subscribe((val) => (this.isLoading = val));
  }

  ngAfterViewInit() {
    // this.calculateSpan();
    this.cards.changes.subscribe((cards) => {
      this.calculateSpan();
    });
  }

  ngOnChanges() {
    // this.calculateSpan();
  }

  calculateTotalHeight(arr: CompareCardComponent[]) {
    return arr.reduce((acc, curr, i) => {
      console.log(curr.elementRef.nativeElement);
      const html = curr.elementRef.nativeElement as HTMLElement;
      // if (this.cards.get(i)?.nativeElement) {
      //   this.cards.get(i)!.nativeElement.style.height =
      //     Math.ceil(html.getBoundingClientRect().height) + 'px';
      // }
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

  calculateSpan() {
    const firstHalf = [...this.cards].slice(0, this.cards.length / 2);
    const secondHalf = [...this.cards].slice(this.cards.length / 2);
    const higher = Math.max(
      this.calculateTotalHeight(firstHalf),
      this.calculateTotalHeight(secondHalf),
    );
    this.gridRowEnd = Math.ceil(higher) + Math.ceil(this.averageCardHeight);
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
