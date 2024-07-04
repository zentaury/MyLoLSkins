"use client";
import { db } from "@/db/IndexedDB";
import { Card, CardFooter} from "@nextui-org/card";
import Image from "next/image";
import { useCallback } from "react";

export function ChampionSkinImage({ skinNumber, championName, championId, skinName }: { skinNumber: string, championName: string, championId:string, skinName: string }) {

    let imageSrc = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinNumber}.jpg`;
    
    const addSkinToList = useCallback(async () => {
        if (championName && skinName && skinNumber) {
            await db.skins.add({
                championName: championName,
                championId: championId,
                skinName: skinName,
                skinNumber: skinNumber
            });
        }
    }, [championName, championId, skinName, skinNumber]);

    return (
        <Card isPressable isHoverable onPress={addSkinToList}>
            {/* <CardHeader className="absolute z-10 top-1 flex-col !place-items-end">

            </CardHeader> */}
            <Image
                src={imageSrc}
                alt={`Picture of ${championName}`}
                priority
                fill
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