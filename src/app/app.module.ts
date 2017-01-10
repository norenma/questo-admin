import {Ng2UploaderModule} from 'ng2-uploader';
import {MediaUploadModule} from './file-upload/file-upload.module';
import {AnswersModule} from './answers/answers.module';
import {QuestionnaireService} from './questionnaire/questionnaire.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpQuestionnaireService} from './questionnaire/http-questionnaire.service';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {QuestionnaireListComponent} from './questionnaire-list/questionnaire-list.component';
import {HeaderComponent} from './header/header.component';
import {QuestionComponent} from './question/question.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {QuestionnaireDetailListComponent} from './questionnaire-detail-list/questionnaire-detail-list.component';
import {GlobalComponent} from './global/global.component';
import {CategoryComponent} from './category/category.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import {CategoryPreviewComponent} from './category-preview/category-preview.component';
import {QuestionPreviewComponent} from './question-preview/question-preview.component';
import {QuestionDetailComponent} from './question-detail/question-detail.component';
import {ShareComponent} from './share/share.component';
import * as NG2Bootstrap from 'ng2-bootstrap';
import {SubscalesComponent} from './subscales/subscales.component';
import {SubscalesListComponent} from './subscales/subscales-list/subscales-list.component';
import {DndModule} from 'ng2-dnd';



const appRoutes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'questionnaires', component: QuestionnaireListComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent },
  { path: 'questionnaire/:id/category/:catId', component: QuestionnaireComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionnaireListComponent,
    HeaderComponent,
    QuestionComponent,
    QuestionnaireComponent,
    QuestionnaireDetailListComponent,
    GlobalComponent,
    CategoryComponent,
    CategoryPreviewComponent,
    QuestionPreviewComponent,
    QuestionDetailComponent,
    ShareComponent,
    SubscalesComponent,
    SubscalesListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2UploaderModule,
    NG2Bootstrap.AlertModule.forRoot(),
    NG2Bootstrap.ModalModule.forRoot(),
    DndModule.forRoot(),
    AnswersModule,
    MediaUploadModule
    //ContextMenuModule

  ],
  providers: [HttpQuestionnaireService, QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
