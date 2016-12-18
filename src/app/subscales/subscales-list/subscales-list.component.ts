import {QuestionnaireService} from '../../questionnaire/questionnaire.service';
import {Questionnaire} from '../../models/questionnaire';
import {Subscale} from '../../models/subscale';
import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-subscales-list',
  templateUrl: './subscales-list.component.html',
  styleUrls: ['./subscales-list.component.css']
})
export class SubscalesListComponent implements OnInit, OnChanges {
  @Input() questionnaire: Questionnaire;
  @Output() updated = new EventEmitter();
  private newName: string = "";
  constructor(private questionnaires : QuestionnaireService) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.sort();
  }

  sortSubscales() {
    this.subscales = this.subscales.map((sub, i) => {
      sub.order = i;
      return sub;
    });
  }

  update() {
    console.log("update!");
    this.sortSubscales()
    console.log(this.subscales);
    this.updated.emit(this.subscales);
  }

  get subscales() {
    return this.questionnaire.subscales;
  }

  set subscales(subscales) {
    this.questionnaire.subscales = subscales;
  }

  sort() {
    this.subscales = this.subscales.sort((a, b) => {
      return a.order - b.order;
    });

  }

  newSubscale() {
    let newSub = new Subscale(null, this.newName, this.subscales.length);
    this.sort();
    this.questionnaires.newSubscale(newSub, this.questionnaire);
    this.newName = "";
  }

  delete(sub: Subscale) {
    this.questionnaires.removeSubscale(sub).then(res => {
      this.questionnaire.subscales = this.questionnaire.subscales.filter(tmp => {
        return tmp.id !== sub.id; 
      });
      this.sort();
    });
  }

}
