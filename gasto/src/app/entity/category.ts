import { Utility } from "../service/utility";

export class Category {

    private list?: string[];
    private doUpdate?: boolean;

    constructor() {
        this.doUpdate = false;
        this.list = [];
    }

    public getList() {
        return this.list;
    }

    public setList(list: string[]) {
        this.list = list;
        return this;
    }

    public getDoUpdate() {
        return this.doUpdate;
    }

    public setDoUpdate(doUpdate: boolean) {
        this.doUpdate = doUpdate;
        return this;
    }

    public convertToStoreData() {
        return {
            "data": Utility.encrypt(JSON.stringify(this.list))
        };
    }

    public convertToDisplayCategory(category: string) {
        const data = JSON.parse(Utility.decrypt(category));
        if (data) {
            this.list = data
        }
        return this;
    }
}