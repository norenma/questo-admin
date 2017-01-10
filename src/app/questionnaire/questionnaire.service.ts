import { Answer, AnswerSet } from '../models/answer-set';
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

  public newCat(questionnaire: Questionnaire, order: number) {
    return this.httpService.newCat(questionnaire, order).then(res => {
      console.log("res", res);
      let newCat = new Category(res.id, res.name, "", res.order, null, null);
      questionnaire.$categories.push(newCat);
    });
  }

  public newQuestion(cat: Category, order: number) {
    return this.httpService.newQuestion(cat, order).then(res => {
      let newq = new Question(res.text, res.id, null, null);
      cat.questions.push(newq);
    });
  }

  public deleteQuestion(question: Question, category: Category) {
    return this.httpService.deleteQuestion(question.id).then(res => {
      category.questions = category.questions.filter(q => { return q.id !== question.id });
    });
  }

  public deleteCategory(cat: Category, questionnaire: Questionnaire) {
    return this.httpService.deleteCategory(cat.id).then(res => {
      questionnaire.$categories = questionnaire.$categories.filter(tmp => { return tmp.id !== cat.id });
    });
  }

  public deleteQuestionnaire(questionnaire: Questionnaire) {
    return this.httpService.deleteQuestionnarie(questionnaire.id).then(res => {
    });
  }

  public updateAnswerSet(answerSet: AnswerSet) {
    this.httpService.updateAnswerSet(answerSet).then(res => {
      console.log("answer updated", res);
    });
  }


  public removeAnswerSet(answerSet: AnswerSet) {
    return this.httpService.deleteAnswerSet(answerSet).then(res => {
      console.log("deleted", res);
    });
  }

}
