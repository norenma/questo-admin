import {MediaUploadModule} from '../file-upload/file-upload.module';
import {HttpQuestionnaireService} from '../questionnaire/http-questionnaire.service';
import {ModalModule} from 'ng2-bootstrap';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {EditAnswersComponent} from '../edit-answers/edit-answers.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnswersComponent} from './answers.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    HttpModule,
    FormsModule,
    MediaUploadModule
  ],
  declarations: [AnswersComponent, EditAnswersComponent],
  exports: [AnswersComponent],
  providers: [QuestionnaireService, HttpQuestionnaireService]
})
export class AnswersModule { }
