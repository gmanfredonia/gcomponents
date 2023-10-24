import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {  
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { GValidationMessages } from '../../services/gvalidation-messages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gvalidation-message',
  templateUrl: './gvalidation-messages.component.html',
  styleUrls: ['./gvalidation-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GValidationMessageComponent implements OnInit, OnDestroy {
  //Input
  @Input()
  control?: NgControl;
  private controlStatusChangesSubscription?: Subscription;
  private controlContainerStatusChangesSubscription?: Subscription;

  //Private properties
  //[...]

  //ViewChild
  //[...]

  //Lifecycle events
  ngOnInit(): void {
    this.controlStatusChangesSubscription =
      this.control?.statusChanges?.subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
    this.controlStatusChangesSubscription =
      this.controlContainer.statusChanges?.subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });
  }
  ngOnDestroy(): void {
    this.controlStatusChangesSubscription?.unsubscribe();
    this.controlContainerStatusChangesSubscription?.unsubscribe();
  }

  //Constructor
  constructor(
    private messagesService: GValidationMessages,
    public controlContainer: FormGroupDirective,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  //Public properties
  //[...]

  //Output
  //[...]

  //Methods
  public getErrors(): string[] {
    let result: string[];
    const errors = Object.entries(this.control!.errors!);

    result = [];
    errors.forEach((error) =>
      result.push(this.messagesService.getMessage(error[0], error[1]))
    );

    return result;
  }

  //Interfaces
  //[...]
}
