import { NgModule } from '@angular/core';
import { GCheckBoxComponent } from './components/gcheck-box/gcheck-box.component';
import { GDatePickerComponent } from './components/gdate-picker/gdate-picker.component';
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
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { GTimePickerComponent } from './components/gtime-picker/gtime-picker.component';
import { GTablePageInfoComponent } from './components/gtable-page-info/gtable-page-info.component';
import { GTablePageSizeComponent } from './components/gtable-page-size/gtable-page-size.component';
import { GTablePagerComponent } from './components/gtable-pager/gtable-pager.component';
import { GTableComponent } from './components/gtable/gtable.component';
import { GDropdownToolsComponent } from './components/gdropdown-tools/gdropdown-tools.component';
import { GSpinnerComponent } from './components/gspinner/gspinner.component';

import { TableDirective } from './directives/table.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { GTypeAHeadComponent } from './components/gtype-ahead/gtype-ahead.component';
import { GUploadComponent } from './components/gupload/gupload.component';

@NgModule({
  declarations: [
    GCheckBoxComponent,
    GDatePickerComponent,
    GDropdownComponent,
    GInputComponent,
    GRadioBoxComponent,
    GTextAreaComponent,
    GTimePickerComponent,
    GValidationMessageComponent,
    GTablePageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GDropdownToolsComponent,
    GSpinnerComponent,
    AutoFocusDirective,
    GTypeAHeadComponent,
    GUploadComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
  ],
  exports: [
    GCheckBoxComponent,
    GDatePickerComponent,
    GDropdownComponent,
    GInputComponent,
    GRadioBoxComponent,
    GTextAreaComponent,
    GTimePickerComponent,
    GValidationMessageComponent,
    GTablePageSizeComponent,
    GTablePagerComponent,
    GTableComponent,
    GTablePageInfoComponent,
    TableDirective,
    GDropdownToolsComponent,
    GSpinnerComponent,
    AutoFocusDirective,
    GTypeAHeadComponent,
    GUploadComponent,
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class GComponentsModule {}
