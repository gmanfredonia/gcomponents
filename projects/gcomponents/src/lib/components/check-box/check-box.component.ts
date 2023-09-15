import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor {
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
  ngOnInit(): void {
    this.ngControl.valueChanges?.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
    this.controlContainer.valueChanges?.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  //Constructor
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public ngControl: NgControl,
    public controlContainer: ControlContainer,
    private helpers: GHelpersService
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
