"use client";
import { db } from "@/db/IndexedDB";
import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { Card, CardFooter, CardHeader} from "@nextui-org/card";
import { useCallback } from "react";
import { OwnedSkinChecker } from "./owned-skin-checker";
import { useLiveQuery } from "dexie-react-hooks";
import { Champion } from "@/app/interfaces/champion-interface";

export function ChampionSkinImage({championId, championKey, championName, championTitle, skinId, skinNum, skinName}:Champion) {

    let imageSrc = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skinNum}.jpg`;

    // Usar useLiveQuery directamente sin useState adicional
    const skin = useLiveQuery(
        () => db.skins.where('skinId').equals(skinId).first(),
        [skinId]
    );
    
    //add skin to db
    const addSkinToList = useCallback(async () => {
        try {
            const existingSkin = await db.skins.where("skinId").equals(skinId).first();
            if(!existingSkin){
                await db.skins.add({
                    key: championKey,
                    name: championId,
                    title: championTitle,
                    skinId: skinId, 
                    skinNum: Number(skinNum),
                    skinName: skinName
                });
            }
        } catch (error) {
            console.error("error", error);
        }
    }, [championId, championKey, championName, championTitle, skinId, skinNum, skinName]);

    return (
        <Card isFooterBlurred isPressable isHoverable onPress={addSkinToList} className="h-[auto] w-[auto]">
            <CardHeader className="absolute z-10 top-1 flex-col !place-items-end">

                {
                    skin &&
                    <OwnedSkinChecker />
                }
            </CardHeader>
            <Image
                isZoomed
                as={NextImage}
                className="z-0 w-full h-full object-cover"
                src={imageSrc}
                alt={`Picture of ${championName}`}
                width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 justify-between">
                <div>
                    <h4 className="text-white font-semibold text-large capitalize">{skinName}</h4>
                </div>
            </CardFooter>
        </Card>
    );
}
