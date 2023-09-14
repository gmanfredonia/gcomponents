import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ValidationMessages } from 'gcomponents';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessagesService extends ValidationMessages {
  constructor(private translateService: TranslateService) {
    super();
  }

  override getMessage(key: string, parms?: any): string {
    return  this.translateService.instant(`messages.${key}`, parms);    
  }
}
