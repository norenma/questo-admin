import {Questionnaire} from '../models/questionnaire';
import {HttpQuestionnaireService} from '../questionnaire/http-questionnaire.service';
import {Component, ViewChild, Input, ViewContainerRef} from '@angular/core';

// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap';
// webpack html imports

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() questionnaire: Questionnaire;

  write: boolean;
  nameOrEmail: string;
  private fail : boolean = false;
  private success = false;

  constructor(private viewContainerRef: ViewContainerRef, private http: HttpQuestionnaireService) {
    this.viewContainerRef = viewContainerRef;
  }
  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  public share(){
    this.http.share(this.questionnaire, this.nameOrEmail, this.write).then(res => {
      console.log("shared", res);
      if(res.status === 'fail') {
        console.log("FAIl");
        this.fail = true;
        
      } else if (res.status === 'OK') {
        console.log("SUCCESS");
        this.fail = false;
        this.success = true;
        setTimeout(() => {this.success = false;}, 7000);
      }
    });
  }


}

