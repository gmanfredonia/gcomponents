import { AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, NgZone } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import AutoNumeric from 'autonumeric';
import { GHelpersService } from 'ghelpers';
import { ITextualOptions } from '../../models/itextual-options.model';
import { IDecimalOptions } from '../../models/idecimal-options.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements AfterViewInit, OnInit, ControlValueAccessor {
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
  public get type(): 'text' | 'password' | 'alphabetic' | 'alphanumeric' | 'numeric' | 'decimal' {
    return this._type;
  }
  public set type(value: 'text' | 'password' | 'alphabetic' | 'alphanumeric' | 'numeric' | 'decimal') {
    if (this._type !== value) {
      this._type = value;
      if (this.initialized) {
        this.setType();
        this.filterText();
      }
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
  public get textualOptions(): ITextualOptions {
    return this._textualOptions;
  }
  public set textualOptions(value: ITextualOptions) {
    this._textualOptions = { ...this._textualOptions, ...value };
    if (this.initialized) {
      this.filterText();
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get decimalOptions(): IDecimalOptions {
    return this._decimalOptions;
  }
  public set decimalOptions(value: IDecimalOptions) {
    this._decimalOptions = { ...this._decimalOptions, ...value };
    if (this.initialized) this.setType();
  }
  @Input()
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    if (this._text !== value) {
      this._text = value;
      this.onChangeText();
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
  public get inputType(): string {
    return this.type === 'password' ? this.type : 'text';
  }
  public get isTextual(): boolean {
    return this.type !== 'decimal';
  }
  public get isDecimal(): boolean {
    return this.type === 'decimal';
  }
  public get isUpperCase(): boolean {
    let result: boolean;

    switch (this.type) {
      case 'text':
      case 'password':
      case 'alphabetic':
      case 'alphanumeric':
        result = this.textualOptions.toUpperCase ?? false;
        break;
      default:
        result = false;
        break;
    }

    return result;
  }
  public get isMaxLengthSet(): boolean {
    return this.isTextual && (this.textualOptions.maxLength ?? 0) > 0;
  }
  public get showLengthProgressBar(): boolean {
    return this.isMaxLengthSet && this.textualOptions.showLengthProgressBar === true;
  }
  public get showLengthProgressNumeric(): boolean {
    return this.isMaxLengthSet && this.textualOptions.showLengthProgressNumeric === true;
  }

  //Private properties
  private _label?: string;
  private _placeholder?: string;
  private _type: any;
  private _disabled?: any;
  private _textualOptions: ITextualOptions;
  private _decimalOptions: IDecimalOptions;
  private _text: string;
  private _feedback?: string;
  private initialized: boolean;
  private autonumeric?: AutoNumeric;
  private expression?: RegExp;

  //ViewChild
  //[...]

  //Lifecycle events
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.initialized = true;
    this.setType();
    this.formControl = this.ngControl?.control as FormControl;
  }

  //Constructor
  constructor(private changeDetectorRef: ChangeDetectorRef, public ngControl: NgControl, private ngZone: NgZone, public elementRef: ElementRef, private helpers: GHelpersService) {
    this.initialized = false;
    this._type = 'text';
    this._textualOptions = {};
    this._decimalOptions = { digitGroupSeparator: ',', decimalCharacter: '.' };
    this._text = '';

    this.uniqueId = this.helpers.getUniqueId('input');
    this.ngControl.valueAccessor = this;

    //this.renderer.setAttribute(this.elementRef.nativeElement, 'checked', 'true');
    //this.elementRef.nativeElement.getElementsByTagName('input')[0].setAttribute('checked', '');
    //elementRef.nativeElement.querySelector('.selected-order').scrollIntoView();
    //this.elementRef.nativeElement.getElementsByTagName('input')[0];
    //Object.assign(this._decimalOptions!, value);
  }

  //Public properties
  uniqueId: string;
  formControl?: FormControl;

  //Output
  //[...]

  //Methods
  onKeypress(event: KeyboardEvent) {
    if (this.expression && !this.expression.test(event.key))
      event.preventDefault();
  }
  onChangeInternal(event: any) {
    const element = event.target as HTMLInputElement;
    this._text = element.value;
    this.filterText(element);
    if (this.isDecimal)
      this.onChange(this.autonumeric!.getNumericString() ?? '');
    else
      this.onChange(this._text);
  }
  onChangeText() {
    this.filterText();
    if (this.isDecimal) {
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.createAutonumeric(this._text);
        this.onChange(this.autonumeric!.getNumericString() ?? '');
      });
    }
    else
      this.onChange(this._text);
  }
  createAutonumeric = (text?: string) => {
    if (this.autonumeric) {
      const value = text ?? this.autonumeric.getNumericString();
      this.autonumeric.update(this._decimalOptions!);
      this.autonumeric.set(value);
    }
    else
      this.autonumeric = new AutoNumeric(this.elementRef.nativeElement.querySelector('input'), this._text, this._decimalOptions);
  }
  destroyAutonumeric = () => {
    this.autonumeric?.remove();
    this.autonumeric = undefined;
  }
  setType = () => {
    switch (this.type) {
      case 'alphabetic':
        this.expression = /^([a-zA-Z]|Enter)$/;
        this.destroyAutonumeric();
        break;
      case 'alphanumeric':
        this.expression = /^([0-9a-zA-Z]|Enter)$/;
        this.destroyAutonumeric();
        break;
      case 'numeric':
        this.expression = /^([0-9]|Enter)$/;
        this.destroyAutonumeric();
        break;
      case 'decimal':
        this.expression = undefined;
        this.ngZone.onStable.pipe(first()).subscribe(() => {
          this.createAutonumeric();
        });
        break;
      default:
        this.expression = undefined;
        this.destroyAutonumeric();
        break;
    }
  }
  filterText = (element?: HTMLInputElement) => {
    if (element) {
      if (this.isUpperCase) {
        const start = element.selectionStart;

        element.value = element.value.toUpperCase();
        element.setSelectionRange(start, start);
        this._text = element.value;
      }
    }
    else {
      switch (this.type) {
        case 'alphabetic':
          this._text = this._text.replace(/[^a-zA-Z]/g, '');
          break;
        case 'alphanumeric':
          this._text = this._text.replace(/[^0-9a-zA-Z]/g, '');
          break;
        case 'numeric':
          this._text = this._text.replace(/[^0-9]/g, '');
          break;
        case 'decimal':
          this._text = this._text.replace(new RegExp(`[^0-9${this.decimalOptions.decimalCharacter}]`, 'g'), '');
          break;
      }
      if (this.isUpperCase)
        this._text = this._text.toUpperCase();
    }
  }

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: string) => { }
  onTouched = () => { }

  writeValue(value: any) {
    if (typeof value === 'object')
      this.text = value?.value ?? '';
    else
      this.text = value.toString();
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
