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
  constructor(
    private http: HttpClient,
    private loadingSrv: LoadingService,
    private alertSrv: AlertService,
  ) {}

  getWorks(q: string) {
    return this.http.get<IWork[]>(`${environment.url}works?query=${q}`).pipe(
      tap(() => {
        this.loadingSrv.setLoading = false;
      }),
      map((res) => this.works.next(res)),
    );
  }

  watchWork(id: string) {
    return this.http.put<IWork[]>(`${environment.url}user/me/watch/${id}`, null).pipe(
      tap(() => {
        this.optimisticToggleSeen(id);
      }),
    );
  }

  unwatchWork(id: string) {
    return this.http.put<IWork[]>(`${environment.url}user/me/unwatch/${id}`, null).pipe(
      tap(() => {
        this.optimisticToggleSeen(id);
      }),
    );
  }

  optimisticToggleSeen(id: string) {
    const currentWorks = this.works.getValue();
    for (let i = 0; i < currentWorks.length; i++) {
      const work = currentWorks[i];
      if (work._id === id) {
        currentWorks[i].isSeen = !currentWorks[i].isSeen;
        this.alertSrv.addAlert(
          `Elemento ${currentWorks[i].isSeen ? 'aggiunto ' : 'rimosso d'}alla tua lista`,
          'info',
        );
        break;
      }
    }
    this.works.next(currentWorks);
  }
}
