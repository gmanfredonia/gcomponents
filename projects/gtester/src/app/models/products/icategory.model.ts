import { IKeyValuePair } from "../ikey-value-pair.model";

export interface ICategory extends IKeyValuePair<number> {  
  enabled: boolean;
}
