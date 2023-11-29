import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  GTableComponent,
  IColumnSorting,
  ITableRequestFiltering,
  ITableResponse,
} from 'gcomponents';
import { IProductRow } from '../../models/products/iproduct-row.model';
import { ITableProductsFilter } from '../../models/products/itable-products-filter.model';
import { ProductsService } from '../../services/products.service';
import { Observable, share } from 'rxjs';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { IModalResult } from '../../models/imodal-result.model';

@Component({
  selector: 'table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableProductsComponent extends GTableComponent implements OnInit {
  request: ITableRequestFiltering<ITableProductsFilter> = {
    pageIndex: 1,
    pageSize: 10,
    filtering: { filter: undefined },
    columnsSorting: [{ column: 'id', direction: 'asc' }],
  };
  data$: Observable<ITableResponse<IProductRow>>;
  @ViewChild(ModalProductComponent) modalComponent!: ModalProductComponent;
  @ViewChild(ModalConfirmComponent) modalConfirm!: ModalConfirmComponent;

  constructor(private productsService: ProductsService) {
    super();
    this.data$ = this.productsService.dataTableProducts$.pipe(share());
    this.setPageData(this.request, this.data$);
    // this.modalConfirm.close = new EventEmitter()
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

  onModalClose(event: IModalResult) {
    debugger
    this.setData();
  }

  private setData() {
    this.productsService.getTableProducts(this.request);
  }
}
