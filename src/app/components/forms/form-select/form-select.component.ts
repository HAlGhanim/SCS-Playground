import { Component, input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select
      [id]="selectId()"
      [disabled]="isDisabled()"
      [value]="value()"
      (change)="onSelectChange($event)"
      (blur)="onTouched()"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed bg-white"
      [ngClass]="selectClass()"
    >
      @if (placeholder()) {
      <option value="">{{ placeholder() }}</option>
      }
      <ng-content></ng-content>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectComponent),
      multi: true,
    },
  ],
})
export class FormSelectComponent implements ControlValueAccessor {
  placeholder = input('');
  selectId = input('');
  selectClass = input('');

  value = signal<any>('');
  isDisabled = signal(false);

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(val: any): void {
    this.value.set(val || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }

  onSelectChange(event: any): void {
    const newValue = event.target.value;
    this.value.set(newValue);
    this.onChange(newValue);
  }
}
