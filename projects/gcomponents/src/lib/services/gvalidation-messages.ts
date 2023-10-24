import { Injectable } from '@angular/core';

export function G_VALIDATION_MESSAGES_FACTORY() {
  return new GValidationMessagesBase();
}

@Injectable({ providedIn: 'root', useFactory: G_VALIDATION_MESSAGES_FACTORY })
export abstract class GValidationMessages {
  abstract getMessage(key: string, parms?: any): string;
}

@Injectable()
export class GValidationMessagesBase extends GValidationMessages {
  override getMessage(key: string, parms?: any): string {    
    return 'Message not codified!';
  }
}
