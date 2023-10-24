import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'gradio-box',
  templateUrl: './gradio-box.component.html',
  styleUrls: ['./gradio-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GRadioBoxComponent implements AfterViewInit, ControlValueAccessor {
  //Input
  @Input()
  public get labels(): string[] {
    return this._labels;
  }
  public set labels(value: string[]) {
    this._labels = [...value];
  }
  @Input()
  public get values(): string[] {
    return this._values;
  }
  public set values(value: string[]) {
    this._values = [...value];
  }
  @Input()
  public get selectedValue(): string | undefined {
    return this._selectedValue;
  }
  public set selectedValue(value: string | undefined) {
    if (this._selectedValue !== value) {
      this._selectedValue = value;
      this.onChangeInternal(this._selectedValue);
    }
  }
  @Input()
  public get disabledValues(): string[] | undefined {
    return this._disabledValues;
  }
  public set disabledValues(value: string[] | undefined) {
    if (value) this._disabledValues = [...value];
    else this._disabledValues = undefined;
  }

  //Private properties
  private _labels: string[];
  private _values: string[];
  private _selectedValue?: string;
  private _disabledValues?: string[];

  //ViewChild
  //[...]

  //Lifecycle events
  ngAfterViewInit(): void {
    this.uniqueIds = this.helpers.getUniqueIds('radiobox', this.labels.length);
  }

  //Constructor
  constructor(
    public ngControl: NgControl,
    public controlContainer: FormGroupDirective,
    private helpers: GHelpersService
  ) {
    this.uniqueIds = [];
    this._labels = [];
    this._values = [];

    this.ngControl.valueAccessor = this;
  }

  //Public properties
  uniqueIds: string[];

  //Output
  //[...]

  //Methods
  onChangeInternal(value: string | undefined) {
    this.selectedValue = value;
    this.onChange(value);
  }

  //Interface ControlValueAccessor
  onChange = (value: string | undefined) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (typeof value === 'object') this.selectedValue = value?.value ?? '';
    else this.selectedValue = value;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabledValues = disabled ? this.values : undefined;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
