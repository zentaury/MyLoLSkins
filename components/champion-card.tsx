"use client";

import Link from "next/link";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Chip } from "@nextui-org/chip";
import { ChampionCardProps } from "@/app/interfaces/champion-card-interface";

export function ChampionCard({ championKey, name, title, skinNumber, ownedCount }: ChampionCardProps) {

    return (
        <Link href={championKey}>
            <Card isPressable isHoverable onPress={() => { }} className="border-none" radius="lg">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start w-full">
                    {ownedCount !== undefined && ownedCount > 0 && (
                        <div className="absolute top-0 right-0 z-20 m-2">
                            <Chip size="sm" color="warning" variant="solid" className="text-tiny font-bold shadow-lg">
                                {ownedCount} OWNED
                            </Chip>
                        </div>
                    )}
                    <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
                    <h4 className="text-white font-medium text-large">{name}</h4>
                </CardHeader>
                <Image
                    isZoomed
                    as={NextImage}
                    priority={true}
                    alt="Card background"
                    className="z-0 w- h-full object-cover"
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_${skinNumber}.jpg`}
                    width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                    height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
                />
            </Card>
        </Link>
    );
};