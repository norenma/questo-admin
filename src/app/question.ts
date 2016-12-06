export class Question {

    private _name: string;
    private _id: number;
    private _subScale: any;
    private _answer: any;
    private _image: HTMLImageElement;
    private _sound: HTMLAudioElement;



    constructor(name: string, id: number, subScale: any, answer: any, image?: HTMLImageElement, sound?: HTMLAudioElement) {
        this._name = name;
        this._id = id;
        this._subScale = subScale;
        this._answer = answer;
        this._image = image;
        this._sound = sound;
    }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    public get subScale(): any { return this._subScale; }
    public set subScale(value: any) { this._subScale = value; }

    public get answer(): any { return this._answer; }
    public set answer(value: any) { this._answer = value; }

    public get sound(): HTMLAudioElement { return this._sound; }
    public set sound(value: HTMLAudioElement) { this._sound = value; }

    public get image(): HTMLImageElement { return this._image; }
    public set image(value: HTMLImageElement) { this._image = value; }


}

