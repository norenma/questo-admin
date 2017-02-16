import {TruncatePipe} from './Util/truncate';
import { SubscalesModule } from './subscales/subscales.module';
import { Ng2UploaderModule } from 'ng2-uploader';
import { QuestionModule } from './question/question.module';
import { ResultsModule } from './results/results.module';
import { MediaUploadModule } from './file-upload/file-upload.module';
import { AnswersModule } from './answers/answers.module';
import { QuestionnaireService } from './questionnaire/questionnaire.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpQuestionnaireService } from './questionnaire/http-questionnaire.service';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { HeaderComponent } from './header/header.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireDetailListComponent } from './questionnaire-detail-list/questionnaire-detail-list.component';
import { GlobalComponent } from './global/global.component';
import { CategoryComponent } from './category/category.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { CategoryPreviewComponent } from './category-preview/category-preview.component';
import { ShareComponent } from './share/share.component';
import * as NG2Bootstrap from 'ng2-bootstrap';
import { ResultListComponent } from './results/result-list/result-list.component';
import { DndModule } from 'ng2-dnd';
import { CreateUserComponent } from './create-user/create-user.component';



const appRoutes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'questionnaires', component: QuestionnaireListComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent },
  { path: 'questionnaire/:id/category/:catId', component: QuestionnaireComponent },
  { path: 'results/:id', component: ResultListComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionnaireListComponent,
    HeaderComponent,
    QuestionnaireComponent,
    QuestionnaireDetailListComponent,
    GlobalComponent,
    CategoryComponent,
    CategoryPreviewComponent,
    ShareComponent,
    CreateUserComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2UploaderModule,
    NG2Bootstrap.AlertModule.forRoot(),
    NG2Bootstrap.ModalModule.forRoot(),
    NG2Bootstrap.DropdownModule.forRoot(),
    AnswersModule,
    MediaUploadModule,
    ResultsModule,
    QuestionModule,
    SubscalesModule,
    DndModule.forRoot(),
    //ContextMenuModule

  ],
  providers: [HttpQuestionnaireService, QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
