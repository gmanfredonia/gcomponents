import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  map,
  share,
  switchMap,
} from 'rxjs';
import { ITableProductsFilter } from '../models/products/itable-products-filter.model';
import { IProduct } from '../models/products/iproduct.model';
import { ITableRequestFiltering, ITableResponse } from 'gcomponents';
import { ICategory } from '../models/products/icategory.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {
    this.dataTableProducts$ = this.subjectTableProducts.asObservable().pipe(
      switchMap((params) => {
        return this.httpClient.post<ITableResponse<IProduct>>(
          'https://localhost:7133/api/products/table/filtering',
          params,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
            },
          }
        );
      })
    );
    this.dataCategories$ = this.subjectCategories.asObservable().pipe(
      switchMap((key) => {
        return this.httpClient.get<ICategory[]>(
          `https://localhost:7133/api/products/categories/enabled/${key ?? ''}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
            },
          }
        );
      })
    );
  }

  private subjectTableProducts = new BehaviorSubject<
    ITableRequestFiltering<ITableProductsFilter> | undefined
  >(undefined);
  private subjectCategories = new BehaviorSubject<number | undefined>(
    undefined
  );

  dataTableProducts$!: Observable<ITableResponse<IProduct>>;
  dataCategories$!: Observable<ICategory[]>;

  getTableProducts(request: ITableRequestFiltering<ITableProductsFilter>) {
    this.subjectTableProducts.next(request);
  }
  getCategories(key?: number) {
    this.subjectCategories.next(key);
  }
}
