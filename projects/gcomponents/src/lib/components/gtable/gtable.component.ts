import { Component, ViewChild } from '@angular/core';
import { IColumnSorting } from '../../models/gtable/icolumn-sorting.model';
import { ITableRequest } from '../../models/gtable/itable-request.model';
import { ITableResponse } from '../../models/gtable/itable-response.model';
import { ITablePageData } from '../../models/gtable/itable-page-data.model';
import { Observable, map, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'gtable',
  template: '',
})
export class GTableComponent {
  /* @ViewChild(GTablePagerComponent) pager!: GTablePagerComponent;
  @ViewChild(GTablePageInfoComponent) pageInfo!: GTablePageInfoComponent; */

  protected pageData$?: Observable<ITablePageData>;

  protected setPageData<TRow>(
    request: ITableRequest,
    response$: Observable<ITableResponse<TRow>>
  ) {
    this.pageData$ = response$.pipe(
      map((item) => {
        return {
          pageIndex: request.pageIndex,
          pageSize: request.pageSize,
          filteredCount: item.filteredCount,
          totalCount: item.totalCount,
        };
      })
    );
  }

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
}
