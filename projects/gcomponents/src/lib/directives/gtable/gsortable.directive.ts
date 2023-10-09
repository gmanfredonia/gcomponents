import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColumnSorting, SortDirection } from '../../models/gtable/icolumn-sorting.model';
 
const rotate: { [key in SortDirection]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

@Directive({
  selector: 'th[sortable],div.column-header',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate($event)',
  },
})
export class GSortableDirective implements OnInit {
  @Input() column: string = '';
  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';

  @Output() changeSort = new EventEmitter<IColumnSorting>();

  rotate(event: KeyboardEvent) {
    let sorting: IColumnSorting;

    this.direction = rotate[this.direction];

    sorting = {
      multi: event.shiftKey,
      column: this.column,
      direction: this.direction,
    };
    this.changeSort.emit(sorting);
  }

  constructor() {
    
  }

  ngOnInit(): void {}
}
