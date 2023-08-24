import { AfterViewInit, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit, AfterViewInit {
  @Input('formControlValue')
  formControl?: FormControl;

  formGroup?: FormGroup;

  constructor(@Optional() public controlContainer: ControlContainer) {
    this.formGroup = this.controlContainer.control as FormGroup;
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void { }
}
