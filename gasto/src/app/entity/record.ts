import { Utility } from "../service/utility";

export class Record {

    private date?: Date;
    private latitude?: string;
    private longitude?: string;
    private amount?: string;
    private comment?: string;

    constructor() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude.toString(); 
            this.longitude = position.coords.longitude.toString();
        });
    }

    public getDate() {
        return this.date;
    }

    public getLatitude() {
        return this.latitude;
    }

    public getLongitude() {
        return this.longitude;
    }

    public getAmount() {
        return this.amount;
    }

    public getComment() {
        return this.comment;
    }

    public build() {
        this.date = new Date();
        return this;
    }

    public setAmount(amount: string) {
        this.amount = amount;
        return this;
    }

    public setComment(comment: string) {
        this.comment = comment;
        return this;
    }

    public convertToStoreData() {
        const data = {
            "date": this.date,
            "latitude": this.latitude,
            "longitude": this.longitude,
            "amount": this.amount,
            "comment": this.comment
        };
        return {
            "data": Utility.encrypt(JSON.stringify(data))
        };
    }

    public convertToDisplayRecord(record: string) {
        const data = JSON.parse(Utility.decrypt(record));
        if (data) {
            this.date = new Date(data["date"]);
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.amount = data["amount"];
            this.comment = data["comment"];
        }
        return this;
    }

    public inRange(startDate: Date, endDate: Date) {
        let state: boolean = false;
        if (this.date) {
            if (startDate <= this.date && endDate >= this.date) {
                state = true;
            }
        }
        return state;
    }
}