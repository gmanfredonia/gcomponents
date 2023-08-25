import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { NgbDropdown, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownItem } from '../../models/idropdown-item.model';
import { IDropdownStatus } from '../../models/idropdown-status.model';
import { IDropdownType } from '../../models/idropdown-type.model';
import { GDropdownI18n } from '../../services/gdropdown-i18n';

import { first } from 'rxjs';
import { GHelpersService } from 'ghelpers';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent
  implements OnInit, AfterViewInit, AfterContentChecked, ControlValueAccessor
{
  //Input
  @Input()
  get label(): string | undefined {
    return this._label;
  }
  set label(value: string | undefined) {
    if (this._label !== value) {
      this._label = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get placeholderToggle(): string | undefined {
    return this._placeholderToggle;
  }
  set placeholderToggle(value: string | undefined) {
    if (this._placeholderToggle !== value) {
      this._placeholderToggle = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get placeholderSearch(): string | undefined {
    return this._placeholderSearch;
  }
  set placeholderSearch(value: string | undefined) {
    if (this._placeholderSearch !== value) {
      this._placeholderSearch = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get showSearch(): boolean | undefined {
    return this._showSearch;
  }
  set showSearch(value: boolean | undefined) {
    if (this._showSearch !== value) {
      this._showSearch = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  @Input()
  get status(): IDropdownStatus {
    return this._status;
  }
  set status(value: IDropdownStatus) {
    this._status = { ...this._status, ...value };
    this.changeDetectorRef.markForCheck();
  }
  @Input()
  get type(): IDropdownType {
    return this._type;
  }
  set type(value: IDropdownType) {
    //Combination allowed
    /* Multiselect  Autoclose   Open
    false           false       true
    false           true        true
    false           true        false
    false           outside     true
    false           outside     false
    true            false       true
    true            outside     true */
    this._type = { ...this._type, ...value };
    this.changeDetectorRef.markForCheck();

    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.dropdown.close();
      if (value.open && !this.disabled) this.dropdown.open();
    });
  }
  @Input()
  get items(): IDropdownItem[] {
    return this._items;
  }
  set items(value: IDropdownItem[]) {
    if (this._items !== value) {
      this._items = value;
      this.selectedItems = [];
      this.filtered = this.items;
      this.changeDetectorRef.markForCheck();

      this.searchReset();
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.setActiveElement(
          this.filtered.findIndex((r) => r === this.selectedItems[0])
        );
        this.scrollToActiveElement(true);
      });
    }
  }
  @Input()
  get feedback(): string | undefined {
    return this._feedback;
  }
  set feedback(value: string | undefined) {
    if (this._feedback !== value) {
      this._feedback = value;
      this.changeDetectorRef.markForCheck();
    }
  }
  get activeElement(): HTMLElement | undefined {
    return this.elementRef.nativeElement.querySelector('.dropdown-item.active');
  }

  //Private properties
  private _label?: string;
  private _placeholderToggle?: string;
  private _placeholderSearch?: string;
  private _disabled?: any;
  private _showSearch?: boolean;
  private _status: IDropdownStatus;
  private _type: IDropdownType;
  private _items!: IDropdownItem[];
  private _feedback?: string;
  private previousSearchValue: string;

  //ViewChild
  @ViewChild('dropdown', { static: true, read: NgbDropdown })
  dropdown!: NgbDropdown;
  @ViewChild('dropdownMenu', { static: false, read: NgbDropdownMenu })
  dropdownMenu!: NgbDropdownMenu;
  @ViewChild('search', { static: false }) search!: ElementRef;
  @ViewChild('dropdownItems', { static: false, read: ElementRef })
  dropdownItems!: ElementRef;

  //Lifecycle events
  ngOnInit() {
    this.items.map((item) => {
      item.enabled ??= true;
    });
    this.filtered = this.items;
  }
  ngAfterViewInit() {
    this.formControl = this.ngControl?.control as FormControl;
  }
  ngAfterContentChecked(): void {
    if (this.type.autoClose === false && !this.disabled && (this.feedback || !this.formControl?.valid))
      this.changeDetectorRef.markForCheck();
  }

  //Constructor
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public ngControl: NgControl,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    public helpers: GHelpersService,
    @Optional() public localization: GDropdownI18n
  ) {
    this.uniqueId = this.helpers.getUniqueId('dropdown');
    this._type = { multiSelect: false, autoClose: true, open: false };
    this._status = {};
    this.previousSearchValue = '';
    this.selectedItems = [];
    this.items = [];
    this.filtered = [];
    this.focused = false;

    this.ngControl.valueAccessor = this;
    document.addEventListener('focusin', this.onFocusIn);
  }

  //Public properties
  uniqueId: string;
  selectedItems: IDropdownItem[];
  filtered: IDropdownItem[];
  formControl?: FormControl;
  focused: boolean;

  //Output
  //[...]

  //Methods
  getToggleText = (): string => {
    let result: string | undefined;

    this.selectedItems.forEach((r, i) => {
      if (i === 0) result = r.name;
      else if (i < 5) result += ', ' + r.name;
      else if (i === this.selectedItems!.length - 1) {
        result += ' +';
      }
    });

    return result ?? this.placeholderToggle ?? 'Select an item';
  };
  getFeedbackTop = (): string => {
    return ((this.dropdownMenu.nativeElement.clientHeight ) + 5) + 'px';
  };
  getValidatonMessageTop = (): string => {
    return this.feedback ? '0px' : this.getFeedbackTop();
  };

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  onArrowsKeydown(event: KeyboardEvent) {
    let indexActive: number;
    let activeElement: HTMLElement | undefined;

    event.preventDefault();

    if (this.filtered.length > 0) {
      indexActive = -1;

      activeElement = this.activeElement;
      if (activeElement)
        indexActive = [
          ...this.elementRef.nativeElement.querySelectorAll('.dropdown-item'),
        ].indexOf(activeElement);
      indexActive = this.findFirstEnabled(
        indexActive,
        event.key === 'ArrowUp' ? 'up' : 'down'
      );

      this.setActiveElement(indexActive);
      this.scrollToActiveElement();
    }
  }
  onSearchKeyup = (event: KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value;
    let index: number;
    let activeElement: HTMLElement | undefined;

    if (value !== this.previousSearchValue) {
      this.previousSearchValue = value;
      this.filtered = value
        ? this.items.filter(
            (r) => r.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
          )
        : this.items;

      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.setActiveElement(
          value.length === 0 && !this._type.multiSelect
            ? this.filtered.findIndex((r) => r === this.selectedItems[0])
            : this.findFirstEnabled(-1, 'down')
        );
        this.scrollToActiveElement(true);
      });
    } else if (event.key === 'Enter') {
      activeElement = this.activeElement;
      if (activeElement) {
        index = [
          ...this.elementRef.nativeElement.querySelectorAll('.dropdown-item'),
        ].indexOf(activeElement);
        this.onChangeInternal(this.filtered.find((r, i) => index === i)!);
        if (this._type.autoClose === true) this.dropdown.close();
      }
    }
  };
  onFocusIn = (event: FocusEvent) => {
    this.focused = this.elementRef.nativeElement.contains(event.target);
    this.changeDetectorRef.markForCheck();
  };
  @HostListener('focusout')
  onFocusOut = () => {
    if (this.type.multiSelect) this.onTouched();
  };
  onOpenChange = (value: boolean) => {
    if (value) {
      this.setActiveElement(
        this.filtered.findIndex((r) => r === this.selectedItems[0])
      );
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.searchFocus();
        this.scrollToActiveElement(true);
      });
    }
  };
  onChangeInternal = (item: IDropdownItem) => {
    let indexSelected: number;
    let index: number;

    if (this.type.multiSelect) {
      indexSelected = this.selectedItems.findIndex((r) => r === item);
      if (indexSelected === -1) {
        index = this.items.indexOf(item);
        index = this.selectedItems.findIndex(
          (r) => this.items.findIndex((rr) => rr === r) > index
        );
        if (index === -1) this.selectedItems.push(item);
        else this.selectedItems.splice(index, 0, item);
      } else this.selectedItems.splice(indexSelected, 1);
      this.onChange(this.selectedItems);

      this.searchFocus();
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.setActiveElement(this.filtered.findIndex((r) => r === item));
        this.scrollToActiveElement();
      });
    } else {
      this.selectedItems = [item];
      this.filtered = this.items;
      this.onChange(item);

      this.searchReset();
      this.searchFocus();
      this.ngZone.onStable.pipe(first()).subscribe(() => {
        this.setActiveElement(
          this.selectedItems.length > 0
            ? this.filtered.findIndex((r) => r === this.selectedItems[0])
            : this.findFirstEnabled(-1, 'down')
        );
        this.scrollToActiveElement();
      });
    }
  };
  onJumpToFirst = () => {
    this.searchFocus();
    this.setActiveElement(
      this.selectedItems.length > 0
        ? this.filtered.findIndex((r) => r === this.selectedItems[0])
        : this.findFirstEnabled(-1, 'down')
    );
    this.scrollToActiveElement(true);
  };
  onSelectAll = () => {
    this.selectedItems = [...this.filtered];
    this.onChange(this.selectedItems);

    this.searchFocus();
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.setActiveElement(this.findFirstEnabled(-1, 'up'));
      this.scrollToActiveElement(true);
    });
  };
  onCancel = () => {
    this.selectedItems = [];
    if (!this.type.multiSelect) this.filtered = this.items;
    this.onChange(this.selectedItems);

    if (!this.type.multiSelect) this.searchReset();
    this.searchFocus();
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.setActiveElement(this.findFirstEnabled(-1, 'down'));
      this.scrollToActiveElement(true);
    });
  };
  private isIDropdownItem(item: any): item is IDropdownItem {
    return item && typeof item === 'object' && 'id' in item;
  }
  private searchReset = () => {
    if (this.showSearch) {
      this.previousSearchValue = '';
      this.search.nativeElement.value = '';
    }
  };
  private searchFocus = () => {
    this.search?.nativeElement.focus();
  };
  private setActiveElement = (index?: number) => {
    let element: HTMLElement;

    this.elementRef.nativeElement
      .querySelectorAll('.dropdown-item.active')
      .forEach((element: HTMLElement) =>
        this.renderer.removeClass(element, 'active')
      );
    element = this.elementRef.nativeElement.querySelector(
      '.dropdown-item:nth-child(' + ((index ?? 0) + 1) + ')'
    );
    if (element) this.renderer.addClass(element, 'active');
  };
  private scrollToActiveElement(onTop?: boolean) {
    let scrollValue: number | undefined;

    if (this.activeElement) {
      const rectActiveElement = this.activeElement.getBoundingClientRect();
      const rectDropdownItems =
        this.dropdownItems.nativeElement.getBoundingClientRect();

      if (onTop || rectActiveElement.top < rectDropdownItems.top)
        scrollValue = rectActiveElement.top - rectDropdownItems.top;
      else if (rectActiveElement.bottom > rectDropdownItems.bottom)
        scrollValue = rectActiveElement.bottom - rectDropdownItems.bottom;

      if (scrollValue)
        this.dropdownItems.nativeElement.scrollTop += scrollValue;
    }
  }
  private findFirstEnabled = (
    limit: number,
    direction: 'up' | 'down'
  ): number => {
    let result: number;
    let items: IDropdownItem[];

    if (direction === 'up') {
      items = this.filtered.slice().reverse();
      limit = items.length - 1 - limit;
    } else items = this.filtered;

    result = items.findIndex((r, i) => i > limit && r.enabled);
    if (result === -1)
      result = items.findIndex((r, i) => i <= limit && r.enabled);

    if (direction === 'up' && result !== -1)
      result = this.filtered.length - 1 - result;

    return result;
  };

  //Interfaces

  //Interface ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any) {
    let ids: string[] | undefined;

    if (typeof value === 'string') ids = [value];
    else if (typeof value === 'number') ids = [value.toString()];
    else if (this.isIDropdownItem(value)) ids = [value.id];
    else if (
      Array.isArray(value) &&
      value.every((r: any) => this.isIDropdownItem(r))
    )
      ids = (value as IDropdownItem[]).map((r) => r.id);

    if (ids)
      this.selectedItems = this.items.filter(
        (r) =>
          ids?.indexOf(r.id) !== -1 && (r.enabled === undefined || r.enabled)
      );
  }
  setDisabledState?(disabled: boolean) {
    if (this.disabled !== disabled) {
      this.disabled = disabled;
      this.filtered = this.items;
      this.changeDetectorRef.markForCheck();

      this.ngZone.onStable.pipe(first()).subscribe(() => {
        if (!this.disabled) {
          this.scrollToActiveElement(true);
        }
      });
    }
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
}
