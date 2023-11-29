import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import AutoNumeric from 'autonumeric';
import { GHelpersService } from 'ghelpers';
import { ITextualOptions } from '../../models/itextual-options.model';
import { IDecimalOptions } from '../../models/idecimal-options.model';
import { Subject, Subscription, first } from 'rxjs';

@Component({
  selector: 'ginput',
  templateUrl: './ginput.component.html',
  styleUrls: ['./ginput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GInputComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  //Input
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;
  @Input()
  get type():
    | 'text'
    | 'password'
    | 'alphabetic'
    | 'alphanumeric'
    | 'numeric'
    | 'decimal' {
    return this._type;
  }
  set type(
    value:
      | 'text'
      | 'password'
      | 'alphabetic'
      | 'alphanumeric'
      | 'numeric'
      | 'decimal'
  ) {
    if (this._type !== value) {
      this._type = value;
      if (this.initialized) {
        this.setType();
        this.filterText();
      }
    }
  }
  @Input()
  get textualOptions(): ITextualOptions {
    return this._textualOptions;
  }
  set textualOptions(value: ITextualOptions) {
    this._textualOptions = { ...this._textualOptions, ...value };
    if (this.initialized) this.filterText();
  }
  @Input()
  get decimalOptions(): IDecimalOptions {
    return this._decimalOptions;
  }
  set decimalOptions(value: IDecimalOptions) {
    this._decimalOptions = { ...this._decimalOptions, ...value };
    if (this.initialized) this.setType();
  }
  @Input()
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    let result: string | number | null;
    if (this._text !== value) {
      this.textChanged = true;
      this._text = value;
      this.filterText();      
      if (this.isDecimal) {
        this.createAutonumeric(this._text);
        result = this.autonumeric!.getNumericString();
        if (result !== null && result !== '')
          result = parseFloat(result.toString());
        else {
          result = null;
        }
      } else {
        result = this._text;
      }
      this.onChange(result);
    }
  }
  @Input() feedback: string | undefined;

  //Private properties
  private _type: any;
  private _textualOptions: ITextualOptions;
  private _decimalOptions: IDecimalOptions;
  private _text: string;
  private initialized: boolean;
  private autonumeric?: AutoNumeric;
  private expression?: RegExp;
  private textChanged?: boolean;
  private subscriptionAutonumeric!: Subscription;

  //ViewChild
  //[...]

  //Lifecycle events
  ngAfterViewInit(): void {
    this.initialized = true;
    this.setType();

    this.subscriptionAutonumeric = this.ngZone.onStable.subscribe(() => {
      if (this.isDecimal)
        if (this.textChanged) {
          this.textChanged = false;
          this.createAutonumeric(this._text);
        } else if (!this.autonumeric) {
          this.createAutonumeric();
        }
    });
  }
  ngOnDestroy(): void {
    this.subscriptionAutonumeric.unsubscribe();
  }

  //Constructor
  constructor(
    public ngControl: NgControl,
    public controlContainer: FormGroupDirective,
    private ngZone: NgZone,
    public elementRef: ElementRef,
    helpers: GHelpersService
  ) {
    this.initialized = false;
    this.disabled = false;
    this._type = 'text';
    this._textualOptions = {};
    this._decimalOptions = { digitGroupSeparator: ',', decimalCharacter: '.' };
    this._text = '';

    this.uniqueId = helpers.getUniqueId('input');
    this.ngControl.valueAccessor = this;

    //this.renderer.setAttribute(this.elementRef.nativeElement, 'checked', 'true');
    //this.elementRef.nativeElement.getElementsByTagName('input')[0].setAttribute('checked', '');
    //elementRef.nativeElement.querySelector('.selected-order').scrollIntoView();
    //this.elementRef.nativeElement.getElementsByTagName('input')[0];
    //Object.assign(this._decimalOptions!, value);
  }

  //Public properties
  uniqueId: string;
  disabled: boolean;
  get inputType(): string {
    return this.type === 'password' ? this.type : 'text';
  }
  get isTextual(): boolean {
    return this.type !== 'decimal';
  }
  get isDecimal(): boolean {
    return this.type === 'decimal';
  }
  get isUpperCase(): boolean {
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
  get isMaxLengthSet(): boolean {
    return this.isTextual && (this.textualOptions.maxLength ?? 0) > 0;
  }
  get showLengthProgressBar(): boolean {
    return (
      this.isMaxLengthSet && this.textualOptions.showLengthProgressBar === true
    );
  }
  get showLengthProgressNumeric(): boolean {
    return (
      this.isMaxLengthSet &&
      this.textualOptions.showLengthProgressNumeric === true
    );
  }

  //Output
  //[...]

  //Methods
  onKeypress(event: KeyboardEvent) {
    if (this.expression && !this.expression.test(event.key))
      event.preventDefault();
  }
  onChangeInternal(event: any) {
    let result: string | number | null;
    const element = event.target as HTMLInputElement;
    this._text = element.value;
    this.filterText(element);
    if (this.isDecimal) {
      result = this.autonumeric!.getNumericString();
      if (result !== null && result !== '')
        result = parseFloat(result.toString());
      else {
        result = null;
      }
    } else {
      result = this._text;
    }
    this.onChange(result);
  }
  createAutonumeric = (text?: string) => {
    if (this.autonumeric) {
      const value = text ?? this.autonumeric!.getNumericString();
      this.autonumeric.update(this._decimalOptions!);
      this.autonumeric.set(value);
    } else
      this.autonumeric = new AutoNumeric(
        this.elementRef.nativeElement.querySelector('input'),
        this._text,
        this._decimalOptions
      );
  };
  destroyAutonumeric = () => {
    this.autonumeric?.remove();
    this.autonumeric = undefined;
  };
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
        break;
      default:
        this.expression = undefined;
        this.destroyAutonumeric();
        break;
    }
  };
  filterText = (element?: HTMLInputElement) => {
    if (element) {
      if (this.isUpperCase) {
        const start = element.selectionStart;

        element.value = element.value.toUpperCase();
        element.setSelectionRange(start, start);
        this._text = element.value;
      }
    } else {
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
          this._text = this._text.replace(
            new RegExp(`[^0-9${this.decimalOptions.decimalCharacter}]`, 'g'),
            ''
          );
          break;
      }
      if (this.isUpperCase) this._text = this._text.toUpperCase();
    }
  };

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: string | number | null) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (typeof value === 'object') this.text = value?.value ?? '';
    else this.text = value.toString();
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
