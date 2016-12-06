import { Question } from './question';

export class Category {
    private _id: number;
    private _name: string;
    private _description: string;
    private _questions: Array<Question> = [];
    private _image: HTMLImageElement;
    private _sound: HTMLAudioElement;
    private _order: number;



    constructor(id: number, name: string, description: string, order: number,
        image?: HTMLImageElement, sound?: HTMLAudioElement) {
        this._id = id;
        this._name = name;
        this._description = description;
    }


    /**
     * Adds a new question to the category.
     */
    public addQuestion(q: Question) {
        this.questions.push(q);
    }

    /**
     * Removes a question from the category.
     */
    public removeQuestion(q: Question) {
        this.questions = this.questions.filter(tmp => {
            return tmp.id !== q.id;
        });
    }

    public get id(): number { return this._id; }
    public set id(value: number) { this._id = value; }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get description(): string { return this._description; }
    public set description(value: string) { this._description = value; }

    public get sound(): HTMLAudioElement { return this._sound; }
    public set sound(value: HTMLAudioElement) { this._sound = value; }

    public get image(): HTMLImageElement { return this._image; }
    public set image(value: HTMLImageElement) { this._image = value; }

    public get order(): number { return this._order; }
    public set order(value: number) { this._order = value; }

    public get questions(): Array<Question> { return this._questions; }
    public set questions(value: Array<Question>) { this._questions = value; }

}
