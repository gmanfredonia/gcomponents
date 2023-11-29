import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  NgbDropdown,
  NgbTimeStruct,
  NgbTimepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { GHelpersService } from 'ghelpers';
import { TimeParserFormatter } from '../../services/time-parser-formatter';

@Component({
  selector: 'gtime-picker',
  templateUrl: './gtime-picker.component.html',
  styleUrls: ['./gtime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTimePickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  //Input
  @Input()
  public get label(): string | undefined {
    return this._label;
  }
  public set label(value: string | undefined) {
    if (this._label !== value) {
      this._label = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get placeholder(): string | undefined {
    return this._placeholder;
  }
  public set placeholder(value: string | undefined) {
    if (this._placeholder !== value) {
      this._placeholder = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get disabled(): any {
    return this._disabled;
  }
  public set disabled(value: any) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._disabled)
        document.removeEventListener('focusin', this.onFocusIn);
      else document.addEventListener('focusin', this.onFocusIn);
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get open(): boolean {
    return this._open;
  }
  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get showSecond(): boolean {
    return this._showSecond;
  }
  public set showSecond(value: boolean) {
    if (this._showSecond !== value) {
      this._showSecond = value;
      this.changeDetectorRef.markForCheck();
      this.formattedTime = this.formatter.format(
        this.selectedTime,
        this.showSecond,
        this.showMeridian
      );
    }
  }
  @Input()
  public get showMeridian(): boolean {
    return this._showMeridian;
  }
  public set showMeridian(value: boolean) {
    if (this._showMeridian !== value) {
      this._showMeridian = value;
      this.formattedTime = this.formatter.format(
        this.selectedTime,
        this.showSecond,
        this.showMeridian
      );      
    }
  }
  @Input()
  public get feedback(): string | undefined {
    return this._feedback;
  }
  public set feedback(value: string | undefined) {
    if (this._feedback !== value) {
      this._feedback = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get formattedTime(): string | undefined {
    return this._formattedTime;
  }
  public set formattedTime(value: string | undefined) {
    if (this._formattedTime !== value) {
      this._formattedTime = value;
      this._selectedTime = this.formatter.parse(
        value!,
        this.showSecond,
        this.showMeridian
      );
      this.onChange(this._selectedTime);
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get selectedTime(): NgbTimeStruct | null {
    return this._selectedTime;
  }
  public set selectedTime(value: NgbTimeStruct | null) {
    if (this._selectedTime !== value) {
      this._selectedTime = value;
      this._formattedTime = this.formatter.format(
        value,
        this.showSecond,
        this.showMeridian
      );
      this.onChange(value);
      this.changeDetectorRef.markForCheck();
    }
  }

  //Private properties
  private _label?: string;
  private _placeholder?: string;
  private _disabled?: any;
  private _open: boolean;
  private _showSecond: boolean;
  private _showMeridian: boolean;
  private _formattedTime?: string;
  private _selectedTime: NgbTimeStruct | null;
  private _feedback?: string;

  //ViewChild
  @ViewChild('dropdown', { static: true, read: NgbDropdown })
  dropdown!: NgbDropdown;
  //@ViewChild('input', { static: true }) input!: ElementRef;
  @ViewChild('timepicker', { static: true, read: NgbTimepicker })
  timePicker!: NgbTimepicker;

  //Lifecycle events
  ngOnInit(): void {
    if (!this.disabled) document.addEventListener('focusin', this.onFocusIn);
  }
  ngAfterViewInit(): void {
    this.formControl = this.ngControl?.control as FormControl;
    this.changeDetectorRef.detectChanges();
  }

  //Constructor
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public ngControl: NgControl,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private formatter: TimeParserFormatter,
    private helpers: GHelpersService
  ) {
    this._open = false;
    this._selectedTime = null;
    this.focused = false;
    document.addEventListener('focusin', this.onFocusIn);
    this._showSecond = false;
    this._showMeridian = false;

    this.uniqueId = helpers.getUniqueId('timepicker');
    this.ngControl.valueAccessor = this;
  }

  //Public properties
  public uniqueId: string;
  public formControl?: FormControl;
  public focused: boolean;

  //Output
  //[...]

  //Methods
  onToggleDropdown(): void {
    this.dropdown.toggle();
  }
  onFocusIn = (event: FocusEvent) => {
    this.focused = this.elementRef.nativeElement.contains(event.target);
    this.changeDetectorRef.markForCheck();
  };
  @HostListener('focusout')
  onFocusOut = () => {
    this.onTouched();
  };

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedTime = value;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
}
