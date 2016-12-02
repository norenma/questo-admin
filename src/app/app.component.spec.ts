/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpQuestionnaireService } from './questionnaire/http-questionnaire.service';

describe('App: QuestoAdminTool', () => {


  beforeEach(() => {
    let httpQuestionnaireStub = {
    };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
       providers:    [ {provide: HttpQuestionnaireService, useValue: httpQuestionnaireStub } ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Questo Admin-Tool'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Questo Admin-Tool');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Questo Admin-Tool');
  }));
});


