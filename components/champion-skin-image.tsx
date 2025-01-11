"use client";
import { db } from "@/db/IndexedDB";
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { Card, CardFooter, CardHeader} from "@nextui-org/card";
import { useCallback, useState } from "react";
import { OwnedSkinChecker } from "./owned-skin-checker";
import { useLiveQuery } from "dexie-react-hooks";

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

    const [skin, setSkin]: any = useState([]);
    
    //add skin to db
    const addSkinToList = useCallback(async () => {
        try {
            await db.skins.add({
                key: championKey,
                name: championId,
                title: championTitle,
                skinId: skinId, 
                skinNum: Number(skinNum),
                skinName: skinName
            });
        } catch (error) {
            console.error("error", error);
        }
    }, [championId, championKey, championName, championTitle, skinId, skinNum, skinName]);

        //fetch skin from db by skinId
        useLiveQuery(() => db.skins.where('skinId').equals(skinId).toArray().then((response) => { setSkin(JSON.parse(JSON.stringify(response))) }),
          [skinId, championKey]
        );

    return (
        <Card isFooterBlurred isPressable isHoverable onPress={addSkinToList} className="h-[auto] w-[auto]">
            <CardHeader className="absolute z-10 top-1 flex-col !place-items-end">

                {
                    skin[0] &&
                    <OwnedSkinChecker />
                }
            </CardHeader>
            <Image
                isZoomed
                as={NextImage}
                className="z-0 w-full h-full object-cover"
                src={imageSrc}
                alt={`Picture of ${championName}`}
                width={350}
                height={550}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 justify-between">
                <div>
                    <h4 className="text-white font-semibold text-large">{skinName}</h4>
                </div>
            </CardFooter>
        </Card>
    );
}