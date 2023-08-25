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
  NgbDateParserFormatter,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent
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
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get showCalendar(): boolean | undefined {
    return this._showCalendar;
  }
  public set showCalendar(value: boolean | undefined) {
    if (this._showCalendar !== value) {
      this._showCalendar = value;
      this.openCalendar();
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get selectedDate(): Date | null {
    return this._selectedDate;
  }
  public set selectedDate(value: Date | null) {
    if (this._selectedDate !== value) {
      this._selectedDate = value;
      this.onChange(value);
      this.changeDetectorRef.markForCheck();
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

  //Private properties
  private _label?: string;
  private _placeholder?: string;
  private _disabled?: any;
  private _selectedDate: Date | null;
  private _showCalendar?: boolean;
  private _feedback?: string;

  //ViewChild
  @ViewChild('datepicker', { static: true }) datePicker!: NgbInputDatepicker;

  //Lifecycle events
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.formControl = this.ngControl?.control as FormControl;
    this.openCalendar();
    this.changeDetectorRef.detectChanges();
  }

  //Constructor
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public ngControl: NgControl,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private helpers: GHelpersService
  ) {
    this._selectedDate = null;
    this.focused = false;
    document.addEventListener('focusin', this.onFocusIn);

    this.uniqueId = this.helpers.getUniqueId('datepicker');
    this.ngControl.valueAccessor = this;
  }

  //Public properties
  uniqueId: string;
  formControl?: FormControl;
  focused: boolean;

  //Output
  //[...]

  //Methods
  openCalendar = () => {
    if (this.datePicker)
      if (this.showCalendar) this.datePicker.open();
      else this.datePicker.close();
  };
  updateFormat = (formatter: NgbDateParserFormatter) => {
    const element = this.elementRef.nativeElement.querySelector('input');
    if (this.selectedDate)
      this.renderer.setProperty(
        element,
        'value',
        formatter.format({
          day: this.selectedDate.getDate(),
          month: this.selectedDate.getMonth(),
          year: this.selectedDate.getFullYear(),
        })
      );
    this.changeDetectorRef.detectChanges();
  };
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
    if (typeof value === 'object') this.selectedDate = value?.value ?? null;
    else this.selectedDate = value;
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