import { MediaFile } from '../models/media-file';
import { Question } from '../models/question';
import * as q from 'q';
import { Category } from '../models/category';
import { Questionnaire } from '../models/questionnaire';
import { HttpQuestionnaireService } from './http-questionnaire.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';


export enum State {
  Global,
  Category,
  Question
}

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

  private states = State;
  private sub: any;
  private id: number;
  private questionnaire: Questionnaire;
  private state: State = State.Global;

  private currentCategory: Category;
  private currentQuestion: Question;


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.http.getQuestionnaire(this.id).then(data => {
        this.questionnaire = this.createQuestionnaire(data);
        console.log(this.questionnaire);
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
      this.addImage(catTmp, cat.image);
      let questionsTmp = [];
      cat.questions.forEach(q => {
        let id = q.id;
        let name = q.text;
        let questionTmp: Question = new Question(name, id, null, null);
        let imgId = q.question_image;
        this.addImage(questionTmp, imgId);
        catTmp.addQuestion(questionTmp);
      });
    });
    return questionnaire;
  }

  addImage(hasImage: { image: MediaFile }, id: number) {
    if (id) {
      this.http.getMediaFile(id).then(res => {
        console.log("res", res);
        let imgUrl = 'http://0.0.0.0:3000/uploads/' + res.ref;
        let imgFile = new MediaFile(id, imgUrl);
        hasImage.image = imgFile;
      });
    } else {
      hasImage.image = new MediaFile(null, "");
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  stateChanged(event) {
    console.log("state changed!", event);
    if (event.type === State.Category) {
      this.currentCategory = event.category;
      this.currentQuestion = null;
    } else if (event.type === State.Question) {
      this.currentQuestion = event.question;
      this.currentCategory = null;
    } else {
      this.currentCategory = null;
      this.currentQuestion = null;
    }
    this.state = event.type;

    console.log("this.state", this.state);
  }

}
