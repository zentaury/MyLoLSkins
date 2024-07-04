"use client";
import { db } from "@/db/IndexedDB";
import {Image} from "@nextui-org/image";
import { Card, CardFooter} from "@nextui-org/card";
import { useCallback } from "react";

interface Champion {
    championId: string,
    championKey: string, 
    championName: string,
    championTitle: string, 
    skinId:string, 
    skinNum:string, 
    skinName:string
} 

export function ChampionSkinImage({championId, championKey, championName, championTitle, skinId, skinNum, skinName}:Champion) {

    let imageSrc = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skinNum}.jpg`;
    
    const addSkinToList = useCallback(async () => {
        try {
            await db.skins.add({
                key: championKey,
                name: championName,
                title: championTitle,
                skin: [{
                    id: skinId, 
                    num: Number(skinNum),
                    name: skinName
                }]
            });
        } catch (error) {
            console.error("error", error);
        }
    }, [championId, championKey, championName, championTitle, skinId, skinNum, skinName]);

    return (
        <Card isFooterBlurred isPressable isHoverable onPress={addSkinToList} className="h-[auto] w-[auto]">
            {/* <CardHeader className="absolute z-10 top-1 flex-col !place-items-end">

            </CardHeader> */}
            <Image
                isZoomed
                className="z-0 w-full h-full object-cover"
                src={imageSrc}
                alt={`Picture of ${championName}`}
                width={300}
                height={350}
            >
            </Image>
            <CardFooter className="absolute bg-black/40 bottom-0 justify-between">
                <div>
                    <h4 className="text-white font-semibold text-large">{skinName}</h4>
                </div>
            </CardFooter>
        </Card>
    );
}