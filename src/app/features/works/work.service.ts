import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(
    private http: HttpClient,
    private loadingSrv: LoadingService,
  ) {}

  getWorks(q: string) {
    return this.http.get<IWork[]>(`${environment.url}works?query=${q}`);
  }
}
