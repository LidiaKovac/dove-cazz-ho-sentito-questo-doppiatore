import { Component } from '@angular/core';
import { AuthService } from './features/auth/auth.service';
import { AlertService } from './shared/components/feedback/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dove-cazz-ho-sentito-questo-doppiatore-2';
  alerts: Alert[] = [];

  constructor(
    private readonly authSrv: AuthService,
    private readonly alertSrv: AlertService,
  ) {
    this.authSrv.getMe().subscribe();
    this.alertSrv.alertList.subscribe((alerts) => (this.alerts = alerts));
  }
}
