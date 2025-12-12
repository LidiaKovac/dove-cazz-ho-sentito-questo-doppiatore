import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  template: `<p>Logging out...</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logout implements OnInit {
  constructor(private router: Router, private srv: AuthService) {

  }
  ngOnInit() {
    localStorage.removeItem("doppiatori")
    this.srv.$user.next(null)
    this.router.navigate([""])
  }
}
