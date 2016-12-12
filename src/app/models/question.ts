import { MediaFile } from './media-file';
export class Question {

    private _name: string;
    private _id: number;
    private _subScale: any;
    private _answer: any;
    private _image: MediaFile;
    private _audio: MediaFile;



    constructor(name: string, id: number, subScale: any, answer: any,
        image?: string, sound?: string) {
        this._name = name;
        this._id = id;
        this._subScale = subScale;
        this._answer = answer;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    public get subScale(): any { return this._subScale; }
    public set subScale(value: any) { this._subScale = value; }

    public get answer(): any { return this._answer; }
    public set answer(value: any) { this._answer = value; }

    public get image(): MediaFile { return this._image; }
    public set image(value: MediaFile) { this._image = value; }

    public get audio(): MediaFile { return this._audio; }
    public set audio(value: MediaFile) { this._audio = value; }

}

