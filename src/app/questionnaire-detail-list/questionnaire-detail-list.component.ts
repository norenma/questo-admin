import { Category } from '../models/category';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { State } from '../questionnaire/questionnaire.component';
import { Router } from '@angular/router';
import { Questionnaire } from '../models/questionnaire';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-questionnaire-detail-list',
  templateUrl: './questionnaire-detail-list.component.html',
  styleUrls: ['./questionnaire-detail-list.component.css']
})
export class QuestionnaireDetailListComponent implements OnInit, OnChanges {

  @Input()
  questionnaire: Questionnaire;
  private state: State = State.Global;
  private currentId;
  private states = State;

  private updatedSinceStart: boolean = true;

  @Output() stateChanged = new EventEmitter();


  constructor(private router: Router, private questionnaires: QuestionnaireService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.sort();
  }

  sort() {
    this.questionnaire.$categories.forEach(cat => {
      cat.questions = cat.questions.sort((a, b) => {
        return a.order - b.order;
      });
    });
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

  update() {
    setTimeout(() => {
      this.updatedSinceStart = true;
      this.questionnaire.$categories.forEach(cat => {
        cat.questions.forEach((q, i) => {
          q.catId = cat.id;
          q.order = i;
          this.questionnaires.updateQuestion(q);
        });
      });
      console.log("HEJ");
    });
  }

  startUpdateTimer() {
    this.updatedSinceStart = false;
    setTimeout(() => {
      if (!this.updatedSinceStart) {
        this.update();
      }
    }, 7000);
  }

  updatee() {
    console.log("HEEEEJ");
  }
}
