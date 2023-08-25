import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GDropdownI18n } from 'gcomponents';

@Injectable()
export class GDropdownI18nService extends GDropdownI18n {
  constructor(private translateService: TranslateService) {
    super();
  }

  override getLabelNoItemsFound(): string {
    return this.translateService.instant('gdropdown.labelNoItemsFound');
  }
  override getLabelNoResultsFiltered(): string {
    return this.translateService.instant('gdropdown.labelNoResultsFiltered');
  }  
  override getStatusLabelCount(): string {
    return this.translateService.instant('gdropdown.status.labelCount');
  }
  override getStatusLabelFiltered(): string {
    return this.translateService.instant('gdropdown.status.labelFiltered');
  }
  override getStatusLabelSelected(): string {
    return this.translateService.instant('gdropdown.status.labelSelected');
  }
  override getStatusLabelJumpToFirst(): string {
    return this.translateService.instant('gdropdown.status.labelJumpToFirst');
  }
  override getStatusLabelSelectAll(): string {
    return this.translateService.instant('gdropdown.status.labelSelectAll');
  }
  override getStatusLabelDeselectAll(): string {
    return this.translateService.instant('gdropdown.status.labelDeselectAll');
  }
  override getStatusLabelCancel(): string {
    return this.translateService.instant('gdropdown.status.labelCancel');
  }
}
