import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(
    private http: HttpClient,
    private loadingSrv: LoadingService,
    private alertSrv: AlertService,
  ) {}

  getWorks(q: string, page: number = 1) {
    console.log('pippo1');

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

    return this.http.put<IWork[]>(`${environment.url}user/me/watch/${id}`, null).pipe(
      tap(() => {
      }),
    );
  }

  unwatchWork(id: string) {
    this.optimisticToggleSeen(id);
    return this.http.put<IWork[]>(`${environment.url}user/me/unwatch/${id}`, null).pipe(
      tap(() => {

      }),
    );
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
}
