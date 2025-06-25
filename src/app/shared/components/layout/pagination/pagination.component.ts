import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WorkService } from 'src/app/features/works/work.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    imports: [CommonModule]
})
export class PaginationComponent implements OnInit {
  pages!: number
  pagesArr: null[] = [];
  pagesShown: number[] = [];
  params!: ParamMap;
  curr!: number;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loading: LoadingService,
    private readonly workSrv: WorkService,
  ) {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.params = params;
          return this.workSrv.pages
        }),
        switchMap((pages) => {
          this.pages = pages
          return this.loading.$loading;
        }),
      )
      .subscribe((loading) => {
        this.curr = parseInt(this.params.get('page') ?? "0");
        if (!loading) {
          this.calcPagesShown();
        }
      });
  }

  calcPagesShown() {
    this.pagesShown = [];
    const currPage = parseInt(this.params.get('page') ?? '0');
    for (let i = 0; i <= this.pagesArr.length; i++) {
      const diff = currPage - i;
      if ((i > 0 && diff < 3 && diff > -4) || diff === 0) {
        this.pagesShown.push(i);
      }
    }
  }

  ngOnInit() {
    this.pagesArr = new Array(this.pages - 1);
    this.calcPagesShown();
  }

  selectPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page, selected: undefined } as Params,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    // this.workSrv.setSelected(null);
    // this.onClick(page);
  }
}
