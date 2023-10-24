import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  constructor() {}
}
