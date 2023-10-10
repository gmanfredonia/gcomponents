import { Component, ViewChild } from '@angular/core';
import { GTablePagerComponent } from '../gtable-pager/gtable-pager.component';
import { IColumnSorting } from '../../models/gtable/icolumn-sorting.model';
import { ITableRequest } from '../../models/gtable/itable-request.model';
import { GTablePageInfoComponent } from '../gtable-page-info/gtable-page-info.component';
import { ITableResponse } from '../../models/gtable/itable-response.model';
import { ITablePageData } from '../../models/gtable/itable-page-data.model';
import { Observable, map, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'gtable',
  template: '',
})
export class GTableComponent {
  @ViewChild(GTablePagerComponent) pager!: GTablePagerComponent;
  @ViewChild(GTablePageInfoComponent) pageInfo!: GTablePageInfoComponent;

  protected pageData!: ITablePageData;

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
  protected getPageData<TRow>(
    request: ITableRequest,
    response: ITableResponse<TRow>
  ): ITablePageData {
    return {
      pageIndex: request.pageIndex,
      pageSize: request.pageSize,
      filteredCount: response?.filteredCount ?? 0,
      totalCount: response?.totalCount ?? 0,
    };
  }
  protected getPageData2<TRow>(
    request: ITableRequest,
    response$: Observable<ITableResponse<TRow>>
  ) {
    response$.subscribe((item) => {
      this.pageData = {
        pageIndex: request.pageIndex,
        pageSize: request.pageSize,
        filteredCount: item.filteredCount,
        totalCount: item.totalCount,
      };
    });

    //this.changeDetectorRef.markForCheck();
  }
  /* getPageData2<TRow>(
    request: ITableRequest,
    response$: Observable<ITableResponse<TRow>>
  ) {
    debugger
    response$
      .pipe(
        //takeWhile(item => !!item),
        map((item) => {
          return {
            pageIndex: request.pageIndex,
            pageSize: request.pageSize,
            filteredCount: item.filteredCount,
            totalCount: item.totalCount,
          };
        })
      )
      .subscribe((item) => {
        debugger
        this.pager.pageData = this.pageInfo.pageData = {
          pageIndex: request.pageIndex,
          pageSize: request.pageSize,
          filteredCount: item.filteredCount,
          totalCount: item.totalCount,
        };
        

      });
  } */
}
