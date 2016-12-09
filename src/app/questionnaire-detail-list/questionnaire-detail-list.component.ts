import { State } from '../questionnaire/questionnaire.component';
import { Router } from '@angular/router';
import { Questionnaire } from '../questionnaire';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-questionnaire-detail-list',
  templateUrl: './questionnaire-detail-list.component.html',
  styleUrls: ['./questionnaire-detail-list.component.css']
})
export class QuestionnaireDetailListComponent implements OnInit {

  @Input()
  questionnaire: Questionnaire;

  @Output() stateChanged = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToGlobal() {
    console.log("click!");
    this.stateChanged.emit({ "type": State.Global });

  }

  goToCat(cat) {
    console.log("click!");
    this.stateChanged.emit({ "type": State.Category, "category": cat });
  }

  goToQuestion(question) {
    console.log("click q!");
    //this.router.navigate(['/questionnaire/', this.questionnaire.id]);
    this.stateChanged.emit({ "type": State.Question, "question": question });
  }

}
