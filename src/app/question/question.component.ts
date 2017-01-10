import {Category} from '../models/category';
import {Questionnaire} from '../models/questionnaire';
import {MediaFile} from '../models/media-file';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {Question} from '../models/question';
import {Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @ViewChild('audio') audio: ElementRef;
  @Input() questionnaire: Questionnaire;
  @Output() onDelete = new EventEmitter();
  answer: any;
  currentSub: any;
  

  constructor(private questionnaires: QuestionnaireService) { }

  ngOnInit() {

  }

  imageUploaded(data) {
    console.log(data);
    let imgUrl = 'http://0.0.0.0:3000/uploads/' + data.ref;
    console.log("img uploaded");
    let imgFile = new MediaFile(data.id, imgUrl);
    this.question.image = imgFile;
    console.log("d", this.question);
    this.questionnaires.updateQuestion(this.question);
  }

  audioUploaded(data) {
    console.log(data);
    let audioUrl = 'http://0.0.0.0:3000/uploads/' + data.ref;
    console.log("audio uploaded");
    let audioFile = new MediaFile(data.id, audioUrl);
    this.question.audio = audioFile;
    this.questionnaires.updateQuestion(this.question);
    this.audio.nativeElement.load();
  }

  updateQuestion() {
    console.log("change");
    this.questionnaires.updateQuestion(this.question);
  }

  answerChanged(event) {
    this.question.answer = this.questionnaire.answers.find(ans => { return parseInt(event + "") === ans.id });
    this.updateQuestion();
  }

  subscaleChange(event) {
    let subscale = this.questionnaire.subscales.find(sub => { return sub.id === parseInt(event + "") });
    this.question.subScale = subscale;
    this.updateQuestion();
  }

  delete(){
    let cat = this.questionnaire.$categories.find(tmp => {return this.question.catId === tmp.id});
    this.onDelete.emit();
    this.questionnaires.deleteQuestion(this.question, cat);
  }

}
