import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'gtable-pager',
  templateUrl: './gtable-pager.component.html',
  styleUrls: ['./gtable-pager.component.scss'],
})
export class GTablePagerComponent {
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() count: number;

  /*  @Input()
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
  } */

  @Output() pageChange: EventEmitter<number>;

  /* private _pageIndex: number;
  private _pageSize: number;
  private _count: number ; */

  refreshPager() {
    this.changeDetectorRef.markForCheck();
  }

  onChangePage(event: number) {
    this.pageChange.emit(this.pageIndex);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.count = 0;

    this.pageChange = new EventEmitter<number>();
  }
}
