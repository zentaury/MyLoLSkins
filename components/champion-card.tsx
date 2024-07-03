"use client";

import Link from "next/link";
import { title } from "./primitives";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Children } from "react";
import Image from "next/image";

export function ChampionCard({ name, title, skinNumber }: ChampionCardProps) {

    return (
        <Link href={name}>
            <Card isPressable isHoverable onPress={() => { }} className="col-span-12 sm:col-span-4 h-[350px] w-[250px]">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">{title}</p>
                    <h4 className="text-white font-medium text-large">{name}</h4>
                </CardHeader>
                <Image
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${skinNumber}.jpg`}
                    height={350}
                    width={250}
                />
            </Card>
        </Link>
    );
};