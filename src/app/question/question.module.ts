import {SubscalesModule} from '../subscales/subscales.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpQuestionnaireService} from '../questionnaire/http-questionnaire.service';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {MediaUploadModule} from '../file-upload/file-upload.module';
import {QuestionComponent} from './question.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionPreviewComponent} from '../question-preview/question-preview.component';
import {FormsModule} from '@angular/forms';
import { AnswersModule } from '../answers/answers.module';


@NgModule({
  imports: [
    CommonModule,
    MediaUploadModule,
    BrowserModule,
    FormsModule,
    SubscalesModule,
    AnswersModule


  ],
  declarations: [QuestionComponent, QuestionPreviewComponent],
  exports: [QuestionComponent],
  providers: [QuestionnaireService, HttpQuestionnaireService]
})
export class QuestionModule { }
