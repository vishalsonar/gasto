import { Timestamp } from "firebase/firestore";
import { Message } from "../service/message";
import { Utility } from "../service/utility";
declare function showErrorMessage(message: any): any;

export class Record {

    private date?: Date;
    private latitude?: string;
    private longitude?: string;
    private amount?: string;
    private category?: string;

    constructor() {
        this.loadLocation();
    }

    public async loadLocation() {
        await navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude.toString(); 
            this.longitude = position.coords.longitude.toString();
        }, (error) => {
            showErrorMessage(Message.unable_to_load_location);
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

    public getCategory() {
        return this.category;
    }

    public build() {
        this.date = new Date();
        return this;
    }

    public setAmount(amount: string) {
        this.amount = amount;
        return this;
    }

    public setCategory(category: string) {
        this.category = category;
        return this;
    }

    public convertToStoreData() {
        const data = {
            "date": this.date,
            "latitude": this.latitude,
            "longitude": this.longitude,
            "amount": this.amount,
            "category": this.category
        };
        return {
            "data": Utility.encrypt(JSON.stringify(data)),
            "timestamp": Timestamp.now()
        };
    }

    public convertToDisplayRecord(record: string) {
        const data = JSON.parse(Utility.decrypt(record));
        if (data) {
            this.date = new Date(data["date"]);
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.amount = data["amount"];
            this.category = data["category"];
        }
        return this;
    }
}