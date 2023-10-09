export type SortDirection = 'asc' | 'desc' | '';

export interface IColumnSorting {
  column: string;
  multi?: boolean;  
  direction: SortDirection;  
}
