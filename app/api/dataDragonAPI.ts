import { db } from "@/db/IndexedDB";
import { useLiveQuery } from "dexie-react-hooks";

const DATA_DRAGON_API="https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US"
// https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion/Aatrox.json

export async function getAllChampionsList() {
    const response = await fetch(DATA_DRAGON_API + "/champion.json");
    const data = await response.json();
    return data.data;
}

export async function getChampionData(championName:string){
    const response = await fetch(DATA_DRAGON_API + `/champion/${championName}.json`);
    const data = response.json();
    return data;
}