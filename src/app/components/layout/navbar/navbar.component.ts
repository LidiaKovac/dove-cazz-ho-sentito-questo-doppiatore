import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLogged: boolean = false
  constructor(
    private authSrv: AuthService
  ) {
    this.authSrv.$user.subscribe(user => this.isLogged = !!user)
  }
}
