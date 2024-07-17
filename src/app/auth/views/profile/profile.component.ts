import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DoppiatoriService } from 'src/app/doppiatori/doppiatori.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  username: string = '';
  isLoading!: boolean;
  notFound: string[] = [];
  suggestions: string[] = [];
  query: string = '';
  constructor(
    private authSrv: AuthService,
    private loadingSrv: LoadingService,
    private doppiatoriSrv: DoppiatoriService,
  ) {
    this.loadingSrv.$loading.asObservable().subscribe((val) => {
      this.isLoading = val;
    });
    this.doppiatoriSrv.suggestions.subscribe((s) => (this.suggestions = s));
    this.doppiatoriSrv.query.subscribe((q) => (this.query = q));
  }

  importTrakt = (ev: Event) => {
    const fd = new FormData(ev.target as HTMLFormElement);
    this.authSrv.importTrakt(fd.get('username') as string).subscribe();
  };

  importLetterboxd(ev: Event) {
    const target = ev.target as HTMLFormElement;
    const fd = new FormData(target);
    this.authSrv.importLetterboxd(fd).subscribe((nf) => {
      this.notFound = nf.titles;
    });
  }

  toggleFind(ev: Event) {
    const target = ev.target as HTMLButtonElement;
    const li = target.closest('li');
    li?.querySelector('app-input')?.classList.toggle('hide');
    li?.querySelector('button.hide')?.classList.toggle('hide');
    target.classList.toggle('hide');
    const input = li?.querySelector('app-input input') as HTMLInputElement;
    input.value = li!.id;
    li?.querySelector('span')?.classList.toggle('hide');
  }

  getSuggestions = (ev: Event) => {
    this.doppiatoriSrv.fetchSuggestions(ev, 'suggestions');
  };
  emptySuggestions() {
    this.doppiatoriSrv.emptySuggestions("suggestions")
  }

  pickSuggestion(ev: Event) {
    const picked = this.doppiatoriSrv.pickSuggestion(ev);
    const target = ev.target as HTMLButtonElement;
    target.closest('app-input')!.querySelector('input')!.value = picked;
    setTimeout(() => {
      this.emptySuggestions();

    }, 500);
  }

  addToSeen(ev: Event, og: string) {
    const target = ev.target as HTMLButtonElement;
    const li = target.closest("li")
      li?.classList.toggle("hide")
      // li?.querySelector('app-input')?.classList.toggle('hide');
      // li?.querySelector('button.hide')?.classList.toggle('hide');
      // li?.querySelector('button.find')?.classList.toggle('hide');
    this.authSrv.addToSeen(this.query).subscribe(() => {
      target.closest('li')!.remove();
      const found = this.notFound.findIndex((title) => title === og);
      if (found > -1) {
        this.notFound.splice(found, 1);
      }

    })
  }
}
