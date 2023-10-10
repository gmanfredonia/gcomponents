import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  GTableComponent,
  IColumnSorting,
  ITablePageData,
  ITableRequestFiltering,
  ITableResponse,
} from 'gcomponents';
import { IProduct } from '../../models/products/iproduct.model';
import { ITableProductsFilter } from '../../models/products/itable-products-filter.model';
import { ProductsService } from '../../services/products.service';
import { Observable, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-grid-base',
  templateUrl: './grid-base.component.html',
  styleUrls: ['./grid-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBaseComponent
  extends GTableComponent
  implements OnInit, AfterViewInit
{
  request: ITableRequestFiltering<ITableProductsFilter> = {
    pageIndex: 1,
    pageSize: 10,
    filtering: { filter: undefined },
    columnsSorting: [{ column: 'id', direction: 'asc' }],
  };
  
  response$: Observable<ITableResponse<IProduct>>;
  pageData$: Observable<ITablePageData>;

  constructor(
    private productsService: ProductsService    
  ) {
    super();
    this.response$ = this.productsService.filteredProducts$;
    this.pageData$ = this.response$.pipe(
      map((item) => {
        return {
          pageIndex: this.request.pageIndex,
          pageSize: this.request.pageSize,
          filteredCount: item.filteredCount,
          totalCount: item.totalCount,
        };
      })
    );

  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.setData();
  }

  onChangeSorting(event: IColumnSorting) {
    this.setSorting(event, this.request);
    this.setData();
  }

  onChangePage(event: number) {
    this.request.pageIndex = event;
    this.setData();
  }

  onChangePageSize(event: number) {
    this.request.pageSize = event;
    this.setData();
  }
  
  private setData() {
    this.productsService.getFilteredProducts2(this.request);
  }
}
