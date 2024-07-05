"use client";

import { getAllChampionsList } from "@/app/api/dataDragonAPI";
import { db } from "@/db/IndexedDB";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";


export function MySkinsGrid() {

    const [champions, setChampions] = useState([]);
    const [skins, setSkins]: any = useState();
    const [searchText, setSearchText] = useState("");

    const championsArrayList: any = Object.entries(champions);

    useLiveQuery(() => db.skins.toArray().then((response) => { setSkins(JSON.parse(JSON.stringify(response))) }));
    // const skinList = useLiveQuery(() => db.skins.toArray());
    const fetchAllChampios = async () => {
        let championsList = await getAllChampionsList();
        await setChampions(championsList);
    }

    const searchChampionFilter = (championList: any) => {
        return championList.filter(
            (champion: any) => champion[0].toLowerCase().includes(searchText.toLowerCase())
        );
    };
    const filteredChampionList:any = searchChampionFilter(championsArrayList);

    let championKey = [0];
    championKey = filteredChampionList?.map((champion:any) => champion[1].key)

    console.log(championKey[0]);  

    const filteredSkins = searchText.length === 0 ? skins :  skins?.filter((skin: any) => skin.key.includes(championKey[0]));

    useEffect(() => {
        fetchAllChampios();
    }, []);

    return (
        <div>
            <div>
                <Input id="championNameInput" className="py-5" type="text" label="Find Champion" placeholder="Find your Champion" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            {filteredSkins?.map((champion: any, index: number) => {
                // console.log(champion);
                return (
                    <div key={champion.id} className="">
                        <h1>{champion.skin[0].name}</h1>
                    </div>
                );
            })}

        </div>
    );
}