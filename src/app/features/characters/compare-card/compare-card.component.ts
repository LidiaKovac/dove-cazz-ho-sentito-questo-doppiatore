import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-compare-card',
    templateUrl: './compare-card.component.html',
    styleUrls: ['./compare-card.component.scss'],
    standalone: false
})
export class CompareCardComponent {
  @Input() name: ICompare['name'] = 'Marco Rossi';
  @Input() characters: ICompare['characters'] = [];

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
