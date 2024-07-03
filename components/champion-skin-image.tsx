"use client";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";

export function ChampionSkinImage({ skinNumber, championName, skinName }: { skinNumber: string, championName: string, skinName: string }) {
    return (
        <Card isPressable isHoverable onPress={() => { }}>
            {/* <CardHeader className="absolute z-10 top-1 flex-col !place-items-end">

            </CardHeader> */}
            <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinNumber}.jpg`}
                alt={`Picture of ${championName}`}
                width={300}
                height={350}
                priority
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