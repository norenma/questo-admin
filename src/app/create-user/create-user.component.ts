import { ModalDirective } from 'ng2-bootstrap';
import { Component, ViewChild, Input, ViewContainerRef, OnInit } from '@angular/core';
import { HttpQuestionnaireService } from '../questionnaire/http-questionnaire.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;
  @Input() open: Observable<any>;
  createQuestionnaires: boolean = false;
  createUsers: boolean = false;
  password: string = "";
  mail : string = "";
  username: string = "";

  constructor(private viewContainerRef: ViewContainerRef, private http: HttpQuestionnaireService) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {
    this.open.subscribe(() => {
      this.childModal.show();
    });
  }

  public showChildModal(): void {
    console.log("show");
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  create() {
    this.http.createUser(this.mail, this.username, this.password, this.createUsers, this.createQuestionnaires).then(res => {
      console.log(res);
    });;
  }

}
