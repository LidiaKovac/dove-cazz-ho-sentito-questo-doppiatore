import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AuthService } from '../../auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DoppiatoriService } from 'src/app/doppiatori/doppiatori.service';
import { InputComponent } from 'src/app/components/layout/input/input.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements AfterViewInit {
  username: string = '';
  isLoading!: boolean;
  notFound: string[] = ['1', '2', '3'];
  suggestions: string[] = [];
  query: string = '';

  selected!: string;

  @ViewChild('appInput') input!: InputComponent;

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

  ngAfterViewInit() {
    // console.log(this.inputs)
  }

  importTrakt = (ev: Event) => {
    const fd = new FormData(ev.target as HTMLFormElement);
    this.authSrv.importTrakt(fd.get('username') as string).subscribe((nf) => {
      this.notFound = nf.titles;
    });
  };

  importLetterboxd(ev: Event) {
    const target = ev.target as HTMLFormElement;
    const fd = new FormData(target);
    this.authSrv.importLetterboxd(fd).subscribe((nf) => {
      this.notFound = nf.titles;
    });
  }

  toggleFind(show: string) {
    this.selected = show;
    setTimeout(() => {
      if (this.input) {
        this.input.value = show;
      }
    }, 100);
  }

  getSuggestions = (ev: Event) => {
    this.doppiatoriSrv.fetchSuggestions(ev, 'suggestions');
  };
  emptySuggestions() {
    this.doppiatoriSrv.emptySuggestions('suggestions');
  }

  pickSuggestion(ev: Event) {
    const picked = this.doppiatoriSrv.pickSuggestion(ev);
    this.input.value = picked;
    setTimeout(() => {
      this.emptySuggestions();
    }, 500);
  }

  addToSeen(ev: Event, og: string) {
    this.authSrv.addToSeen(this.query).subscribe(() => {
      const found = this.notFound.findIndex((title) => title === og);
      if (found > -1) {
        this.notFound.splice(found, 1);
      }
    });
  }
}
