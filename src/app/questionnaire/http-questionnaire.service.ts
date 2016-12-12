import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, ResponseContentType, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class HttpQuestionnaireService {
  private userId: number;
  private baseUrl = 'http://0.0.0.0:3000/'
  constructor(private http: Http) {
    this.init();
  }

  init() {
    this.callFirst().then(resp => {
      console.log("Got first response from server:", resp);
    }).catch(this.handleError);
  }

  callFirst() {
    console.log("called!");
    return this.http.get(this.baseUrl, { withCredentials: true })
      .toPromise();
  }


  login(user: User) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.post(this.baseUrl + 'api/users/login', { 'username': user.username, 'password': user.password }, options)
      .toPromise().then(this.extractData).then(this.setUserId).catch(this.handleError);
  }

  private setUserId = (res: any): any => {
    console.log("rees", res);
    console.log("this", this);
    this.userId = res.id;
    return res;
  }

  getQuestionnaires(id: number): Promise<any> {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.get(this.baseUrl + 'api/questionnaires/fetchAllForUser/' + id, options)
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
    return this.http.get(this.baseUrl + 'api/questionnaires/fetch/' + qId, options)
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




}

export class User {
  constructor(public username: string, public password: string) { }
}