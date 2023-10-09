import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {
  GComponentsModule,
  GDropdownI18n,
  TableDirective,
  ValidationMessages,
} from 'gcomponents';
import { DatepickerI18nService } from './services/datepicker-i18n.service';
import { DateParserFormatterService } from './services/date-parser-formatter.service';
import { InfoComponent } from './components/info/info.component';
import { GDropdownI18nService } from './services/gdropdown-i18n.service';
import { ValidationMessagesService } from './services/validation-messages.service';
import { GridBaseComponent } from './components/grid-base/grid-base.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, InfoComponent, GridBaseComponent],
  imports: [
    BrowserModule,
    GComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: GDropdownI18n, useClass: GDropdownI18nService },
    { provide: NgbDatepickerI18n, useClass: DatepickerI18nService },
    { provide: NgbDateParserFormatter, useClass: DateParserFormatterService },
    { provide: ValidationMessages, useClass: ValidationMessagesService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
