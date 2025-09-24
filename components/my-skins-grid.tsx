"use client";
import { getAllChampionsList } from "@/app/api/dataDragonAPI";
import { db } from "@/db/IndexedDB";
import { Input } from "@nextui-org/input";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import OptimizedAdBanner from "./optimized-ad-banner";
import { SkinsCollectionStats } from "./skins-collection-stats";
import { RPPriceEditor } from "./rp-price-editor";



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
            (champion: any) => champion[1].name.toLowerCase().includes(searchText.toLowerCase())
        );
    };
    const filteredChampionList: any = searchChampionFilter(championsArrayList);

    let championKey = [0];
    championKey = filteredChampionList?.map((champion: any) => champion[1].key)

    //filtering skin by skin key and champion key
    const filteredSkins = searchText.length === 0 ? skins : skins?.filter((skin: any) => skin.key.includes(championKey[0]));

    //delete skin from db by skinId
            const deleteSkinOwned = useCallback(async (id:number) => {
            await db.skins.delete(id);
            console.warn("Skin Deleted From Collection");
          }, [])

    useEffect(() => {
        fetchAllChampios();
    }, []);

    return (
        <div id="container" className="w-full">
            <h1 className={title()}>My Skins</h1>
            <div className="py-5"></div>
            <SkinsCollectionStats/>
            <Input id="championNameInput" className="py-5 w-[auto]" type="text" label="Find Champion" placeholder="Champion Name" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <OptimizedAdBanner 
                slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_MY_SKINS || ""}
                className="py-5"
            />
            <div id="gridContainer" className="py-10 grid grid-cols-4 gap-4">
                {filteredSkins?.map((champion: any, index: number) => {
                    return (
                        <Card id="mySkinsCard" key={index} isFooterBlurred isHoverable className="h-[auto] w-[auto]">
                            <Image
                                isZoomed
                                as={NextImage}
                                priority={true}
                                className="z-0 w-full h-full object-cover"
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${champion.skinNum}.jpg`}
                                alt={`Picture of ${champion.name}`}
                                width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                                height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 flex-col gap-2">
                                <div className="w-full flex justify-between items-center">
                                    <h4 className="text-white font-semibold text-large">{champion.skinName}</h4>
                                    <Button color="danger" variant="ghost" radius="full" size="sm" onPress={() => deleteSkinOwned(champion.id)} >Remove</Button>
                                </div>
                                <div className="w-full flex justify-center">
                                    <RPPriceEditor
                                        skinId={champion.id}
                                        currentPrice={champion.rpPrice}
                                        skinName={champion.skinName}
                                        onPriceUpdate={(newPrice) => {
                                            // Actualizar el estado local para reflejar el cambio inmediatamente
                                            setSkins((prevSkins: any) => 
                                                prevSkins.map((skin: any) => 
                                                    skin.id === champion.id 
                                                        ? { ...skin, rpPrice: newPrice }
                                                        : skin
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </CardFooter>
                        </Card>
                    );

                })}
            </div>
        </div>
    );
}
