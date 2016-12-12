import {Output, Component, OnInit, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

    @Input() type: string;
    @Input() id: number;
    @Output() done = new EventEmitter();

    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object;
    sizeLimit = 2000000;

    ngOnInit() {
        console.log("type", this.type);
        console.log("id", this.id);
        this.options = {
            url: 'http://0.0.0.0:3000/api/' + this.type + 's/upload_image',
            data: { 'id': this.id }
        };
    }
    handleUpload(data): void {
        console.log(data);
        if (data && data.response) {
            data = JSON.parse(data.response);
            console.log("res", data);
            this.uploadFile = data;
            this.done.emit();
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
    }
}
