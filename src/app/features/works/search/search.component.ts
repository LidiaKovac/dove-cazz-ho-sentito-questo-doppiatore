import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkService } from '../work.service';
import { catchError, of, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  query!: string | null;
  works: IWork[] = [];
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private worksSrv: WorkService,
    private loadingSrv: LoadingService,
  ) {
    // this.loadingSrv.$loading.subscribe((res) => {
    //   this.isLoading = res;
    // });
    this.loadingSrv.$loading
      .asObservable()
      .pipe(
        switchMap((res) => {
          this.isLoading = res;
          return this.route.queryParamMap;
        }),
        switchMap((params) => {
          this.query = params.get('query');
          if (this.query !== null) return this.worksSrv.getWorks(this.query);
          else throw new Error('Query non valida o assente');
        }),
      )
      .subscribe((res) => {
        this.works = res;
      });
    // this.route.queryParamMap
    //   .pipe(
    //     switchMap((params) => {
    //       if (params.get('query') !== null) {
    //         this.query = params.get('query');
    //         return this.worksSrv.getWorks(params.get('query') as string);
    //       } else throw new Error('Param not valid or not found');
    //     }),
    //     switchMap((res) => {
    //       this.works = res;
    //       return this.lo
    //     }),
    //   )
    //   .subscribe();
  }

  getWorks() {
    if (this.query) {
      this.worksSrv.getWorks(this.query).subscribe((res) => (this.works = res));
    }
  }
}
