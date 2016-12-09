import { Injectable } from '@angular/core';
import { Questionnaire } from './questionnaire'
import { HttpQuestionnaireService, User } from './questionnaire/http-questionnaire.service'


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


	public get questionnaires(): Array<Questionnaire>  {
		return this._questionnaires;
	}
  

}
