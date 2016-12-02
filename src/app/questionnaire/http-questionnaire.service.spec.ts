/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpQuestionnaireService } from './http-questionnaire.service';
import { Http, Response } from '@angular/http';


describe('Service: HttpQuestionnaireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpQuestionnaireService, Http]
    });
  });

  it('should ...', inject([HttpQuestionnaireService], (service: HttpQuestionnaireService) => {
    expect(service).toBeTruthy();
  }));
});
