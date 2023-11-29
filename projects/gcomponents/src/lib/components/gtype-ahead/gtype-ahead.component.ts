import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ResultTemplateContext } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { GHelpersService } from 'ghelpers';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'gtype-ahead',
  templateUrl: './gtype-ahead.component.html',
  styleUrls: ['./gtype-ahead.component.scss'],
})
export class GTypeAHeadComponent {
  //Input
  @Input() label: string | undefined;
  @Input() placeholder: string | undefined;

  @Input() search!: OperatorFunction<string, readonly any[]>;
  @Input() itemTemplate!: TemplateRef<ResultTemplateContext>;
  @Input() inputFormatter!: (item: any) => string;
  
  @Input()
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    if (this._text !== value) {
      this._text = value;
      this.onChange(this._text);
    }
  }
  @Input() feedback: string | undefined;

  //Private properties
  private _text: string;

  //ViewChild
  //[...]

  //Lifecycle events
  //[...]

  //Constructor
  constructor(
    public ngControl: NgControl,
    public controlContainer: FormGroupDirective,    
    public elementRef: ElementRef,
    helpers: GHelpersService
  ) {
    this.disabled = false;
    this._text = '';

    this.uniqueId = helpers.getUniqueId('input');
    this.ngControl.valueAccessor = this;
  }

  //Public properties
  uniqueId: string;
  disabled: boolean;

  //Output
  //[...]

  //Methods
  onChangeInternal(event: any) {
    const element = event.target as HTMLInputElement;
    this._text = element.value;    
    this.onChange(this._text);
  }

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string) {
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
