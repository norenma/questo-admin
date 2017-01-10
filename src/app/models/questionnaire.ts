import {Answer, AnswerSet} from './answer-set';
import {Subscale} from './subscale';
import { Question } from './question';
import {Category} from './category';

export class Questionnaire {

    private _name: string = "";
    private categories: Array<Category> = [];
    private _useSubScale: boolean;
    private _description: string;
    private _sameAnswer: boolean;
    private _answer: string;
    private _id: number;
    private _subscales: Array<Subscale> = [];
    private _answers : Array<AnswerSet> = [];


    constructor(name: string, id: number, useSubScale: boolean, description: string,
        sameAnswer: boolean, answer: string) {
        this._id = id;
        this._name = name;
        this._useSubScale = useSubScale;
        this._description = description;
        this._sameAnswer = sameAnswer;
        this._answer = answer;
    }


	public get $categories(): Array<Category>  {
		return this.categories;
	}


	public set $categories(value: Array<Category> ) {
		this.categories = value;
	}
    
    /**
     * Adds a new category to the questionnaire.
     */
    public addCategory(cat: Category) {
    this.categories.push(cat);
    }

    /**
     * Removes a category from the questionnaire.
     */
    public removeCategory(cat: Category) {
        this.categories = this.categories.filter(tmp => {
            return tmp.id !== cat.id;
        });
    }


    set name(name: string) { this._name = name; }
    get name() { return this._name; }

    set useSubScale(useSubScale: boolean) {
        this._useSubScale = useSubScale;
    }
    get useSubScale() {
        return this._useSubScale;
    }

    set description(description: string) { this._description = description; }
    get description() { return this._description; }

    get sameAnswer(): boolean { return this._sameAnswer; }
    set sameAnswer(value: boolean) { this._sameAnswer = value; }

    get answer(): string { return this._answer; }
    set answer(value: string) { this._answer = value; }

    get id(): number { return this._id; }

    get subscales(): Array<Subscale> {
        return this._subscales;
    }

    set subscales(value: Array<Subscale>) {
        this._subscales = value;
    }


	public get answers(): Array<AnswerSet>  {
		return this._answers;
	}

	public set answers(value: Array<AnswerSet> ) {
		this._answers = value;
	}
    
}
