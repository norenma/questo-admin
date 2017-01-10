import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {AudioUploadComponent} from '../audio-upload/audio-upload.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Ng2UploaderModule } from 'ng2-uploader';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';



@NgModule({
  imports: [
    CommonModule,
    Ng2UploaderModule,
  ],
  declarations: [ImageUploadComponent,
    AudioUploadComponent, FileSelectDirective, FileDropDirective],
  exports: [AudioUploadComponent, ImageUploadComponent]
})
export class MediaUploadModule { }
