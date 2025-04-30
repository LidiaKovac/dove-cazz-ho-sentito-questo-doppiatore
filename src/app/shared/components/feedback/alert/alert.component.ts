import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() id: Alert['id'] = '0';
  @Input() type: Alert['type'] = 'info';
  classList = ['alert'];
  constructor(private readonly srv: AlertService) {}
  ngOnInit(): void {
    setTimeout(this.deleteSelf, 3000);
  }

  deleteSelf = () => {
    this.classList.push('deleting');
    setTimeout(() => {
      this.classList.pop();
      this.srv.deleteAlert(this.id);
    }, 1000);
  };
}
