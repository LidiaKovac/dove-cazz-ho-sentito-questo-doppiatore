import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
  
})
export class InputComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  @Input() placeholder: string = "Example";
  @Input() defaultValue: string | null = null
  @Input() type: HTMLInputElement["type"] = "text"
  @Input() name!: HTMLInputElement["name"]
  @Input() onChange!: (e: Event) => void
  @Input() onBlur!: (val: string) => void
  @Input() ngModel!: string
  value: any
}
