"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { ChampionCardProps } from "@/app/interfaces/champion-card-interface";

export function ChampionCard({ championKey, name, title, skinNumber, ownedCount, priority = false }: ChampionCardProps) {
    const router = useRouter();
    const isOwned = ownedCount !== undefined && ownedCount > 0;

    return (
        <Card
            isPressable
            isHoverable
            onPress={() => router.push(`/${championKey}`)}
            className={clsx(
                "border-none cursor-pointer overflow-hidden transition-all duration-300",
                isOwned && [
                    "ring-1 ring-[#C89B3C]",
                    "shadow-[0_0_18px_rgba(200,155,60,0.35)]",
                ]
            )}
            radius="lg"
        >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start w-full">
                {isOwned && (
                    <div className="absolute top-0 right-0 z-20 m-2">
                        <Chip
                            size="sm"
                            variant="flat"
                            className="text-tiny font-bold shadow-lg bg-[#C89B3C]/20 border border-[#C89B3C]/60 text-[#C89B3C]"
                        >
                            {ownedCount} OWNED
                        </Chip>
                    </div>
                )}
                <p className="text-tiny text-white/60 uppercase font-bold tracking-widest">{title}</p>
                <h4 className="text-white font-display font-bold text-large">{name}</h4>
            </CardHeader>
            <Image
                isZoomed
                as={NextImage}
                priority={priority}
                alt={`${name} - ${title}`}
                className="z-0 w-full h-full object-cover"
                classNames={{
                    wrapper: "w-full h-full",
                    img: "w-full h-full object-cover"
                }}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_${skinNumber}.jpg`}
                width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
            />
        </Card>
    );
}
