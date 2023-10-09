import { IColumnSorting } from './icolumn-sorting.model';
import { ITableRequestPage } from './itable-request-page.model';

export interface ITableRequest extends ITableRequestPage {
  columnsSorting: IColumnSorting[];
}
