import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'gdropdown-tools',
  templateUrl: './gdropdown-tools.component.html',
  styleUrls: ['./gdropdown-tools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class GDropdownToolsComponent {
  @Input() imageClass: string;

  constructor() {
    this.imageClass = '';    
  }


}
