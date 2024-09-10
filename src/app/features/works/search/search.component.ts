import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { WorkService } from '../work.service';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query!: string | null;
  works: IWork[] = [];
  pages: number = 0;
  page: number = 1;
  total: number = 0;
  isLoading: boolean = true;
  isDetailsLoading: boolean = false;

  selected!: IWork | null;
  openModal!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private worksSrv: WorkService,
    private loadingSrv: LoadingService,
  ) {
    // this.searchWork = this.searchWork.bind(this);
    this.loadingSrv.$loading.subscribe((res) => {
      this.isLoading = res;
    });
    this.worksSrv.isDetailsLoading.subscribe((res) => (this.isDetailsLoading = res));
    this.worksSrv.selected.subscribe((res) => {
      this.selected = res;
    });
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.loadingSrv.setLoading = true;
          if (!params.get('page')) {
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { page: 1 } as Params,
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
          }
          if (params.get('selected') && params.get('selected') !== this.selected?._id) {
            this.worksSrv.setSelectedById(params.get('selected')!);
          }
          this.page = parseInt(params.get('page')!);

          this.query = params.get('query');
          if (this.query !== null) {
            console.log('page');
            return this.worksSrv.getWorks(this.query, this.page);
          } else throw new Error('Query non valida o assente');
        }),

        switchMap(() => this.worksSrv.works),
        switchMap((works) => {
          this.works = works;
          return this.worksSrv.pages;
        }),
        switchMap((pages) => {
          this.pages = pages;
          return this.worksSrv.total;
        }),
      )
      .subscribe((res) => {
        this.total = res;
      });
  }

  setSelected = (work: IWork) => {
    this.worksSrv.setSelected(work);
    this.openModal = true;
  };
}
