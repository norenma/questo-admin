import { ResultsService } from '../results.service';
import { Component, OnInit, Input } from '@angular/core';

declare var window;

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  @Input() questionnaireId: number;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.resultsService.fetchResults();
    /*    this.sub = this.route.params.subscribe(params => {
          this.id = +params['id'];
          this.http.getQuestionnaire(this.id).then(data => {
            this.questionnaire = this.createQuestionnaire(data);
            console.log("Questionnaire", this.questionnaire);
          });
        });*/
  }

  get results() {
    return this.resultsService.result;
  }

  download(id: any) {
    console.log("download");
    let resultIds = this.results.filter(result => {return result.selected})
    .map(result => {return result.id});
    this.resultsService.download(resultIds).then((res: any) => {
      console.log(res);
      var blob = new Blob([res._body], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  isAllTrue() {
    let result = true;
    this.results.forEach(r => {
      if (!r.selected) result = false;
    });
    return result;
  }

  setAllTrue(changed) {
    console.log(changed);
    if(changed){
      this.results.forEach(r => {r.selected = true});
    }
  }

}
