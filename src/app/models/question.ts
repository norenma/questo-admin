import { Answer, AnswerSet } from './answer-set';
import { Subscale } from './subscale';
import { MediaFile } from './media-file';
export class Question {

    private _name: string;
    private _id: number;
    private _subScale: Subscale;
    private _answer: AnswerSet;
    private _image: MediaFile;
    private _audio: MediaFile;
    private _catId: number;
    private _order: number;



    constructor(name: string, id: number, subScale: any, answer: any, order: number,
        image?: string, sound?: string) {
        this._name = name;
        this._id = id;
        this._subScale = subScale;
        this._answer = answer;
        this._order = order;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    public get subScale(): Subscale { return this._subScale; }
    public set subScale(value: Subscale) { this._subScale = value; }

    public get answer(): AnswerSet { return this._answer; }
    public set answer(value: AnswerSet) { this._answer = value; }

    public get image(): MediaFile { return this._image; }
    public set image(value: MediaFile) { this._image = value; }

    public get audio(): MediaFile { return this._audio; }
    public set audio(value: MediaFile) { this._audio = value; }

    public get catId(): number {
        return this._catId;
    }

    public set catId(value: number) {
        this._catId = value;
    }


	public get order(): number {
		return this._order;
	}

	public set order(value: number) {
		this._order = value;
	}
    

}

