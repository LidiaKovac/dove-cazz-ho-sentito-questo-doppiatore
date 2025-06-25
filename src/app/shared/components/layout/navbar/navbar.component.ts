import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLogged: boolean = false;

  @ViewChild('dropdown', { static: true, read: ElementRef })
  navDropdown!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly authSrv: AuthService,
    private readonly router: Router,
  ) {
    this.authSrv.$user.subscribe((user) => (this.isLogged = !!user));
  }

  navigateToSearch(ev: Event) {
    ev.preventDefault();
    const fd = new FormData(ev.target as HTMLFormElement);
    const query = fd.get('query');
    this.router.navigate(['/works'], {
      queryParams: { query },
    });
  }
  openNav() {
    this.navDropdown.nativeElement.classList.toggle('open');
  }
}
