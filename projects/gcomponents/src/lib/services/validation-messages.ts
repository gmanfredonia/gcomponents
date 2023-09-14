import { Injectable } from '@angular/core';

export function G_VALIDATION_MESSAGES_FACTORY() {
  return new ValidationMessagesBase();
}

@Injectable({ providedIn: 'root', useFactory: G_VALIDATION_MESSAGES_FACTORY })
export abstract class ValidationMessages {
  abstract getMessage(key: string, parms?: any): string;
}

@Injectable()
export class ValidationMessagesBase extends ValidationMessages {
  override getMessage(key: string, parms?: any): string {    
    return 'Message not codified!';
  }
}
