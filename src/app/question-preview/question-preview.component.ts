import { Question } from '../models/question';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.css']
})
export class QuestionPreviewComponent implements OnInit {

  @Input() question: Question;

  constructor() { }

  ngOnInit() {
    console.log("Question:", this.question);
  }

}
