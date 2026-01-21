import Dexie, { Table } from "dexie";

export interface Skin {
    id?: number,
    key: string,
    name: string,
    title: string,
    skinId: string,
    skinNum: number,
    skinName: string,
    rpPrice?: number,
    rarity?: string,        // Community Dragon rarity (kEpic, kLegendary, etc.)
    isBase?: boolean        // True if it's the default skin
}

export class DB extends Dexie {
    skins!: Table<Skin>;
    wishlist!: Table<Skin>;
    constructor() {
        super('mylolskins');
        this.version(1).stores({
            skins: '++id,key,championName,championId,skinId,skinNum,skinName'
        });
        this.version(2).stores({
            skins: '++id,key,championName,championId,skinId,skinNum,skinName,rpPrice'
        });
        this.version(3).stores({
            wishlist: '++id,key,championName,championId,skinId,skinNum,skinName,rpPrice'
        });
        this.version(4).stores({
            skins: '++id,key,championName,championId,skinId,skinNum,skinName,rpPrice,rarity,isBase',
            wishlist: '++id,key,championName,championId,skinId,skinNum,skinName,rpPrice,rarity,isBase'
        });
    }
};

export const db = new DB();
