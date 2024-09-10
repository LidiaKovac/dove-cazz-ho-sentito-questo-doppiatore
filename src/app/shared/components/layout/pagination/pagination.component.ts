import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WorkService } from 'src/app/features/works/work.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnInit {
  @Input() pages: number = 1;
  // @Input() onClick: (page: number) => void = () => null;
  pagesArr: null[] = [];
  pagesShown: number[] = [];
  params!: ParamMap;
  curr!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loading: LoadingService,
    private workSrv: WorkService,
  ) {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.params = params;
          return this.loading.$loading;
        }),
      )
      .subscribe((loading) => {
        this.curr = parseInt(this.params.get('page')!);
        if (!loading) {
          this.calcPagesShown();
        }
      });
    //   this.pagesArr = new Array(this.pages - 1);
  }

  calcPagesShown() {
    this.pagesShown = [];
    const currPage = parseInt(this.params.get('page') || '0');
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
