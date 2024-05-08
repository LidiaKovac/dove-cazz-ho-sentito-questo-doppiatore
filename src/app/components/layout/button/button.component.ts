import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ButtonComponent {
  @Input() value!: string;
  @Input() onClick: () => void = () => 0;
  @Input() type!: 'button' | 'submit' | 'reset';
}
