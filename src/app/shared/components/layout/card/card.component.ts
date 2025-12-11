import { Component, Input } from '@angular/core';
import { WorkService } from 'src/app/features/works/work.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: false
})
export class CardComponent {
  @Input() work!: IWork;
  @Input() clickFn!: (work: IWork) => void;
  constructor(private readonly workSrv: WorkService) {}

  watchWork = () => {
    this.workSrv.watchWork(this.work.id).subscribe();
  };

  unwatchWork = () => {
    this.workSrv.unwatchWork(this.work.id).subscribe();
  };
}
