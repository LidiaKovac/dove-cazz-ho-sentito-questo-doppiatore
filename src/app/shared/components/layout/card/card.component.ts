import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkService } from 'src/app/features/works/work.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() work!: IWork;
  // @Output() handleOptimistic = new EventEmitter();
  constructor(private workSrv: WorkService) {}

  watchWork = () => {
    this.workSrv.watchWork(this.work._id).subscribe();
  };

  unwatchWork = () => {
    this.workSrv.unwatchWork(this.work._id).subscribe();
  };
}
