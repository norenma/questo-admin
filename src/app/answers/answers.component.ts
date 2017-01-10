import { HttpQuestionnaireService } from '../questionnaire/http-questionnaire.service';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { AnswerSet } from '../models/answer-set';
import { Questionnaire } from '../models/questionnaire';
import { Component, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
  
})
export class AnswersComponent {

  @ViewChild('childModal') public childModal: ModalDirective;
  @Input() questionnaire: Questionnaire;
  @Input() selected;
  @Input() currentAnswerId: string = null;

  constructor(private viewContainerRef: ViewContainerRef, private questionnaires: QuestionnaireService, private http: HttpQuestionnaireService) {
    this.viewContainerRef = viewContainerRef;
  }
  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  getAnswer() {
    let id = parseInt(this.currentAnswerId);
    return this.questionnaire.answers.find(a => {
      return a.id === id;
    });
  }

  answerDeleted(answerSet: AnswerSet) {
    console.log(answerSet);
    // delete on server
    // remove from view
    this.currentAnswerId = null;
    // remove from model
    this.questionnaire.answers.filter(a => {
      return a.id !== answerSet.id;
    });
  }

  addAnswerSet(){
    this.http.createAnswerSet(this.questionnaire.id).then(answerSet => {
      let aSet = answerSet.responseOpt;
      this.questionnaire.answers.push(new AnswerSet(aSet.name, aSet.id, []));
      this.currentAnswerId = aSet.id;
    });
}

  /*  answerChanged(event) {
      this.currentAnswer = this.questionnaire.answers.find(ans => { return parseInt(event + "") === ans.id });
      console.log(this.currentAnswer);
    }*/

}
