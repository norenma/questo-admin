export class Result {
    private _id: number;
    private _nbrAnswers: number;
    private _lastAnswer: string;
    private _selected: boolean;
    

	constructor(id: number, nbrAnswers: number, lastAnswer: string, selected: boolean) {
		this._id = id;
		this._nbrAnswers = nbrAnswers;
		this._lastAnswer = lastAnswer;
        this._selected = selected;
	}


	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

	public get nbrAnswers(): number {
		return this._nbrAnswers;
	}

	public set nbrAnswers(value: number) {
		this._nbrAnswers = value;
	}

	public get lastAnswer(): string {
		return this._lastAnswer;
	}

	public set lastAnswer(value: string) {
		this._lastAnswer = value;
	}

	public get selected(): boolean {
		return this._selected;
	}

	public set selected(value: boolean) {
		this._selected = value;
	}
    
    
    

}