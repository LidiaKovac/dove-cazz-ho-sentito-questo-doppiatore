import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public $user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null,
  );
  // public user = this.$user?.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingSrv: LoadingService
  ) {
    this.getMe().subscribe();
  }

  login(data: FormData) {
    return this.http
      .post<User>(`${environment.url}user/login`, data, { observe: 'response' })
      .pipe(
        tap((res) => {
          // error handling
          this.$user?.next(res.body);
          this.router.navigate(['landing']);
          localStorage.setItem('doppiatori', res.headers.get('Authorization')!);
        }),
      );
  }
  signup(data: FormData) {
    return this.http.post<User>(`${environment.url}user/register`, data).pipe(
      tap((res) => {
        // error handling
      }),
    );
  }

  getMe() {
    return this.http.get<User>(`${environment.url}user/me`).pipe(
      map((user) => {
        this.$user.next(user);
        return user;
      }),
    );
  }

  recoverLoggedUser() {
    return this.$user.pipe(
      switchMap((user) => {
        const token = localStorage.getItem('doppiatori');
        if (!user && token) {
          return this.getMe();
        }
        return of(user);
      }),
    );
  }

  importTrakt(username: string) {
    this.loadingSrv.setLoading = true
    return this.http.put(`${environment.url}user/me/import/trakt/${username}`, {}).pipe(
      tap(() => {
        this.loadingSrv.setLoading = false
      })
    )
  }

  importLetterboxd(fd: FormData) {
    this.loadingSrv.setLoading = true
    return this.http.put<IImport>(`${environment.url}user/me/import/letterboxd`, fd).pipe(
      tap(() => {
        this.loadingSrv.setLoading = false
      }))
  }

  addToSeen(title:string) {
    return this.http.get<IWork>(`${environment.url}works?query=${title}`).pipe(switchMap((res) => {
      return this.http.put<IImport>(`${environment.url}user/me/watch/${res._id}`, {})
    }))
  }


  logout() {
    this.$user.next(null);
    localStorage.removeItem('doppiatori');
    this.router.navigate(['login']);
  }
}
