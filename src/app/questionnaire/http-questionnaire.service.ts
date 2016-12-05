import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, ResponseContentType, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class HttpQuestionnaireService {

  private baseUrl = 'http://0.0.0.0:3000/'
  constructor(private http: Http) { 
    this.init();
  }

  init(){
    this.callFirst().then(resp => {
      console.log("Got first response from server:", resp);
    }).catch(this.catchErorr);
  }
  callFirst() {
    console.log("called!");
    return this.http.get(this.baseUrl, {withCredentials: true })
      .toPromise();
  }


  login(user: User) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.post(this.baseUrl + 'sessions/login_attempt', { 'authenticity_token': 'qYZiLypRNITQGBnkLczgTUgNqgPO8eEL3YDVG85Byuc=', 'username_or_email': user.username, 'login_password': user.password }, options)
      .toPromise();
  }

  getQuestionnaires() {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.get(this.baseUrl + 'questionnaires', options)
      .toPromise();
  }

  catchErorr(err) {
    console.log("error when calling server", err);
  }




}

export class User {
  constructor(public username: string, public password: string){}
}