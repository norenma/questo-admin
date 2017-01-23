import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Result } from './result';

const URL = 'http://virt09.itu.chalmers.se/'

@Injectable()
export class ResultsService {

  private _result: Result[] = [];
  constructor(private http: Http) {
 /*   setTimeout(() => {
          let options: RequestOptionsArgs = {};
          options.withCredentials = true;
          // options.responseType = ResponseContentType.Json;
          options.headers = new Headers({ 'Content-Type': 'application/json' });
          console.log(options);
          let body = {
              'tester_id' : "gretr",
              'questionnaire': 1,
              'question': 1,
              'label': 'Ja',
              'value': 2
          }
          return this.http.post(URL + 'api/answers/', body, options)
            .toPromise().then(this.extractData).catch(this.handleError);
        }, 1300);*/
  }

  fetchResults() {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    return this.http.get(URL + 'api/answers/1', options)
      .toPromise().then(this.extractData).then(this.createObjects).catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("res", res);
    let body = res.json();
    console.log("body", body);
    return body || {};
  }

  private handleError(err) {
    console.log("error when calling server", err);
  }

  private createObjects = (res: any) => {
    for (let a of res) {
      console.log(a);
      let newResult = new Result(a.tester_id, a.numberOfAnswers, a.lastAnswer, true);
      console.log("this", this);
      this.result.push(newResult);
    }
  }

  public download(id: any) {
    let options: RequestOptionsArgs = {};
    options.withCredentials = true;
    // options.responseType = ResponseContentType.Json;
    options.headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(options);
    let body = {
      'answer': id
    }
    console.log("Body", body);
    return this.http.post(URL + 'api/answers/generate_csv/', body, options)
      .toPromise().catch(this.handleError);
  }


  public get result(): Result[] {
    return this._result;
  }

  public set result(value: Result[]) {
    this._result = value;
  }




}
