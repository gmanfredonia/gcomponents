import { NgModule } from '@angular/core';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';
import { RadioBoxComponent } from './components/radio-box/radio-box.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { TableDirective } from './directives/table.directive';
import { GSortableDirective } from './directives/gtable/gsortable.directive';
import { GTablePageInfoComponent } from './components/gtable-page-info/gtable-page-info.component';
import { GPageSizeComponent } from './components/gpage-size/gpage-size.component';
import { GTablePagerComponent } from './components/gtable-pager/gtable-pager.component';
import { GTableComponent } from './components/gtable/gtable.component';

@NgModule({
  declarations: [
    CheckBoxComponent,
    DatePickerComponent,
    DropdownComponent,
    InputComponent,
    RadioBoxComponent,
    TextAreaComponent,
    TimePickerComponent,
    ValidationMessageComponent,
    GPageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GSortableDirective,
    
  ],
  imports: [FormsModule, BrowserModule, NgbModule, NgbPaginationModule, ReactiveFormsModule],
  exports: [
    CheckBoxComponent,
    DatePickerComponent,
    DropdownComponent,
    InputComponent,
    RadioBoxComponent,
    TextAreaComponent,
    TimePickerComponent,
    ValidationMessageComponent,
    GPageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GSortableDirective
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class GComponentsModule {}
