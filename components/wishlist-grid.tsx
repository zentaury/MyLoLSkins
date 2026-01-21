"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { title } from "@/components/primitives";
import { AddToWishlist } from "./add-to-wishlist";
import { Link } from "@nextui-org/link";

export function WishlistGrid() {

    const wishlistSkins = useLiveQuery(() => db.wishlist.toArray());

    if (!wishlistSkins || wishlistSkins.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h1 className={title({ size: "sm" })}>Your Wishlist is Empty</h1>
                <p className="text-default-500 mt-4 max-w-md">
                    Explore champion pages and click the heart icon to save skins you want to acquire later.
                </p>
                <div className="mt-8">
                    <Link href="/" className="text-primary font-medium">Browse Champions</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center py-5">
                <h1 className={title()}>Wishlist</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                {wishlistSkins.map((skin: any) => (
                    <Card key={skin.skinId || skin.key} isFooterBlurred className="h-[auto] w-[auto]">
                        <div className="absolute top-2 right-2 z-20">
                            <AddToWishlist
                                championId={skin.championId || skin.name}
                                championKey={skin.key} // Careful, check if key is championKey or skinKey
                                championName={skin.championName || skin.name}
                                championTitle={""} // Title generally not stored in skin db, maybe optional
                                skinId={skin.skinId}
                                skinNum={skin.skinNum}
                                skinName={skin.skinName}
                                className="bg-black/20 backdrop-blur-md"
                            />
                        </div>
                        <Image
                            isZoomed
                            as={NextImage}
                            className="z-0 w-full h-full object-cover"
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${skin.championId || skin.name}_${skin.skinNum}.jpg`}
                            alt={`Picture of ${skin.skinName}`}
                            width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                            height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
                        />
                        <CardFooter className="absolute bg-black/40 bottom-0 justify-between p-2 sm:p-3 z-10">
                            <div className="w-full">
                                <h4 className="text-white font-semibold text-sm sm:text-base md:text-large capitalize truncate">{skin.skinName}</h4>
                                {skin.rpPrice && (
                                    <p className="text-tiny text-white/80">{skin.rpPrice} RP</p>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
