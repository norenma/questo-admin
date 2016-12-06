import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, ResponseContentType, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class HttpQuestionnaireService {

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
    return this.http.post(this.baseUrl + 'sessions/login_attempt', { 'authenticity_token': 'qYZiLypRNITQGBnkLczgTUgNqgPO8eEL3YDVG85Byuc=', 'username_or_email': user.username, 'login_password': user.password }, options)
      .toPromise();
  }

  getQuestionnaires(): Promise<any> {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.get(this.baseUrl + 'questionnaires', options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("res", res);
    let body = res.json();
    console.log("body", body);
    return body || {};
  }


  getQuestionnaire(id) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    return this.http.get(this.baseUrl + 'questionnaire/' + id, options)
      .toPromise().then(this.extractData).catch(this.handleError);
  }

  private handleError(err) {
    console.log("error when calling server", err);
  }




}

export class User {
  constructor(public username: string, public password: string) { }
}