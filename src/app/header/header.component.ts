import { HttpQuestionnaireService } from '../questionnaire/http-questionnaire.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() openCreateUser = new EventEmitter();

  constructor(private http: HttpQuestionnaireService, private router: Router
  ) { }

  ngOnInit() {
    
  }

  get userName() {
    return this.http.$userName;
  }

  home(){
    this.router.navigate(['/questionnaires'])
  }

  logout() {
    this.http.logout().then(res => {
      this.router.navigate(['']);
    });
  }

  onLogin(){
    return this.router.url === '/';
  }

  createUser(){
    this.openCreateUser.emit();
  }
}
