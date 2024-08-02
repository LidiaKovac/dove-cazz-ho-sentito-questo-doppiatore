import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AlertService } from 'src/app/shared/components/feedback/alert/alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  public works = new BehaviorSubject<IWork[]>([]);
  public pages = new BehaviorSubject<number>(0);
  public total = new BehaviorSubject<number>(0);

  public selected = new BehaviorSubject<IWork | null>(null);

  public isDetailsLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private loadingSrv: LoadingService,
    private alertSrv: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      // if (params['selected']) {
      //   this.setSelected(params['selected']);
      // }
    });
  }

  getWorks(q: string, page: number = 1) {
    return this.http.get<IWorkPaged>(`${environment.url}works?query=${q}&page=${page}`).pipe(
      tap((res) => {
        this.loadingSrv.setLoading = false;
        this.total.next(res.total);
        this.pages.next(Math.ceil(res.total / 10) + 1);
      }),
      map((res) => this.works.next(res.data)),
    );
  }

  watchWork(id: string) {
    this.optimisticToggleSeen(id);

    return this.http.put<IWork[]>(`${environment.url}user/me/watch/${id}`, null);
  }

  getWorkById(id: string) {
    this.loadingSrv.setLoading = true;
    return this.http.get<IWork>(`${environment.url}works/${id}`).pipe(
      tap(() => {
        this.loadingSrv.setLoading = false;
      }),
    );
  }

  unwatchWork(id: string) {
    this.optimisticToggleSeen(id);
    return this.http.put<IWork[]>(`${environment.url}user/me/unwatch/${id}`, null);
  }

  optimisticToggleSeen(id: string) {
    const currentWorks = this.works.getValue();
    for (let i = 0; i < currentWorks.length; i++) {
      const work = currentWorks[i];
      if (work._id === id) {
        currentWorks[i].seen = !currentWorks[i].seen;
        this.alertSrv.addAlert(
          `Elemento ${currentWorks[i].seen ? 'aggiunto ' : 'rimosso d'}alla tua lista`,
          'info',
        );
        break;
      }
    }
    this.works.next(currentWorks);
  }

  setSelectedById(id:string) {
        this.isDetailsLoading.next(true);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            selected: id,
          },
          queryParamsHandling: 'merge',
          // skipLocationChange: true,
        });
        this.getWorkById(id).subscribe((res) => {
          this.selected.next(res);
          this.loadingSrv.setLoading = false;
          this.isDetailsLoading.next(false);
        });
  }

  setSelected(work: IWork) {
    this.isDetailsLoading.next(true);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selected: work._id,
      },
      queryParamsHandling: 'merge',
      // skipLocationChange: true,
    });
    this.selected.next(work); //optimistic
    this.getWorkById(work._id).subscribe((res) => {
      this.selected.next(res);
      this.loadingSrv.setLoading = false;
      this.isDetailsLoading.next(false);
    });
  }
}
