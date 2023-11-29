import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import { Observable, map, of, share, shareReplay, take } from 'rxjs';
import { IDropdownItem } from 'gcomponents';
import { IModalResult } from '../../models/imodal-result.model';

@Component({
  selector: 'modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalProductComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;
  dataCategories!: IDropdownItem[];
  modalRef!: NgbModalRef;
  @Output() close: EventEmitter<IModalResult>;

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    fb: FormBuilder,
    private modalService: NgbModal,
    private productsService: ProductsService
  ) {
    this.productsService.dataCategories$
      .pipe(
        take(1),
        map((rows) =>
          rows.map((row) => {
            return {
              id: row.key.toString(),
              name: row.description,
              enabled: true,
            };
          })
        )
      )
      .subscribe((rows) => {
        this.dataCategories = rows;
      });

    this.form = fb.group({
      id: [0],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      height: [null],
      width: [null],
      depth: [null],
      price: [null, [Validators.required]],
      useType: ['', [Validators.required]],
      enabled: [false, [Validators.required]],
      validFrom: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });

    this.close = new EventEmitter<IModalResult>();
  }
  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  open(key?: number) {
    debugger;

    if (key) {
      this.productsService.getProduct(key);
      this.productsService.dataProduct$
        .pipe(take(1))
        .subscribe((value) => this.form.setValue(value));
    } else
      this.form.reset({
        id: 0,
        name: '',
        description: '',
        height: null,
        width: null,
        depth: null,
        price: 0,
        useType: '',
        enabled: false,
        validFrom: null,
        categoryId: null,
      });

    this.modalRef = this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
    });

    this.modalRef.result.then(
      (result) => {
        this.close.emit({ result: true });
      },
      (reason) => {
        this.close.emit({ result: false });
      }
    );
  }

  onSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      debugger;
      const id = this.form.get('id')?.value;
      this.productsService
        .writeProduct(this.form.value)
        .pipe(take(1))
        .subscribe((value) => {
          this.modalRef.close(value);
        });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
