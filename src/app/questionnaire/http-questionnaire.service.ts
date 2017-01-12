import { Router } from '@angular/router';
import { AnswerSet, Answer } from '../models/answer-set';
import { Subscale } from '../models/subscale';

import { Category } from '../models/category';
import { Questionnaire } from '../models/questionnaire';
import { Question } from '../models/question';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';



@Injectable()
export class HttpQuestionnaireService {
  private userId: number;
  private userName: string = "";
  private baseUrl = 'http://0.0.0.0:3000/'

  private logoutSource = new Subject();
  $logout = this.logoutSource.asObservable();

  constructor(private http: Http) {
    this.init();
  }

  init() {
    this.callFirst().then(resp => {
      console.log("Got first response from server:", resp);
    }).catch(this.handleError);
  }

  share(questionnaire: Questionnaire, username_or_email: string, write: boolean) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body =
      {
        'username_or_email': username_or_email,
        'questionnaire_id': questionnaire.id,
        'write_permission': write
      }
    return this.http.post(this.baseUrl + 'api/rights/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  createUser(email: string, userName: string, password: string, createUser: boolean, createQuestionnaires: boolean) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body =
      {
        'username:': userName,
        'email': email,
        'password': password,
        'create_user_permission': createUser,
        'create_questionnaire_permission': createQuestionnaires,
        'user_id': this.userId
      }
    return this.http.post(this.baseUrl + 'api/users/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  callFirst() {
    console.log("called!");
    return this.http.get(this.baseUrl, { withCredentials: true })
      .toPromise();
  }

  getUser = () => {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.get(this.baseUrl + 'api/sessions', options)
      .toPromise().then(this.extractData).then(this.setUserId).catch(this.handleError);
  }


  login(user: User) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.post(this.baseUrl + 'api/users/login', { 'username_or_email': user.username, 'login_password': user.password }, options)
      .toPromise().then(this.extractData).then(this.setUserId).catch(this.handleError);
  }

  logout() {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    this.userId = null;
    this.userName = null;
    this.logoutSource.next();
    return this.http.get(this.baseUrl + 'api/users/logout', options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }
  private setUserId = (res: any): any => {
    console.log("rees", res);
    console.log("this", this);
    this.userId = res.id ? res.id : res.userId;
    this.userName = res.username ? res.username : res.name;
    return res;
  }

  getQuestionnaires(): Promise<any> {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.get(this.baseUrl + 'api/questionnaires/allForUserWithRights/fetch', options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("res", res);
    let body = res.json();
    console.log("body", body);
    return body || {};
  }


  getQuestionnaire(qId) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.get(this.baseUrl + 'api/questionnaires/' + qId, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  private handleError(err) {
    console.log("error when calling server", err);
  }

  public getMediaFile(media_id: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.get(this.baseUrl + 'api/media_files/' + media_id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public getQuestion(id: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.get(this.baseUrl + 'api/questions/' + id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public updateQuestion(question: Question) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'text': question.name,
      'question_img': question.image ? question.image.id : null,
      'audio': question.audio ? question.audio.id : null,
      'subscale': question.subScale ? question.subScale.id : null,
      'answer': question.answer ? question.answer.id : null,
      'order': question.order,
      'category_id': question.catId
    }
    return this.http.patch(this.baseUrl + 'api/questions/' + question.id, body, options)
      .toPromise().catch(this.handleError);
  }

  public updateQuestionnaire(questionnaire: Questionnaire) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    console.log("questionnaire.useSubScale", questionnaire.useSubScale);
    let body = {
      'name': questionnaire.name,
      'desc': questionnaire.description,
      'useSubScale': questionnaire.useSubScale
    }
    console.log("body", body);

    /*    let body = {
          "text": "Har du många vänner ?1",
          "question_img": 61
        }*/
    return this.http.patch(this.baseUrl + 'api/questionnaires/' + questionnaire.id, body, options)
      .toPromise().catch(this.handleError);
    //return this.http.get(this.baseUrl + 'api/questionnaires/' + questionnaire.id, options).toPromise().catch(this.handleError);
  }

  public updateCategory(category: Category) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'name': category.name,
      'audio': category.audio ? category.audio.id : null,
      'image': category.image ? category.image.id : null,
      'description': category.description,
      'order': category.order
    }
    return this.http.patch(this.baseUrl + 'api/categories/' + category.id, body, options)
      .toPromise().catch(this.handleError);
  }

  public deleteSubScale(subscale: Subscale) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/result_categories/' + subscale.id, options)
      .toPromise().catch(this.handleError);
  }

  public updateSubScale(subscale: Subscale) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'name': subscale.name,
      'order': subscale.order
    }
    return this.http.patch(this.baseUrl + 'api/result_categories/' + subscale.id, body, options)
      .toPromise().catch(this.handleError);
  }

  public createSubScale(subscale: Subscale, questionnaireId: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'name': subscale.name,
      'order': subscale.order,
      'questionnaire_id': questionnaireId,
    }
    return this.http.post(this.baseUrl + 'api/result_categories/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public newCat(questionnaire: Questionnaire, order: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'order': order,
      'qId': questionnaire.id,
    }
    return this.http.post(this.baseUrl + 'api/categories/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public newQuestion(cat: Category, order: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'order': order,
      'cat': cat.id,
    }
    return this.http.post(this.baseUrl + 'api/questions/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public deleteQuestion(id) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/questions/' + id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public deleteQuestionnarie(id) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/questionnaires/' + id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public deleteCategory(id) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/categories/' + id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public deleteAnswerSet(answerSet: AnswerSet) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/response_options/' + answerSet.id, options)
      .toPromise().catch(this.handleError);
  }

  public updateAnswerSet(answerSet: AnswerSet) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'name': answerSet.name
    }
    return this.http.patch(this.baseUrl + 'api/response_options/' + answerSet.id, body, options)
      .toPromise().catch(this.handleError);
  }

  public createAnswerSet(questionnaireId: number) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'questionnaire_id': questionnaireId,
    }
    return this.http.post(this.baseUrl + 'api/response_options/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public deleteAnswer(answer: Answer) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.delete(this.baseUrl + 'api/response_options_items/' + answer.id, options)
      .toPromise().catch(this.handleError);
  }

  public updateAnswer(answer: Answer) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    console.log("updating answer", answer);
    let body = {
      'label': answer.label,
      'value': answer.value,
      'audio': answer.audio ? answer.audio.id : null
    }
    return this.http.patch(this.baseUrl + 'api/response_options_items/' + answer.id, body, options)
      .toPromise().catch(this.handleError);
  }

  public createAnswer(answerSet: AnswerSet) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'id': answerSet.id
    }
    return this.http.post(this.baseUrl + 'api/response_options_items/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  public createQuestionnaire() {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    let body = {
      'user_id': this.userId
    }
    return this.http.post(this.baseUrl + 'api/questionnaires/', body, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }


  public get $userName(): string {
    return this.userName;
  }

  public set $userName(value: string) {
    this.userName = value;
  }


  public get $userId(): number {
    return this.userId;
  }

  public set $userId(value: number) {
    this.userId = value;
  }




}

export class User {
  constructor(public username: string, public password: string) { }
}