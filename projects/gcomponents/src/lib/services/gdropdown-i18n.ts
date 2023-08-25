import { Injectable } from '@angular/core';

export function G_DROPDOWN_I18N_FACTORY() {
  return new GDropdownI18nDefault();
}

@Injectable({ providedIn: 'root', useFactory: G_DROPDOWN_I18N_FACTORY })
export abstract class GDropdownI18n {
  abstract getLabelNoItemsFound(): string;
  abstract getLabelNoResultsFiltered(): string;  
  abstract getStatusLabelCount(): string;
  abstract getStatusLabelFiltered(): string;
  abstract getStatusLabelSelected(): string;
  abstract getStatusLabelJumpToFirst(): string;
  abstract getStatusLabelSelectAll(): string;
  abstract getStatusLabelDeselectAll(): string;
  abstract getStatusLabelCancel(): string;
}

@Injectable()
export class GDropdownI18nDefault extends GDropdownI18n {
  getLabelNoItemsFound(): string {
    return 'No items found';
  }
  getLabelNoResultsFiltered(): string {
    return 'No results filtered';
  }  
  getStatusLabelCount(): string {
    return 'Count';
  }
  getStatusLabelFiltered(): string {
    return 'Filtered';
  }
  getStatusLabelSelected(): string {
    return 'Selected';
  }
  getStatusLabelJumpToFirst(): string {
    return 'Jump to first';
  }
  getStatusLabelSelectAll(): string {
    return 'Select all';
  }
  getStatusLabelDeselectAll(): string {
    return 'Deselect all';
  }
  getStatusLabelCancel(): string {
    return 'Cancel selection';
  }
}
