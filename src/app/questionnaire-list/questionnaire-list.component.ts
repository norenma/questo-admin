import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { HttpQuestionnaireService, User } from '../questionnaire/http-questionnaire.service'
import {QuestionnaireService} from '../questionnaire/questionnaire.service';



@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  constructor(private questionnairesService: QuestionnaireService, private router: Router) { }

  //questionnaires: any[] = [{"name": "12"}, {"name": "ewfre"}];
  ngOnInit() {
/*    this.httpService.getQuestionnaires().then(resp => {
      console.log(resp.json());
      this.questionnaires = resp.json();
    });*/

  }

  get questionnaires(){
    return this.questionnairesService.questionnaires;
  }

  goToQuestionnaire(id) {
    this.router.navigate(['/questionnaire/', id]);
  }

}
