import { QuestionnaireService } from './questionnaire.service';
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
import { QuestionComponent } from './question/question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireDetailListComponent } from './questionnaire-detail-list/questionnaire-detail-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'questionnaires', component: QuestionnaireListComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent },

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [HttpQuestionnaireService, QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
