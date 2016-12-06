import {Questionnaire} from '../questionnaire';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-questionnaire-detail-list',
  templateUrl: './questionnaire-detail-list.component.html',
  styleUrls: ['./questionnaire-detail-list.component.css']
})
export class QuestionnaireDetailListComponent implements OnInit {

  @Input()
  questionnaire: Questionnaire;
  constructor() { }

  ngOnInit() {
  }

}
