import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {Subscale} from '../models/subscale';
import {Component, Input, ViewChild, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'app-subscales',
  templateUrl: './subscales.component.html',
  styleUrls: ['./subscales.component.css']
})
export class SubscalesComponent {
  @Input() questionnaire: Array<Subscale>;
  @Output() updated = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  orderUpdated(subscales: Array<Subscale>) {
    subscales.forEach(sub => {
      this.updated.emit(sub);
    });
  }


}
