import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
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
  label: string | undefined;
  @Input()
  placeholder: string | undefined;
  @Input()
  feedback: string | undefined;
  @Input()
  public get textualOptions(): ITextualOptions {
    return this._textualOptions;
  }
  public set textualOptions(value: ITextualOptions) {
    this._textualOptions = { ...this._textualOptions, ...value };
    if (this.initialized) this.filterText();
  }
  @Input()
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    if (this._text !== value) {
      this._text = value;
      this.onChangeText();      
    }
  }  

  //Private properties
  private _textualOptions: ITextualOptions;
  private _text: string;
  private initialized: boolean;

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
    this.initialized = true;
  }

  //Constructor
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public ngControl: NgControl,
    private controlContainer: ControlContainer,
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
  disabled: boolean;
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
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
