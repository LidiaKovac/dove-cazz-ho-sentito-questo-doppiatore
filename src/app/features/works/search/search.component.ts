import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  total: number = 0;
  isLoading: boolean = true;
  isDetailsLoading: boolean = false;

  selected: IWork | null = null;
  constructor(
    private route: ActivatedRoute,
    private worksSrv: WorkService,
    private loadingSrv: LoadingService,
  ) {
    this.searchWork = this.searchWork.bind(this);
    this.loadingSrv.$loading.subscribe((res) => {
      this.isLoading = res;
    });
    this.worksSrv.isDetailsLoading.subscribe((res) => (this.isDetailsLoading = res));
    this.worksSrv.selected.subscribe((res) => (this.selected = res));
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.loadingSrv.setLoading = true;
          if (params.get('selected')) {
            this.worksSrv.setSelectedById(params.get('selected')!);
          }
          this.query = params.get('query');
          if (this.query !== null) return this.worksSrv.getWorks(this.query);
          else throw new Error('Query non valida o assente');
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

  searchWork(page: number) {
    if (this.query) this.worksSrv.getWorks(this.query, page).subscribe();
  }

  setSelected = (work: IWork) => {
    this.worksSrv.setSelected(work);
  };
}
