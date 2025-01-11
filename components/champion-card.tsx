"use client";

import Link from "next/link";
import { Card, CardHeader } from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { ChampionCardProps } from "@/app/interfaces/champion-card-interface";

export function ChampionCard({ name, title, skinNumber }: ChampionCardProps) {

    return (
        <Link href={name}>
            <Card isPressable isHoverable onPress={() => { }} className="h-[auto] w-[auto]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
                    <h4 className="text-white font-medium text-large">{name}</h4>
                </CardHeader>
                <Image
                    isZoomed
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${skinNumber}.jpg`}
                    width={300}
                    height={350}
                />
            </Card>
        </Link>
    );
};