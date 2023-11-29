import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import {
  GComponentsModule,
  GDropdownI18n,  
  GValidationMessages,
} from 'gcomponents';
import { DatepickerI18nService } from './services/datepicker-i18n.service';
import { DateParserFormatterService } from './services/date-parser-formatter.service';
import { InfoComponent } from './components/info/info.component';
import { GDropdownI18nService } from './services/gdropdown-i18n.service';
import { GValidationMessagesService } from './services/gvalidation-messages.service';
import { TableProductsComponent } from './components/table-products/table-products.component';
import { WithLoadingPipe } from './pipes/with-loading.pipe';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, InfoComponent, TableProductsComponent, WithLoadingPipe, ModalProductComponent, ModalConfirmComponent],
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
    { provide: GValidationMessages, useClass: GValidationMessagesService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
