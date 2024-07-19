import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent implements AfterViewInit, OnChanges {
  @Input() value!: string;
  @Input() onClick: () => void = () => 0;
  @Input() type!: 'button' | 'submit' | 'reset';
  @Input() disabled: boolean = false;

  @ViewChild('btn') btn!: ElementRef;

  ngAfterViewInit() {
    this.btn.nativeElement.disabled = this.disabled;
  }

  ngOnChanges() {
    console.log('ok');
    this.btn.nativeElement.disabled = this.disabled;
  }
}
