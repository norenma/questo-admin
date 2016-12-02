import { Component, OnInit } from '@angular/core';
import { HttpQuestionnaireService, User } from '../questionnaire/http-questionnaire.service'
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User("", "");
  submitted = false;

  constructor(
    private httpService: HttpQuestionnaireService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this.httpService.login(this.user).then(resp => {
      console.log(resp);
      console.log("resp.json()._body", resp.json());
      if (resp.json() !== false) {
        console.log("logged in as: ", resp.json().username);
        this.router.navigate(['/questionnaires']);
      }
    });
    this.submitted = true;
  }
}


