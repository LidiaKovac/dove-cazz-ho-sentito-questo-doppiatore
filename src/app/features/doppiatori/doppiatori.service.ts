import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoppiatoriService {
  [key: string]: any;

  //compare
  showOneQuery = new BehaviorSubject<string>('');
  showTwoQuery = new BehaviorSubject<string>('');
  watchListQuery = new BehaviorSubject<string>('');
  suggestionsOne = new BehaviorSubject<string[]>([]);
  suggestionsTwo = new BehaviorSubject<string[]>([]);
  suggestionsWatchList = new BehaviorSubject<string[]>([]);

  //user search && user compare
  suggestions = new BehaviorSubject<string[]>([]);
  query = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingSrv: LoadingService,
  ) {}

  private getSuggestions(query: string, input: string) {
    return this.http
      .get<
        string[]
      >(`${environment.url}doppiatori/suggestions?query=${encodeURI(query.toLowerCase())}`)
      .pipe(tap((res) => this[input].next(res)));
  }

  public getComparison(title: string, title2: string) {
    this.loadingSrv.setLoading = true;
    return this.http
      .get<ICompare[]>(`${environment.url}doppiatori/compare?work=${title}&compareTo=${title2}`)
      .pipe(
        tap(() => {
          this.loadingSrv.setLoading = false;
        }),
      );
  }

  public getUserComparison(title: string) {
    this.loadingSrv.setLoading = true;
    console.log(title);
    return this.http.get<IWork>(`${environment.url}works/name?name=${title}`).pipe(
      switchMap(({ _id }) => {
        return this.http.get<ICompare[]>(`${environment.url}doppiatori/user-compare/${_id}`);
      }),
      map((characters) => {
        return characters.map((char) => {
          return {
            ...char,
            characters: char.characters.filter((c) => c.character.length > 0),
          };
        });
      }),
      tap(() => {
        this.loadingSrv.setLoading = false;
      }),
    );
  }

  public fetchSuggestions = (ev: Event, varName: string) => {
    const target = ev.target as HTMLInputElement;
    this[target.name].next(target.value);
    if (this[target.name].getValue().length % 3 && target.value.length > 3) {
      this.getSuggestions(this[target.name].getValue(), varName).subscribe();
    }
  };

  emptySuggestions = (input: string) => {
    setTimeout(() => {
      this[input].next([]);
    }, 300);
  };

  pickSuggestion({ target }: Event) {
    const targetAsDiv = target as HTMLDivElement;
    this[targetAsDiv.id].next(targetAsDiv.innerText);
    return targetAsDiv.innerText;
  }

  navigateToComparison = () => {
    this.router.navigate(['/compare'], {
      queryParams: {
        title: this.showOneQuery.getValue(),
        compareTo: this.showTwoQuery.getValue(),
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
