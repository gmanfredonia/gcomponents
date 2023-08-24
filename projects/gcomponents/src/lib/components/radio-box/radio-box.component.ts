import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioBoxComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  //Input
  @Input()
  public get label(): string | undefined {
    return this._label;
  }
  public set label(value: string | undefined) {
    if (this._label !== value) this._label = value;
  }
  @Input()
  public get disabled(): any {
    return this._disabled;
  }
  public set disabled(value: any) {
    if (this._disabled !== value) {
      this._disabled = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    if (this._value !== v) {
      this._value = v;
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
      this.onChange(this.value);
      this.changeDetectorRef.markForCheck();
    }
  }
  public showValidationMessage?: boolean;

  //Private properties
  private _label?: string;
  private _disabled?: any;
  private _value: string;
  private _checked: boolean;

  //ViewChild
  //[...]

  //Lifecycle events
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    const form = this.helpers.findAncestor(this.elementRef.nativeElement, 'form');
    const elements = form?.querySelectorAll<HTMLElement>(`input[type=radio][name=${this.ngControl.name}]`);
    //const elementsComponents = Array.prototype.slice.call(elements);
    const elementComponent = this.helpers.findAncestor(elements![elements!.length - 1] as HTMLElement, 'app-radio-box');

    this.showValidationMessage = this.elementRef.nativeElement === elementComponent

    this.formControl = this.ngControl?.control as FormControl;

    this.changeDetectorRef.detectChanges();
  }

  //Constructor
  constructor(private changeDetectorRef: ChangeDetectorRef, public ngControl: NgControl, @Optional() private controlContainer: ControlContainer, private elementRef: ElementRef, private helpers: GHelpersService) {
    this._value = '';
    this._checked = false;

    this.uniqueId = this.helpers.getUniqueId('radiobox');
    this.ngControl.valueAccessor = this;
  }

  //Public properties
  uniqueId: string;
  formControl?: FormControl;

  //Output
  //[...]

  //Methods
  //[...]

  //Interface ControlValueAccessor
  onChange = (value: string) => { }
  onTouched = () => { }

  writeValue(value: any) {
    if (typeof value === 'object')
      this.checked = value?.value ?? '' === this.value;
    else
      this.checked = (value === this.value);
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
