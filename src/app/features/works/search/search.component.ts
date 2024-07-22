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
    this.loadingSrv.$loading.subscribe((res) => {
      this.isLoading = res;
    });
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.loadingSrv.setLoading = true;
          this.query = params.get('query');
          if (this.query !== null) return this.worksSrv.getWorks(this.query);
          else throw new Error('Query non valida o assente');
        }),
        switchMap(() => this.worksSrv.works)
      )
      .subscribe((res) => {
        this.works = res;
      });
  }
}
