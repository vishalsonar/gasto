export class Record {

    private date?: string;
    private time?: string;
    private latitude?: string;
    private longitude?: string;
    private amount?: string;
    private comment?: string

    constructor() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude.toString(); 
            this.longitude = position.coords.longitude.toString();
        });
    }

    public getDate() {
        return this.date;
    }

    public getTime() {
        return this.time;
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
        const colon = ":";
        const zero_zero = "00";
        const hypen = "-";
        const date = new Date();
        this.date = (zero_zero + date.getDate()).slice(-2) + hypen + (zero_zero + (date.getMonth() + 1)).slice(-2) + hypen + date.getFullYear();
        this.time = (zero_zero + date.getHours()).slice(-2) + colon + (zero_zero + date.getMinutes()).slice(-2) + colon + (zero_zero + date.getSeconds()).slice(-2);
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
        return {
            "time": this.time,
            "latitude": this.latitude,
            "longitude": this.longitude,
            "amount": this.amount,
            "comment": this.comment
        };
    }
}