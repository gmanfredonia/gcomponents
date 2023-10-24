import { Pipe, PipeTransform } from '@angular/core';
import { Observable, catchError, isObservable, map, of, startWith } from 'rxjs';

@Pipe({
  name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
  transform(item: Observable<any>) : Observable<any> {
    return isObservable(item)
      ? item.pipe(          
          map((value: any) => ({
            loading: value.type === 'start',
            value: value.type ? value.value : value
          })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : item;
  }
}
