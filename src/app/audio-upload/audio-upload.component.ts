import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';



const URL = 'http://virt09.itu.chalmers.se/api/media_files';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})
export class AudioUploadComponent implements OnInit {

  @Output() done = new EventEmitter();

  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object;
  sizeLimit = 2000000;



  public uploader: FileUploader = new FileUploader({ url: URL });

  ngOnInit() {
    this.uploader.onCompleteItem = (item, response, status, header) => {
      if (status === 200) {
        //Your code goes here
      }
      console.log("HEj", JSON.parse(response));
      let resp = JSON.parse(response);
      this.done.emit(resp);
    }
    this.uploader.autoUpload = true;
    this.uploader.options.autoUpload = true;
    console.log("UPLOADER", this.uploader);
  }

  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


    /* handleUpload(data): void {
       console.log(data);
       if (data && data.response) {
         data = JSON.parse(data.response);
         console.log("res", data);
         this.uploadFile = data;
         this.done.emit(data);
         console.log("EMIT");
       }
     }
   
     fileOverBase(e: any): void {
       this.hasBaseDropZoneOver = e;
     }
   
     beforeUpload(uploadingFile): void {
       if (uploadingFile.size > this.sizeLimit) {
         uploadingFile.setAbort();
         alert('File is too large');
       }
     }*/
  }
