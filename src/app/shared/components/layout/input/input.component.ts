import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    // provideIcons({ ionEye, ionEyeOff }),
  ],
})
export class InputComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    return;
  }
  registerOnTouched(fn: any): void {
    return;
  }
  setDisabledState?(isDisabled: boolean): void {
    return;
  }

  @Input() placeholder: string = 'Example';
  @Input() defaultValue: string | null = null;
  @Input() type: HTMLInputElement['type'] = 'text';
  @Input() name!: HTMLInputElement['name'];
  @Input() onChange: (e: Event, input: string) => void = () => 0;
  @Input() onBlur: (val: string) => void = () => 0;
  @Input() ngModel!: string;
  @Input() autocomplete!: 'on' | 'off';
  @Input() dataSuggestionsVar!: string;
  @Input() value: any;
  @Input() validatorFn: (v: string) => boolean = () => true;
  @Input() validatorMsg!: string;
  @Input() accept!: string;
  @Input() id!: string;
  @Input() autofocus!: boolean;

  isValid = true;

  validator(input: HTMLInputElement) {
    this.isValid = this.validatorFn(input.value);
    return this.isValid;
  }

  setType(type: string) {
    this.type = type;
  }
}
