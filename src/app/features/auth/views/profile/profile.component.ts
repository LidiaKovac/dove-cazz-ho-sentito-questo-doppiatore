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
import { InputComponent } from 'src/app/shared/components/layout/input/input.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DoppiatoriService } from 'src/app/features/doppiatori/doppiatori.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  //!import
  username: string = '';
  isLoading!: boolean;
  notFound: string[] = [];
  suggestions: string[] = [];
  query: string = '';

  selected!: string;

  @ViewChild('appInput') input!: InputComponent;

  //!profile edit
  user!: User;
  isSavingUser: boolean = false;

  constructor(
    private authSrv: AuthService,
    private loadingSrv: LoadingService,
    private doppiatoriSrv: DoppiatoriService,
  ) {
    this.loadingSrv.$loading.asObservable().subscribe((val) => {
      this.isLoading = val;
    });
    this.authSrv.$user.asObservable().subscribe((u) => {
      if (u) this.user = u;
    });
    this.doppiatoriSrv.suggestions.subscribe((s) => (this.suggestions = s));
    this.doppiatoriSrv.query.subscribe((q) => (this.query = q));
  }

  //!import
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

  addToSeen(og: string) {
    this.authSrv.addToSeen(this.query).subscribe(() => {
      const found = this.notFound.findIndex((title) => title === og);
      if (found > -1) {
        this.notFound.splice(found, 1);
      }
    });
  }

  //! edit profile

  editMe(ev: Event) {
    this.isSavingUser = true;
    const fd = new FormData(ev.target as HTMLFormElement);

    this.authSrv.editMe(fd).subscribe(() => {
      this.isSavingUser = false;
    });
  }
}
