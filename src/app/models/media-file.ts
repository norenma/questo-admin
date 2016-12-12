export class MediaFile {

    private _id: number;
    private _url: string;


    constructor(id: number, url: string) {
        this._id = id;
        this._url = url;
    }


    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get url(): string {
        return this._url;
    }

    public set url(value: string) {
        this._url = value;
    }


}