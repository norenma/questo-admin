import { Subscale } from '../models/subscale';
import { QuestionnaireService } from './questionnaire.service';
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
import { Answer, AnswerSet } from '../models/answer-set';


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
    private http: HttpQuestionnaireService,
    private questionnaires: QuestionnaireService
  ) {
    this.questionnaire = new Questionnaire("", 0, false, "", false, "");
  }

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
        console.log("Questionnaire", this.questionnaire);
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
    questionnaire.subscales = data.result_cats.map(subscale => {
      return new Subscale(subscale.id, subscale.name, subscale.order);
    });
    for (let key in data.response_options) {
      let answerSetD = data.response_options[key];
      let answerSet = new AnswerSet(answerSetD.info.name, answerSetD.info.id, []);
      console.log(answerSetD);
      let resp = JSON.parse(answerSetD.response_items);
      console.log("Resp!", resp);
      answerSet.answers = resp.map(ans => {
        let answer = new Answer(ans.label, ans.value, ans.id, null); 
        console.log("answer sound ", ans);
        this.addAudio(answer, ans.audio);
        return answer;
      });
      questionnaire.answers.push(answerSet);
    }

    data.categories.forEach(cat => {
      let id = cat.id;
      let name = cat.name;
      let description = cat.description;
      let order = cat.order;
      let catTmp = new Category(id, name, description, order);
      questionnaire.addCategory(catTmp);
      this.addAudio(catTmp, cat.audio);
      this.addImage(catTmp, cat.image);
      let questionsTmp = [];
      cat.questions.forEach(q => {
        let id = q.id;
        let name = q.text;
        let questionTmp: Question = new Question(name, id, null, null);
        let imgId = q.question_image;
        let catId = q.category_id;
        this.addAudio(questionTmp, q.question_audio);
        this.addImage(questionTmp, imgId);
        questionTmp.answer = questionnaire.answers.find(tmp => { return q.response_id === tmp.id });
        console.log("Question from server:", q);
        questionTmp.subScale = questionnaire.subscales.find(sub => { return sub.id === q.represent_category_id });
        questionTmp.catId = catId;
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

  addAudio(hasAudio: { audio: MediaFile }, id: number) {
    if (id) {
      this.http.getMediaFile(id).then(res => {
        console.log("res", res);
        let audioUrl = 'http://0.0.0.0:3000/uploads/' + res.ref;
        let audioFile = new MediaFile(id, audioUrl);
        hasAudio.audio = audioFile;
      });
    } else {
      hasAudio.audio = new MediaFile(null, "");
    }
  }

  questionnaireUpdated() {

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

  onDelete() {
    this.currentCategory = null;
    this.currentQuestion = null;
    this.state = State.Global;
  }

}
