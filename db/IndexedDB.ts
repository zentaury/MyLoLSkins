import Dexie, { Table } from "dexie";

export interface Skin {
    id?: number,
    key: string,
    name: string,
    title: string,
    skin: [
        {
            id: string,
            num: number,
            name: string
        }
    ]

}

export class DB extends Dexie{
    skins!: Table<Skin>;
    constructor(){
        super('mylolskins');
        this.version(1).stores({
            skins: '++id,championName,championId,skinName,skinNumber'
        });
    }
};

export const db = new DB();
