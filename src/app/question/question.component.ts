import {MediaFile} from '../models/media-file';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {Question} from '../models/question';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  constructor(private questionnaires: QuestionnaireService) { }

  ngOnInit() {
    console.log(this.question);
  }

  reloadImage() {
    this.questionnaires.getQuestionImage(this.question).then(img => {
      console.log(img);
      this.question.image = img;
    });
  }

}
