import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dove-cazz-ho-sentito-questo-doppiatore-2';

  constructor(private authSrv: AuthService) {
      this.authSrv.getMe().subscribe()
  }
}
