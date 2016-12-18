import {MediaFile} from '../models/media-file';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {Category} from '../models/category';
import {ElementRef, Component, OnInit, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  @ViewChild('audio') audio:ElementRef;
  constructor(private questionnaires: QuestionnaireService) { }

  ngOnInit() {
    console.log("cat", this.category);
  }

  onUpdate() {
    console.log("on update");
    setTimeout(() => { this.questionnaires.updateCategory(this.category) });
  }


  imageUploaded(data) {
    console.log(data);
    let imgUrl = 'http://0.0.0.0:3000/uploads/' + data.ref;
    console.log("img uploaded");
    let imgFile = new MediaFile(data.id, imgUrl);
    this.category.image = imgFile;
    this.questionnaires.updateCategory(this.category);
  }


  audioUploaded(data) {
    console.log(data);
    let audioUrl = 'http://0.0.0.0:3000/uploads/' + data.ref;
    console.log("audio uploaded");
    let audioFile = new MediaFile(data.id, audioUrl);
    this.category.audio = audioFile;
    this.questionnaires.updateCategory(this.category);
    this.audio.nativeElement.load();
  }



}
