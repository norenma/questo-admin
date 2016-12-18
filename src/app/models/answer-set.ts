import { MediaFile } from './media-file';
export class AnswerSet {
    private _name: string;
    private _id: number;
    private _answers: Array<Answer>;


    constructor(name: string, id: number, $answers: Array<Answer>) {
        this._name = name;
        this._id = id;
        this.answers = $answers;
    }


    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get answers(): Array<Answer> {
        return this._answers;
    }

    public set answers(value: Array<Answer>) {
        this._answers = value;
    }


    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }


}
export class Answer {

    private _label: string;
    private _value: number;
    private _id: number;
    private _audio: MediaFile;



    constructor(label: string, value: number, id: number, audio: MediaFile) {
        this._label = label;
        this._value = value;
        this._id = id;
        this._audio = audio;
    }


    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get audio(): MediaFile {
        return this._audio;
    }

    public set audio(value: MediaFile) {
        this._audio = value;
    }


}