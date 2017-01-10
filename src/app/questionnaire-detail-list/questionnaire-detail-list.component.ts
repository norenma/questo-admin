import { Category } from '../models/category';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { State } from '../questionnaire/questionnaire.component';
import { Router } from '@angular/router';
import { Questionnaire } from '../models/questionnaire';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questionnaire-detail-list',
  templateUrl: './questionnaire-detail-list.component.html',
  styleUrls: ['./questionnaire-detail-list.component.css']
})
export class QuestionnaireDetailListComponent implements OnInit {

  @Input()
  questionnaire: Questionnaire;
  private state: State = State.Global;
  private currentId;
  private states = State;

  @Output() stateChanged = new EventEmitter();


  constructor(private router: Router, private questionnaires: QuestionnaireService) { }

  ngOnInit() {

  }

  goToGlobal() {
    console.log("click!");
    this.state = State.Global;
    this.stateChanged.emit({ "type": State.Global });

  }

  goToCat(cat) {
    console.log("click!");
    this.state = State.Category;
    this.currentId = cat.id;
    this.stateChanged.emit({ "type": State.Category, "category": cat });
  }

  goToQuestion(question) {
    console.log("click q!");
    this.state = State.Question;
    this.currentId = question.id;
    //this.router.navigate(['/questionnaire/', this.questionnaire.id]);
    this.stateChanged.emit({ "type": State.Question, "question": question });
  }

  newCat() {
    this.questionnaires.newCat(this.questionnaire, this.questionnaire.$categories.length);
  }

  newQuestion(cat: Category) {
    console.log(cat);
    this.questionnaires.newQuestion(cat, cat.questions.length);
  }
}
