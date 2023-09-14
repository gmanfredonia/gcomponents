import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent implements AfterViewInit, ControlValueAccessor {
  //Input
  @Input()
  public get label(): string | undefined {
    return this._label;
  }
  public set label(value: string | undefined) {
    if (this._label !== value) this._label = value;
  }
  @Input()
  public get type(): 'standard' | 'switch' {
    return this._type;
  }
  public set type(value: 'standard' | 'switch') {
    if (this._type !== value) {
      this._type = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.onChange(value);
      this.changeDetectorRef.markForCheck();
    }
  }

  //Private properties
  private _label?: string;
  private _type: any;
  private _checked: boolean;

  //ViewChild
  //[...]

  //Lifecycle events
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  //Constructor
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public ngControl: NgControl,
    private helpers: GHelpersService
  ) {
    this._type = 'standard';
    this._checked = false;
    this.disabled = false;

    this.uniqueId = helpers.getUniqueId('checkbox');
    this.ngControl.valueAccessor = this;
  }

  //Public properties
  uniqueId: string;
  disabled: boolean;

  //Output
  //@Output() checkboxClick = new EventEmitter<boolean>();

  //Methods
  onChangeInternal = (value: boolean) => {
    this._checked = value;
    this.onChange(value);
    //this.checkboxClick.emit(value);
  };

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (typeof value === 'object') this.checked = value?.value ?? false;
    else this.checked = value;
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
