import { IKeyValuePair } from "projects/gtester/src/app/models/ikey-value-pair.model";



export interface ICategoryItem extends IKeyValuePair<number> {  
  enabled: boolean;
}
