import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/components/feedback/alert/alert.service';
import { password, required } from 'src/app/core/validators';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: false
})
export class AuthComponent {
  constructor(
    private readonly authSrv: AuthService,
    private readonly alertSrv: AlertService,
    private readonly route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((qp) => {
      if(qp['signup'] === 'true') {
        this.state = false
      } else {
        this.state = true
      }
    });
  }

  state: boolean = true;

  handleLogin(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    return this.authSrv.login(formData).subscribe();
  }

  handleRegister(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    console.log(formData.get('password'), formData.get('confirmPassword'));
    if (formData.get('password') !== formData.get('confirmPassword')) {
      this.alertSrv.addAlert("Passwords don't match", 'error');
      return;
    }
    return this.authSrv.signup(formData).subscribe();
  }

  toggleState() {
    this.state = !this.state;
  }

  passValidator() {
    return password;
  }
  requiredValidator() {
    return required;
  }
}
