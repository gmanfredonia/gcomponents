import { Component, Input } from '@angular/core';

@Component({
  selector: 'gtable-page-info',
  templateUrl: './gtable-page-info.component.html'  
})
export class GTablePageInfoComponent {
  @Input() pageIndex?: number
  @Input() pageSize?: number
  @Input() totalCount?: number
  @Input() filteredCount?: number
}
