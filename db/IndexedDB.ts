import Dexie, { Table } from "dexie";

export interface Skin {
    id?: number,
    championName: string,
    skinName: string;
    skinNumber: string

}

export class DB extends Dexie{
    skins!: Table<Skin>;
    constructor(){
        super('mylolskins');
        this.version(1).stores({
            skins: '++id,championName,skinName,skinNumber'
        });
    }
};

export const db = new DB();
