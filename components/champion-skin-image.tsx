"use client";
import { db } from "@/db/IndexedDB";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { useCallback, useEffect, useState } from "react";
import { OwnedSkinChecker } from "./owned-skin-checker";
import { useLiveQuery } from "dexie-react-hooks";
import { Champion } from "@/app/interfaces/champion-interface";
import { AddToWishlist } from "./add-to-wishlist";

export function ChampionSkinImage({ championId, championKey, championName, championTitle, skinId, skinNum, skinName }: Champion) {
    const [mounted, setMounted] = useState(false);

    let imageSrc = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skinNum}.jpg`;

    // Usar useLiveQuery directamente sin useState adicional
    const skin = useLiveQuery(
        () => db.skins.where('skinId').equals(skinId).first(),
        [skinId]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    //add skin to db
    const addSkinToList = useCallback(async () => {
        try {
            const existingSkin = await db.skins.where("skinId").equals(skinId).first();
            if (!existingSkin) {
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

    const handleCardClick = (e: React.MouseEvent) => {
        // Solo agregar si no se clickeó en un botón o tooltip
        const target = e.target as HTMLElement;
        if (!target.closest('button') && !target.closest('[role="tooltip"]')) {
            addSkinToList();
        }
    };

    return (
        <div onClick={handleCardClick} className="cursor-pointer">
        <Card isFooterBlurred isHoverable className="h-[auto] w-[auto]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-end w-full">
                <div className="flex flex-col gap-2 items-end">
                    {mounted && skin && <OwnedSkinChecker />}
                    {mounted && !skin && (
                        <AddToWishlist
                            championId={championId}
                            championKey={championKey}
                            championName={championName}
                            championTitle={championTitle}
                            skinId={skinId}
                            skinNum={skinNum}
                            skinName={skinName}
                        />
                    )}
                </div>
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
            <CardFooter className="absolute bg-black/40 bottom-0 justify-between p-2 sm:p-3">
                <div className="w-full">
                    <h4 className="text-white font-semibold text-sm sm:text-base md:text-large capitalize truncate">{skinName}</h4>
                </div>
            </CardFooter>
        </Card>
        </div>
    );
}
