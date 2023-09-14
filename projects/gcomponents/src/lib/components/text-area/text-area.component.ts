import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,  
  Input,  
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ITextualOptions } from '../../models/itextual-options.model';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  //Input
  @Input()
  public get label(): string | undefined {
    return this._label;
  }
  public set label(value: string | undefined) {
    if (this._label !== value) this._label = value;
  }
  @Input()
  public get placeholder(): string | undefined {
    return this._placeholder;
  }
  public set placeholder(value: string | undefined) {
    if (this._placeholder !== value) this._placeholder = value;
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
  public get isUpperCase(): boolean {
    return this.textualOptions.toUpperCase ?? false;
  }
  public get isMaxLengthSet(): boolean {
    return (this.textualOptions.maxLength ?? 0) > 0;
  }
  public get showLengthProgressBar(): boolean {
    return (
      this.isMaxLengthSet && this.textualOptions.showLengthProgressBar === true
    );
  }
  public get showLengthProgressNumeric(): boolean {
    return (
      this.isMaxLengthSet &&
      this.textualOptions.showLengthProgressNumeric === true
    );
  }
  public disabled: boolean;  

  //Private properties
  private _label?: string;
  private _placeholder?: string;
  private _feedback?: string;
  private _textualOptions: ITextualOptions;
  private _text: string;
  private initialized: boolean;  

  //ViewChild
  //[...]

  //Lifecycle events
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initialized = true;
    this.formControl = this.ngControl?.control as FormControl;
    this.changeDetectorRef.detectChanges();
  }

  //Constructor
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public ngControl: NgControl,    
    private helpers: GHelpersService
  ) {
    this.initialized = false;
    this._textualOptions = {};
    this._text = '';

    this.uniqueId = this.helpers.getUniqueId('textarea');
    this.ngControl.valueAccessor = this;
    this.disabled = false;    
  }

  //Public properties
  uniqueId: string;
  formControl?: FormControl;

  //Output
  //[...]

  //Methods
  onChangeInternal(event: any) {
    const element = event.target as HTMLInputElement;
    this._text = element.value;
    this.filterText(element);
    this.onChange(this._text);
  }
  onChangeText() {
    this.filterText();
    this.onChange(this._text);
  }
  filterText = (element?: HTMLInputElement) => {
    if (element) {
      if (this.isUpperCase) {
        const start = element.selectionStart;

        element.value = element.value.toUpperCase();
        element.setSelectionRange(start, start);
        this._text = element.value;
      }
    } else {
      if (this.isUpperCase) this._text = this._text.toUpperCase();
    }
  };

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (typeof value === 'object') this.text = value?.value ?? '';
    else this.text = value.toString();
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
