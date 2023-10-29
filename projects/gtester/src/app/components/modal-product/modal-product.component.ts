import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../../services/products.service';
import { Observable, map, share, tap } from 'rxjs';
import { ICategory } from '../../models/products/icategory.model';
import { IDropdownItem } from 'gcomponents';

@Component({
  selector: 'modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalProductComponent implements AfterViewInit {
  closeResult = '';
  form: FormGroup;
  dataCategories$: Observable<IDropdownItem[]>;

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    fb: FormBuilder,
    private modalService: NgbModal,
    private productsService: ProductsService
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      height: [null],
      width: [null],
      depth: [null],
      price: [null, [Validators.required]],
      useType: [null, [Validators.required]],
      enabled: [false, [Validators.required]],
      validFrom: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });

    this.dataCategories$ = this.productsService.dataCategories$.pipe(
      map((rows) =>
        rows.map((row) => {
          return { id: row.key.toString(), name: row.description, enabled: true };
        })
      ),
      share()
    );
  }

  ngAfterViewInit(): void {}

  open() {
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onSubmit() {
    //this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('http');
    }

    //this.changeDetectorRef.detectChanges();
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
