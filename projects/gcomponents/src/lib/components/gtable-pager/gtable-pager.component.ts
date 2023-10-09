import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
//import { ITableRequestPage } from 'src/app/models/gtable/itable-request-page.model';

@Component({
  selector: 'gtable-pager',
  templateUrl: './gtable-pager.component.html',
  styleUrls: ['./gtable-pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTablePagerComponent {
  /* @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() count: number; */

  @Input()
  public get pageIndex(): number {
    return this._pageIndex;
  }
  public set pageIndex(v: number) {
    this._pageIndex = v;
    //this.pageChange.emit(this._pageIndex);
    //this.calculatePage();
    this.changeDetectorRef.markForCheck();
  }
  @Input()
  public get pageSize(): number {
    return this._pageSize;
  }
  public set pageSize(v: number) {
    this._pageSize = v;
    //this.calculatePage();
    this.changeDetectorRef.markForCheck();
  }
  @Input()
  public get count(): number {
    return this._count;
  }
  public set count(v: number) {
    this._count = v;
    //this.calculatePage();
    this.changeDetectorRef.markForCheck();
  }

  @Output() pageChange: EventEmitter<number>;

  private _pageIndex: number;
  private _pageSize: number;
  private _count: number ;

  onChangePage(event: number) {
    this.pageChange.emit(this._pageIndex);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this._pageIndex = 1;
    this._pageSize = 10;
    this._count = 0;

    this.pageChange = new EventEmitter<number>();
  }
}
