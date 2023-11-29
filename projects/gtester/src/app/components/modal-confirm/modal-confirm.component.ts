import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IModalResult } from '../../models/imodal-result.model';

@Component({
  selector: 'modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  @ViewChild('content') content!: TemplateRef<any>;
  modalRef!: NgbModalRef;

  @Output() close: EventEmitter<IModalResult>;

  constructor(private modalService: NgbModal) {
    this.close = new EventEmitter<IModalResult>();
  }
  open(source?: string) {    
    this.modalRef = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',  centered: true, backdrop: 'static'
    });

    this.modalRef.result.then(
      (result) => {
        this.close.emit({source: source, result: true});
      },
      (reason) => {
        this.close.emit({source: source, result: false});
      }
    );
  }
}
