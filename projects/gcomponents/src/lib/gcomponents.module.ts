import { NgModule } from '@angular/core';
import { GCheckBoxComponent } from './components/gcheck-box/gcheck-box.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { GDropdownComponent } from './components/gdropdown/gdropdown.component';
import { GInputComponent } from './components/ginput/ginput.component';
import { GRadioBoxComponent } from './components/gradio-box/gradio-box.component';
import { GTextAreaComponent } from './components/gtext-area/gtext-area.component';
import { GValidationMessageComponent } from './components/gvalidation-messages/gvalidation-messages.component';
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
import { GTablePageInfoComponent } from './components/gtable-page-info/gtable-page-info.component';
import { GTablePageSizeComponent } from './components/gtable-page-size/gtable-page-size.component';
import { GTablePagerComponent } from './components/gtable-pager/gtable-pager.component';
import { GTableComponent } from './components/gtable/gtable.component';
import { GDropdownToolsComponent } from './components/gdropdown-tools/gdropdown-tools.component';
import { GSpinnerComponent } from './components/gspinner/gspinner.component';

@NgModule({
  declarations: [
    GCheckBoxComponent,
    DatePickerComponent,
    GDropdownComponent,
    GInputComponent,
    GRadioBoxComponent,
    GTextAreaComponent,
    TimePickerComponent,
    GValidationMessageComponent,
    GTablePageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GDropdownToolsComponent,
    GSpinnerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [
    GCheckBoxComponent,
    DatePickerComponent,
    GDropdownComponent,
    GInputComponent,
    GRadioBoxComponent,
    GTextAreaComponent,
    TimePickerComponent,
    GValidationMessageComponent,
    GTablePageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GDropdownToolsComponent,
    GSpinnerComponent,
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class GComponentsModule {}
