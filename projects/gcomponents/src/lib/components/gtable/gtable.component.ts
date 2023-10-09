import { Component, ViewChild } from '@angular/core';
import { GTablePagerComponent } from '../gtable-pager/gtable-pager.component';
import { IColumnSorting } from '../../models/gtable/icolumn-sorting.model';
import { ITableRequest } from '../../models/gtable/itable-request.model';
import { GTablePageInfoComponent } from '../gtable-page-info/gtable-page-info.component';
import { ITableResponse } from '../../models/gtable/itable-response.model';

@Component({
  selector: 'gtable',
  template: '',
})
export class GTableComponent {
  @ViewChild(GTablePagerComponent) pager!: GTablePagerComponent;
  @ViewChild(GTablePageInfoComponent) pageInfo!: GTablePageInfoComponent;
  
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
      request.columnsSorting = [
        { column: event.column, direction: event.direction },
      ];
    } else {
      request.columnsSorting = [];
    }
  }

  protected setPager<TRow>(
    request: ITableRequest,
    response?: ITableResponse<TRow>
  ) {    
    this.pager.pageIndex = request.pageIndex;
    this.pager.pageSize = request.pageSize;
    this.pager.count = response?.filteredCount ?? 0;    
    this.pager.refreshPager();
  }
  protected setPageInfo<TRow>(
    request: ITableRequest,
    response?: ITableResponse<TRow>
  ) {
    this.pageInfo.pageIndex = request.pageIndex;
    this.pageInfo.pageSize = request.pageSize;
    this.pageInfo.filteredCount = response?.filteredCount ?? 0; 
    this.pageInfo.totalCount = response?.totalCount ?? 0;
  }
}
