import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'gcheck-box',
  templateUrl: './gcheck-box.component.html',
  styleUrls: ['./gcheck-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GCheckBoxComponent implements ControlValueAccessor {
  //Input
  @Input() label: string | undefined;
  @Input() type: 'standard' | 'switch';
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.onChange(value);
    }
  }

  //Private properties
  private _checked: boolean;

  //ViewChild
  //[...]

  //Lifecycle events
  //[...]

  //Constructor
  constructor(
    public ngControl: NgControl,
    public controlContainer: FormGroupDirective,
    helpers: GHelpersService
  ) {
    this.type = 'standard';
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
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
