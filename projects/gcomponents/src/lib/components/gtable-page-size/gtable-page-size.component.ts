import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownItem } from '../../models/idropdown-item.model';

@Component({
  selector: 'gtable-page-size',
  templateUrl: './gtable-page-size.component.html',
  styleUrls: ['./gtable-page-size.component.scss'],
})
export class GTablePageSizeComponent {
  onModelChange(event: IDropdownItem) {
    this.changePageSize.emit(parseInt(event.id));
  }

  @Input() labelBefore?: string;
  @Input() labelAfter?: string;
  @Output() changePageSize = new EventEmitter<number>();

  formGroup: FormGroup;

  items: IDropdownItem[];
  constructor(private fb: FormBuilder) {
    this.items = [
      { id: '10', name: '10', enabled: true },
      { id: '50', name: '50' },
      { id: '100', name: '100' },
    ];

    this.formGroup = fb.group({
      pageSize: ['10'],
    });
  }
}
