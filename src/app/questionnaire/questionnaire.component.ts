import { Question } from '../question';
import * as q from 'q';
import { Category } from '../category';
import { Questionnaire } from '../questionnaire';
import { HttpQuestionnaireService } from './http-questionnaire.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpQuestionnaireService
  ) { }


  private sub: any;
  private id: number;
  private questionnaire: Questionnaire;


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.getQuestionnaire(this.id).then(data => {
        this.questionnaire = this.createQuestionnaire(data);

      });
    });
  }

  /**
   * This is where the questionnaire gets translated from 
   * the servers representation to the model. If the object
   * returned from the server gets changed, this might need to be 
   * changed too.
   */
  createQuestionnaire(data: any): Questionnaire {
    let qData = data.questionnaire;
    let name = qData.name;
    let qId = qData.id;
    let useSubScales = qData.has_result_categories;
    let description = qData.description;
    let sameAnswer = false; // TODO
    let questionnaire = new Questionnaire(name, qId, useSubScales, description,
      sameAnswer, null);
    data.categories.forEach(cat => {
      let id = cat.id;
      let name = cat.name;
      let description = cat.description;
      let order = cat.order;
      let catTmp = new Category(id, name, description, order);
      questionnaire.addCategory(catTmp);
      let questionsTmp = [];
      cat.questions.forEach(q => {
        let id = q.id;
        let name = q.text;
        catTmp.addQuestion(new Question(name, id, null, null));
      });
    });
    return questionnaire;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
