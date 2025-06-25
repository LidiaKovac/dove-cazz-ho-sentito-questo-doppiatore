
import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: []
})
export class ButtonComponent implements AfterViewInit, OnChanges {
  @Input() value!: string;
  @Input() onClick: () => void = () => 0;
  @Input() type!: 'button' | 'submit' | 'reset';
  @Input() disabled: boolean = false;

  @ViewChild('btn') btn!: ElementRef;
  setDisabled() {
    if (this.btn) {
      this.btn.nativeElement.disabled = this.disabled;
    }
  }
  ngAfterViewInit() {
    this.setDisabled()
  }

  ngOnChanges() {
    this.setDisabled()
  }
}
