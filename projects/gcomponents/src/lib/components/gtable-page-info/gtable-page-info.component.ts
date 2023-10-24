import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITablePageData } from '../../models/gtable/itable-page-data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'gtable-page-info',
  templateUrl: './gtable-page-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTablePageInfoComponent {
  @Input() pageData?: ITablePageData | null;

  get totalPages(): number {
    return this.pageData
      ? Math.ceil(this.pageData.filteredCount / this.pageData.pageSize)
      : 0;
  }
}
