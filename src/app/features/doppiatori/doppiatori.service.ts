import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoppiatoriService {
  //compare
  workQuery = new BehaviorSubject<string>('');
  compareToQuery = new BehaviorSubject<string>('');
  watchListQuery = new BehaviorSubject<string>('');

  //user search && user compare
  suggestions = new BehaviorSubject<{ id: string; title: string }[]>([]);
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly loadingSrv: LoadingService
  ) {
    this.workQuery.pipe(switchMap((v) => this.getSuggestions(v))).subscribe();
    this.compareToQuery.pipe(switchMap((v) => this.getSuggestions(v))).subscribe();
    this.watchListQuery.pipe(switchMap((v) => this.getSuggestions(v))).subscribe();
  }

  private getSuggestions(query: string) {
    if (!query || query.length < 2) return of([]);
    return this.http
      .get<APIResponse<{ id: string; title: string }[]>>(
        `${environment.url}works/suggestions?query=${encodeURI(query.toLowerCase())}`
      )
      .pipe(tap((sugg) => this.suggestions.next(sugg.data)));
  }

  public getComparison(title: string, title2: string) {
    this.loadingSrv.setLoading = true;
    return this.http
      .get<APIResponse<ICompare[]>>(
        `${environment.url}doppiatori/compare?work=${encodeURI(title)}&compareTo=${encodeURI(
          title2
        )}`
      )
      .pipe(
        map((res) => {
          this.loadingSrv.setLoading = false;
          return res.data;
        })
      );
  }

  public getUserComparison(title: string) {
    this.loadingSrv.setLoading = true;
    return this.http
      .get<APIResponse<ICompare[]>>(`${environment.url}doppiatori/user-compare/${title}`)
      .pipe(
        map((res) => {
          this.loadingSrv.setLoading = false;
          return res.data;
        })
      );
  }

  navigateToComparison = () => {
    this.router.navigate(['/compare'], {
      queryParams: {
        title: this.workQuery.getValue(),
        compareTo: this.compareToQuery.getValue(),
      },
    });
  };

  navigateToUserComparison = () => {
    this.router.navigate(['/compare'], {
      queryParams: {
        query: this.watchListQuery.getValue(),
      },
    });
  };
}
