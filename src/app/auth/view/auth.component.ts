import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authSrv: AuthService) {}

  state:boolean = true

  handleLogin(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    return this.authSrv.login(formData).subscribe();
  }

  handleRegister(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    return this.authSrv.signup(formData).subscribe();
  }
  
  toggleState() {
    this.state = !this.state
  }
}
