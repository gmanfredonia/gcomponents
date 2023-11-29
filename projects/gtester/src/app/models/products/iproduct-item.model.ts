import { IKeyValuePair } from "projects/gtester/src/app/models/ikey-value-pair.model";


export interface IProductItem extends IKeyValuePair<number> {  
  enabled: boolean;
}
