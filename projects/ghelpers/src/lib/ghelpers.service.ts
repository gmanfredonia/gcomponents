import { Injectable } from '@angular/core';
import { IUniqueId } from './models/iunique-id.model';

@Injectable({
  providedIn: 'root',
})
export class GHelpersService {
  constructor() {
    this.names = [];
  }

  private names: IUniqueId[];

  public getUniqueId = (name: string): string => {
    let index = this.names.findIndex((v) => v.name === name);
    if (index === -1) {
      this.names.push({ name: name, id: 0 });
      index = this.names.length - 1;
    }

    return `${name}${++this.names[index].id}`;
  };
  public getUniqueIds = (name: string, count: number): string[] => {
    const result: string[] = [];

    for (let i = 0; i < count; ++i) 
      result.push(this.getUniqueId(name));    

    return result;
  };

  public isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  public padNumber(value: number, length: number) {
    if (this.isNumber(value)) return `0${value}`.slice(-length);
    else return '';
  }
  public toInteger(value: any): number {
    if (this.isNumber(value)) return parseFloat(value);
    return 0;
  }
  public findAncestor = (element: HTMLElement, tagName: string) => {
    let el: HTMLElement | null = element;
    while ((el = el.parentElement) && el.tagName.toLowerCase() !== tagName);
    return el;
  };
  /*
  function findAncestor(el, cls) {
  while ((el = el.parentNode) && el.className.indexOf(cls) < 0);
  return el;
} */
}
