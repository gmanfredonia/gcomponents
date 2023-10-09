import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownItem } from '../../models/idropdown-item.model';

@Component({
  selector: 'app-gpage-size',
  templateUrl: './gpage-size.component.html',
  styleUrls: ['./gpage-size.component.scss'],
})
export class GPageSizeComponent {
  /**
   *
   */
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
      { id: '10', name: '10' },
      { id: '50', name: '50' },
      { id: '100', name: '100' },
    ];

    this.formGroup = fb.group({
      pageSize: ['10'],
    });
  }
}
