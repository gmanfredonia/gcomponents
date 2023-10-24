import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GValidationMessages } from 'gcomponents';

@Injectable({
  providedIn: 'root',
})
export class GValidationMessagesService extends GValidationMessages {
  constructor(private translateService: TranslateService) {
    super();
  }

  override getMessage(key: string, parms?: any): string {
    return  this.translateService.instant(`messages.${key}`, parms);    
  }
}
