import { Component } from '@angular/core';
import { HttpQuestionnaireService } from './questionnaire/http-questionnaire.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Questo Admin-Tool';

  constructor(private httpQuestionnaireService: HttpQuestionnaireService) {

  }
}
