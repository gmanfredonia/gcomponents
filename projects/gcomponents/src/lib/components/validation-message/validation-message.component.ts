import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { ValidationMessages } from '../../services/validation-messages';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent {
  //Input
  @Input()
  control?: NgControl;

  //Private properties
  //[...]

  //ViewChild
  //[...]

  //Lifecycle events
  //[...]

  //Constructor
  constructor(
    private messagesService: ValidationMessages,
    public controlContainer: FormGroupDirective
  ) {}

  //Public properties
  //[...]

  //Output
  //[...]

  //Methods
  public getErrors(): string[] {
    let result: string[];    
    const errors = Object.entries(this.control!.errors!);
    
    result = [];
    errors.forEach((error) =>
      result.push(this.messagesService.getMessage(error[0], error[1]))
    );

    return result;
  }

  //Interfaces
  //[...]
}
