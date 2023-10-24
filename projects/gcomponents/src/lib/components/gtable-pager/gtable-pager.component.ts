import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ITablePageData as ITablePageData } from '../../models/gtable/itable-page-data.model';

@Component({
  selector: 'gtable-pager',
  templateUrl: './gtable-pager.component.html',
  styleUrls: ['./gtable-pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTablePagerComponent implements OnInit {
  @Input() pageData?: ITablePageData | null;  
  @Output() pageChange: EventEmitter<number>;

  onChangePage(event: number) {
    this.pageChange.emit(event);
  }

  constructor() {
    this.pageChange = new EventEmitter<number>();    
  }

  ngOnInit(): void {}
}
