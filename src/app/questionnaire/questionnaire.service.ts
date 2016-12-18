import { Subscale } from '../models/subscale';
import { Category } from '../models/category';
import { MediaFile } from '../models/media-file';
import * as q from 'q';
import { Question } from '../models/question';
import { HttpQuestionnaireService } from './http-questionnaire.service';
import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';


@Injectable()
export class QuestionnaireService {

  private _questionnaires: Array<Questionnaire> = [];
  constructor(private httpService: HttpQuestionnaireService) {
    this.httpService.getQuestionnaires(1).then(questionnaires => {
      questionnaires.forEach(questionnaire => {
        this.questionnaires.push(new Questionnaire(questionnaire.name,
          questionnaire.id, false, "hej", false, null))
      });
      console.log(this.questionnaires);
      //this.questionnaires = resp.json();

    });
  }

  getQuestionImage(question: Question) {
    return this.httpService.getQuestion(question.id).then(q => {
      console.log("q", q);
      return this.httpService.getMediaFile(q.question_image).then(res => {
        console.log("res2", res);
        return new MediaFile(res.id, 'http://0.0.0.0:3000/uploads/' + res.ref);
      });
    });
  }
  public get questionnaires(): Array<Questionnaire> {
    return this._questionnaires;
  }

  public updateQuestion(question: Question) {
    console.log("update q", question);
    this.httpService.updateQuestion(question);
  }

  public updateQuestionnaire(questionnaire: Questionnaire) {
    console.log('updating questionnaire:', questionnaire);
    this.httpService.updateQuestionnaire(questionnaire).then(res => {
      console.log('questionnaire updated', res);
    });
  }

  public updateCategory(category: Category) {
    this.httpService.updateCategory(category).then(res => {
      console.log('category updated', res);
    });
  }

  public subscaleUpdated(sub: Subscale) {
    this.httpService.updateSubScale(sub).then(res => {
      console.log("subscale updated", res);
    });
  }

  public newSubscale(sub: Subscale, questionnaire: Questionnaire) {
    return this.httpService.createSubScale(sub, questionnaire.id).then(res => {
      console.log("new subscale", res);
      let newSub = new Subscale(res.id, res.name, res.order);
      questionnaire.subscales.push(newSub);
    });
  }

  public removeSubscale(sub: Subscale) {
    return this.httpService.deleteSubScale(sub).then(res => {
      console.log("deleted", res);
    });
  }
}
