export interface ITableResponse<TRow> {
    rows: TRow[];    
    filteredCount: number;
    totalCount: number;
}