import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITableProductsFilter } from '../models/products/itable-products-filter.model';
import { IProduct } from '../models/products/iproduct.model';
import { ITableRequestFiltering, ITableResponse } from 'gcomponents';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      'https://localhost:7133/api/Products/all',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
        },
      }
    );
  }

  getFilteredProducts(
    request: ITableRequestFiltering<ITableProductsFilter>
  ): Observable<ITableResponse<IProduct>> {
    return this.httpClient.post<ITableResponse<IProduct>>(
      'https://localhost:7133/api/Products/table/filtering',
      request,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
        },
      }
    );
  }
}
