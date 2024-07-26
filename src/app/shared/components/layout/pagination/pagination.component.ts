import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnInit {
  @Input() pages: number = 1;
  @Input() onClick: (page: number) => void = () => null;
  pagesArr: null[] = [];
  // constructor() {
  //   this.pagesArr = new Array(this.pages - 1);
  // }

  ngOnInit() {
    this.pagesArr = new Array(this.pages - 1);
  }
}
