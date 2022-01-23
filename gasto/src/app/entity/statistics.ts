import { Utility } from "../service/utility";

export class Statistics {

    private name?: string;
    private count?: string;
    private amount?: string;

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setCount(count: string) {
        this.count = count;
        return this;
    }

    public setAmount(amount: string) {
        this.amount = amount;
        return this;
    }

    public getName() {
        return this.name;
    }

    public getCount() {
        return this.count;
    }

    public getAmount() {
        return this.amount;
    }

    public convertRecord(record: any) {
        const data = JSON.parse(Utility.decrypt(record));
        if (data) {
            this.count = "1";
            this.amount = data["amount"];
            this.name = data["category"];
        }
        return this;       
    }

    public update(statistics: Statistics) {
        this.count = String(Number(statistics.getCount()) + 1);
        const statAmount = statistics.getAmount();
        if (this.amount && statAmount) {
            const total = parseFloat(this.amount) + parseFloat(statAmount);
            this.amount = String(total);
        }
    }
}