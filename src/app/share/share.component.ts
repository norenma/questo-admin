import { Component, ViewChild, ViewContainerRef } from '@angular/core';

// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap';
// webpack html imports

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(private viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }
}

