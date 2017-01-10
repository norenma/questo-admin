import {MediaFile} from '../models/media-file';
import {HttpQuestionnaireService} from '../questionnaire/http-questionnaire.service';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {AnswerSet, Answer} from '../models/answer-set';
import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-edit-answers',
  templateUrl: './edit-answers.component.html',
  styleUrls: ['./edit-answers.component.css']
})
export class EditAnswersComponent implements OnInit {


  @Input() answer: AnswerSet;
  @Output() deleted = new EventEmitter();
  @ViewChild('audio') audio: ElementRef;


  constructor(private questionnaires: QuestionnaireService, private http: HttpQuestionnaireService) { }

  ngOnInit() {
  }

  nameChanged(event) {
    setTimeout(() => {

    });
  }

  updateAnswerSet() {
    setTimeout(() => {
      this.questionnaires.updateAnswerSet(this.answer);
    });
  }

  updateAnswer(answer: Answer) {
    this.http.updateAnswer(answer).then(() => { console.log("answer updated!", answer) });
  }

  deleteAnswerSet() {
    this.http.deleteAnswerSet(this.answer).then(() => {
      console.log("delete");
      this.deleted.emit(this.answer);
    });
  }

  deleteAnswer(answer: Answer) {
    this.http.deleteAnswer(answer).then(() => {
      console.log("deleted", answer);

      this.answer.answers = this.answer.answers.filter(a => { return a.id !== answer.id });

    });
  }

  addAnswer() {
    this.http.createAnswer(this.answer).then(answer => {
      console.log("resp!", answer);
      this.answer.answers.push(new Answer(answer.label, answer.value, answer.id, null));
    });
  }

  audioUploaded(data, answer: Answer) {
    console.log("here");
    console.log(data, answer);
    let audioUrl = 'http://0.0.0.0:3000/uploads/' + data.ref;
    console.log("audio uploaded");
    let audioFile = new MediaFile(data.id, audioUrl);
    answer.audio = audioFile;
    this.http.updateAnswer(answer);
    this.audio.nativeElement.load();
  }
}
