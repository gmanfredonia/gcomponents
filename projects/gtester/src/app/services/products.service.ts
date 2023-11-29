import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { ITableProductsFilter } from '../models/products/itable-products-filter.model';
import { IProductRow } from '../models/products/iproduct-row.model';
import { ITableRequestFiltering, ITableResponse } from 'gcomponents';
import { ICategoryItem } from '../models/products/icategory-item.model';
import { IProduct } from '../models/products/iproduct.model';
import { IProductItem } from '../models/products/iproduct-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {
    this.dataTableProducts$ = this.subjectTableProducts.asObservable().pipe(
      switchMap((params) => {
        return this.httpClient.post<ITableResponse<IProductRow>>(
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
        return this.httpClient.get<ICategoryItem[]>(
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
    this.dataProduct$ = this.subjectProduct.asObservable().pipe(
      switchMap((key) => {
        return this.httpClient.get<IProduct>(
          `https://localhost:7133/api/products/${key}`,
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
  private subjectProduct = new BehaviorSubject<number | undefined>(undefined);

  dataTableProducts$!: Observable<ITableResponse<IProductRow>>;
  dataCategories$!: Observable<ICategoryItem[]>;
  dataProduct$!: Observable<IProduct>;

  getTableProducts(request: ITableRequestFiltering<ITableProductsFilter>) {
    this.subjectTableProducts.next(request);
  }
  getCategories(key?: number) {
    this.subjectCategories.next(key);
  }
  getProduct(key: number) {
    this.subjectProduct.next(key);
  }
  searchProducts(term: string): Observable<IProductItem[]> {    
    if (term === '') {
      return of([]);
    }

    return this.httpClient
      .get<[any, string[]]>(
        `https://localhost:7133/api/products/search/${term}`
      )
      .pipe(
        map((response) => {                  
          return response;
        })
      );
  }

  writeProduct(product: IProduct): Observable<number> {
    if (product.id === 0)
      return this.httpClient.post<number>(
        'https://localhost:7133/api/products',
        product,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
          },
        }
      );
    else
      return this.httpClient.put<number>(
        'https://localhost:7133/api/products',
        product,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
          },
        }
      );
  }

  removeProduct(key: number): Observable<number> {
    return this.httpClient.delete<number>(
      `https://localhost:7133/api/products/${key}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtYW5mcmVkb25pYUBpbndpbmQuaXQiLCJ1bmlxdWVfbmFtZSI6InN0cmluZyIsImp0aSI6IjU2ZGY2MmZhLTNlZTMtNDkxZS04YWFiLTI3MTliNWJkZWNjNCIsIm5iZiI6MTY5NTYzNjkzOSwiZXhwIjoxNjk1NjM3MjM5LCJpYXQiOjE2OTU2MzY5MzksImlzcyI6Imh0dHBzOi8vd3d3LmF1LmNvbS8iLCJhdWQiOiJodHRwczovL3d3dy5hdS5jb20vIn0.QGsez_Ao83QhWon0QVPwZsbG4iNqQpQhdLKHgzfiSYNJnslNgqgWOd5imxs6ifF6Cc6eRUgo8wXxj-b29GM9ew',
        },
      }
    );
  }
}
