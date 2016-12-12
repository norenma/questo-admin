import {Category} from '../models/category';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-category-preview',
  templateUrl: './category-preview.component.html',
  styleUrls: ['./category-preview.component.css']
})
export class CategoryPreviewComponent implements OnInit {


  @Input() category : Category;

  constructor() { }

  ngOnInit() {
    console.log("Category:", this.category);
  }

}
