import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DatepickerI18nService extends NgbDatepickerI18n {
  constructor(private translateService: TranslateService) {
    super();
  }

  getWeekdayLabel(weekday: number): string {
    return this.translateService.instant(`weekday.${weekday}`);
  }

  getWeekdayShortName(weekday: number): string {
    return this.translateService.instant(`weekday.${weekday}`);
  }

  getMonthShortName(month: number): string {
    return this.translateService.instant(`month.${month}`);
  }

  getMonthFullName(month: number): string {
    return this.translateService.instant(`month.${month}`);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
