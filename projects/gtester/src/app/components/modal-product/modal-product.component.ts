import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {  
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalProductComponent implements AfterViewInit {
  closeResult = '';
  form: FormGroup;

  @ViewChild('content') content!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,    
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      height: [null],
      width: [null],
      depth: [null],
      price: [null, [Validators.required]],
      useType: [null, [Validators.required]],
      enabled: [false, [Validators.requiredTrue]],
      validFrom: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
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
