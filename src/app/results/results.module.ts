import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ResultsService } from './results.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './result-list/result-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

  ],
  declarations: [ResultListComponent],
  providers: [ResultsService],
  exports: [ResultListComponent]
})
export class ResultsModule { }
