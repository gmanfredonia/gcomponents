import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GTablePagerComponent } from '../gtable-pager/gtable-pager.component';
import { GSortableDirective } from '../../directives/gtable/gsortable.directive';
import { IColumnSorting } from '../../models/gtable/icolumn-sorting.model';
import { ITableRequest } from '../../models/gtable/itable-request.model';
import { GTablePageInfoComponent } from '../gtable-page-info/gtable-page-info.component';
import { ITableResponse } from '../../models/gtable/itable-response.model';

@Component({
  selector: 'app-gtable',
  template: '',
})
export class GTableComponent {
  @ViewChildren(GSortableDirective)
  columns!: QueryList<GSortableDirective>;
  @ViewChild(GTablePagerComponent) pager!: GTablePagerComponent;
  @ViewChild(GTablePageInfoComponent) pageInfo!: GTablePageInfoComponent;

  constructor() {}
  protected setSorting(event: IColumnSorting, request: ITableRequest) {
    if (event?.multi) {
      const index = request.columnsSorting.findIndex(
        (item) => item.column === event.column
      );

      if (index === -1 && event.direction) {
        request.columnsSorting.push({
          column: event.column,
          direction: event.direction,
        });
      } else if (event.direction) {
        request.columnsSorting[index].direction = event.direction;
      } else if (index !== -1) {
        request.columnsSorting.splice(index, 1);
      }
    } else if (event.direction) {
      //this.resetDirections(this.columns, event);
      request.columnsSorting = [
        { column: event.column, direction: event.direction },
      ];
    } else {
      //this.resetDirections(this.columns, event);
      request.columnsSorting = [];
    }
  }

  protected setPager(request: ITableRequest, count: number) {
    this.pager.pageIndex = request.pageIndex;
    this.pager.pageSize = request.pageSize;
    this.pager.count = count;
  }
  protected setPageInfo<TRow>(
    request: ITableRequest,
    response: ITableResponse<TRow>
  ) {
    this.pageInfo.pageIndex = request.pageIndex;
    this.pageInfo.pageSize = request.pageSize;
    this.pageInfo.filteredCount = response.filteredCount;
    this.pageInfo.totalCount = response.totalCount;
  }
}
