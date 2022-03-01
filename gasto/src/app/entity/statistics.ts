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

    public fromStoreData(statObject: any, category: string) {
        this.name = category;
        this.count = statObject["count"];
        this.amount = statObject["amount"];
        return this;
    }
}