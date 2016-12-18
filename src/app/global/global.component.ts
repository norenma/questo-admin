import { Subscale } from '../models/subscale';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { Questionnaire } from '../models/questionnaire';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  @Input()
  questionnaire: Questionnaire;
  currentAnswer: any = -1;
  constructor(private questionnaires: QuestionnaireService) { }

  ngOnInit() {
  }

  questionnaireUpdated() {
    setTimeout(() => {
      this.questionnaires.updateQuestionnaire(this.questionnaire);
    }, 0);
  }


  subscaleUpdated(sub: Subscale) {
    this.questionnaires.subscaleUpdated(sub)
  }

  sameAnswerChanged() {
    // Quirk cause angular updates model AFTER it triggers change listeners.
    setTimeout(() => {
      console.log("changed value to", this.currentAnswer);
      //let answer = this.questionnaire.answer;
      console.log("answer", this.currentAnswer);
      let answerSet = this.questionnaire.answers.find(a => {
        console.log("a.id", a.id);
        return parseInt(this.currentAnswer) === a.id
      });
      console.log("answe obj", answerSet);
      this.questionnaire.$categories.forEach(cat => {
        cat.questions.forEach(q => {
          q.answer = answerSet;
          this.questionnaires.updateQuestion(q);
        });
      });
    }, 0);
  }

}
