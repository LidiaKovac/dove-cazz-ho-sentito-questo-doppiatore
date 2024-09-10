import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WorkService } from 'src/app/features/works/work.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  work!: IWork;

  loading!: boolean;
  selectedLoading!: boolean;

  constructor(
    private workSrv: WorkService,
    private loadingSrv: LoadingService,
  ) {
    this.loadingSrv.$loading
      .pipe(
        switchMap((res) => {
          this.loading = res;
          return this.workSrv.isDetailsLoading;
        }),
        switchMap((res) => {
          this.selectedLoading = res;
          return this.workSrv.selected;
        }),
      )
      .subscribe((res) => {
        if (res) this.work = res;
      });
  }

  ngOnInit() {}

  close() {
    this.workSrv.setSelected(null);
  }
}
