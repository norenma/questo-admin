import { Router, Event } from '@angular/router';
import { ViewChild, Component, OnInit } from '@angular/core';
import { HttpQuestionnaireService, User } from '../questionnaire/http-questionnaire.service'
import { QuestionnaireService } from '../questionnaire/questionnaire.service';



@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.css']
})
export class QuestionnaireListComponent implements OnInit {

  constructor(private questionnairesService: QuestionnaireService, private router: Router) { }

  //questionnaires: any[] = [{"name": "12"}, {"name": "ewfre"}];
  ngOnInit() {
    console.log("ON INIT", this.questionnaires);
    /*    this.httpService.getQuestionnaires().then(resp => {
          console.log(resp.json());
          this.questionnaires = resp.json();
        });*/
    if (this.questionnaires === null) {
      this.questionnairesService.updateQuestionnaires();
    }

  }

  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];

  get questionnaires() {
    return this.questionnairesService.questionnaires;
  }

  goToQuestionnaire(id) {
    this.router.navigate(['/questionnaire/', id]);
  }

  goToResults(id) {
    this.router.navigate(['/results/', id]);
  }

  newQuestionnaire() {
    this.questionnairesService.createQuestionnaire().then(() => {
      this.questionnairesService.updateQuestionnaires();
    });
  }






}
