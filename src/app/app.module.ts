import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpQuestionnaireService } from './questionnaire/http-questionnaire.service';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'questionnaires', component: QuestionnaireListComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionnaireListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule,
  ],
  providers: [HttpQuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
