"use client";
import { getAllChampionsList } from "@/app/api/dataDragonAPI";
import { db } from "@/db/IndexedDB";
import { Input } from "@nextui-org/input";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";


export function MySkinsGrid() {

    const [champions, setChampions] = useState([]);
    const [skins, setSkins]: any = useState([]);
    const [searchText, setSearchText] = useState("");

    const championsArrayList: any = Object.entries(champions);

    useLiveQuery(() => db.skins.toArray().then((response) => { setSkins(JSON.parse(JSON.stringify(response))) }));

    const fetchAllChampios = async () => {
        let championsList = await getAllChampionsList();
        await setChampions(championsList);
    }

    //filtering champion by input text
    const searchChampionFilter = (championList: any) => {
        return championList.filter(
            (champion: any) => champion[0].toLowerCase().includes(searchText.toLowerCase())
        );
    };
    const filteredChampionList: any = searchChampionFilter(championsArrayList);

    let championKey = [0];
    championKey = filteredChampionList?.map((champion: any) => champion[1].key)

    //filtering skin by skin key and champion key
    const filteredSkins = searchText.length === 0 ? skins : skins?.filter((skin: any) => skin.key.includes(championKey[0]));

    useEffect(() => {
        fetchAllChampios();
    }, []);

    return (
        <div id="container" className="w-full">
            <h1 className={title()}>My Skins</h1>
            <Input id="championNameInput" className="py-5 w-[auto]" type="text" label="Find Champion" placeholder="Find your Champion" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <div id="gridContainer" className="w-max py-10 grid grid-cols-4 gap-4">
                {filteredSkins?.map((champion: any, index: number) => {
                    return (
                        <Card id="mySkinsCard" key={index} isFooterBlurred isPressable isHoverable className="h-[auto] w-[auto]">
                            <Image
                                isZoomed
                                className="z-0 w-full h-full object-cover"
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${champion.skinNum}.jpg`}
                                alt={`Picture of ${champion.name}`}
                                width={300}
                                height={350}
                            >
                            </Image>
                            <CardFooter className="absolute bg-black/40 bottom-0 justify-between">
                                <h4 className="text-white font-semibold text-large">{champion.skinName}</h4>
                            </CardFooter>
                        </Card>
                    );

                })}
            </div>
        </div>
    );
}