import { NgModule } from '@angular/core';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';
import { RadioBoxComponent } from './components/radio-box/radio-box.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimePickerComponent } from './components/time-picker/time-picker.component';

@NgModule({
  declarations: [
    CheckBoxComponent,
    DatePickerComponent,
    DropdownComponent,
    InputComponent,
    RadioBoxComponent,
    TextAreaComponent,
    TimePickerComponent,
    ValidationMessageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  exports: [
    CheckBoxComponent,
    DatePickerComponent,
    DropdownComponent,
    InputComponent,
    RadioBoxComponent,
    TextAreaComponent,
    TimePickerComponent,
    ValidationMessageComponent
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class GComponentsModule { }
