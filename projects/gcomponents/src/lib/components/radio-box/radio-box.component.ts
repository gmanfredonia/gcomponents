import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioBoxComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
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
  ngOnInit(): void {
    this.ngControl.valueChanges?.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
    this.controlContainer.valueChanges?.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
  ngAfterViewInit(): void {
    this.uniqueIds = this.helpers.getUniqueIds('radiobox', this.labels.length);
  }

  //Constructor
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public ngControl: NgControl,
    private controlContainer: ControlContainer,
    public helpers: GHelpersService
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
