import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { password, required } from 'src/app/validators';
import { AlertService } from 'src/app/components/feedback/alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private authSrv: AuthService,
    private alertSrv: AlertService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((qp) => {
      qp["signup"] === "true" ? this.state = false : this.state = true
    })
  }

  state: boolean = true




  handleLogin(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    return this.authSrv.login(formData).subscribe();
  }

  handleRegister(ev: Event) {
    const formData = new FormData(ev.target as HTMLFormElement);
    console.log(formData.get("password"), formData.get("confirmPassword"))
    if (formData.get("password") !== formData.get("confirmPassword")) {
      this.alertSrv.addAlert("Passwords don't match", "error")
      return
    }
    return this.authSrv.signup(formData).subscribe();
  }

  toggleState() {
    this.state = !this.state
  }

  passValidator() {
    return password
  }
  requiredValidator() {
    return required
  }
}
