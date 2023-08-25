import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class DateParserFormatterService extends NgbDateParserFormatter {
  constructor(private translateService: TranslateService) {
    super();
  }

  parse(value: string): NgbDateStruct | null {
    let result: NgbDateStruct | null = null;

    if (value) {
      const date = value.split(this.DELIMITER);

      switch (this.translateService.currentLang) {
        case 'it-IT':
        case 'it':
          result = {
            day: parseInt(date[0]),
            month: parseInt(date[1]),
            year: parseInt(date[2]),
          }
          break;
        default:
          result = {
            day: parseInt(date[1]),
            month: parseInt(date[0]),
            year: parseInt(date[2]),
          }
          break;
      }
    }

    return result;
  }
  format(date: NgbDateStruct | null): string {
    let result: string = '';

    if (date)
      switch (this.translateService.currentLang) {
        case 'it-IT':
        case 'it':
          result = this.addLeadingZero(date.day) + this.DELIMITER + this.addLeadingZero(date.month) + this.DELIMITER + date.year;
          break;
        default:
          result = this.addLeadingZero(date.month) + this.DELIMITER + this.addLeadingZero(date.day) + this.DELIMITER + date.year;
          break;
      }

    return result;
  }

  private addLeadingZero(value: number): string {
    return value.toString().padStart(2, '0');
    //return value < 10 ? `0${value}` : `${value}`;
  }

  private readonly DELIMITER = '/';
}
