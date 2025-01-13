import Dexie, { Table } from "dexie";

export interface Skin {
    id?: number,
    key: string,
    name: string,
    title: string,
    skinId: string,
    skinNum: number,
    skinName: string

}

export class DB extends Dexie{
    skins!: Table<Skin>;
    constructor(){
        super('mylolskins');
        this.version(1).stores({
            skins: '++id,key,championName,championId,skinId,skinNum,skinName'
        });
    }
};

export const db = new DB();
