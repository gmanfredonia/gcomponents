import { ITableRequest } from "./itable-request.model";

export interface ITableRequestFiltering<TFiltering> extends ITableRequest  {
    filtering: TFiltering;
  }