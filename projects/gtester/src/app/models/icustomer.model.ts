import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { IName } from "./ilanguage.model";

export interface ICustomer {
  id: string;
  name: string;
  password: string;
  eMail: string;
  decimal: number;
  annotations: string;
  checkbox: boolean;
  radiobox: string;
  languageDDL: any;
  date: NgbDateStruct;
}
