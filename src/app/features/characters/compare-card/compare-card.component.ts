import { Component, ElementRef, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-compare-card',
  templateUrl: './compare-card.component.html',
  styleUrls: ['./compare-card.component.scss'],
})
export class CompareCardComponent {
  @Input() name: ICompare['name'] = 'Marco Rossi';
  @Input() characters: ICompare['characters'] = [];

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
