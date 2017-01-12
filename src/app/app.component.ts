import { Component, OnInit } from '@angular/core';
import { HttpQuestionnaireService } from './questionnaire/http-questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject} from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Questo Admin-Tool';
  openCreateUser = new Subject();
  $openCreateUser = this.openCreateUser.asObservable();

  constructor(private httpQuestionnaireService: HttpQuestionnaireService, private router: Router, ) {
  }

  ngOnInit() {
    if (this.router.url !== '') {
      this.httpQuestionnaireService.getUser().then(res => {
        console.log("USER", res);
        if (!res.name) {
          this.router.navigate(['']);
        }
      });
    }
  }

  openCreate(){
    console.log("open in app");
    this.openCreateUser.next();
  }

}
