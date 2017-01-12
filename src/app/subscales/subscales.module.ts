import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {SubscalesComponent} from './subscales.component';
import {SubscalesListComponent} from './subscales-list/subscales-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';
import * as NG2Bootstrap from 'ng2-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    DndModule.forRoot(),
    NG2Bootstrap.ModalModule.forRoot(),

  ],
  declarations: [SubscalesListComponent, SubscalesComponent],
  exports: [SubscalesComponent],
  providers: [QuestionnaireService]
})
export class SubscalesModule { }
