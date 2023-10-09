import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  GTableComponent,
  IColumnSorting,
  ITableRequestFiltering,
  ITableResponse,
} from 'gcomponents';
import { IProduct } from '../../models/products/iproduct.model';
import { ITableProductsFilter } from '../../models/products/itable-products-filter.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-grid-base',
  templateUrl: './grid-base.component.html',
  styleUrls: ['./grid-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBaseComponent extends GTableComponent implements OnInit {
  request: ITableRequestFiltering<ITableProductsFilter> = {
    pageIndex: 1,
    pageSize: 10,
    filtering: { filter: undefined },
    columnsSorting: [{ column: 'id', direction: 'asc' }],
  };
  response?: ITableResponse<IProduct>;

  constructor(private productsService: ProductsService) {
    super();        
  }

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
    this.productsService.getFilteredProducts(this.request).subscribe((data) => {
      debugger
      this.response = data;
      this.setPager(this.request, this.response);
      this.setPageInfo(this.request, this.response);
    });
  }
}
