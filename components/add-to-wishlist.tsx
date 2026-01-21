"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";
import { HeartFilledIcon } from "@/components/icons";
import { Champion } from "@/app/interfaces/champion-interface";

interface AddToWishlistProps extends Champion {
    className?: string;
}

export function AddToWishlist({ championId, championKey, championName, championTitle: _championTitle, skinId, skinNum, skinName, className }: AddToWishlistProps) {
    const [mounted, setMounted] = useState(false);

    // Check if skin is in wishlist
    const inWishlist = useLiveQuery(
        () => db.wishlist.where('skinId').equals(skinId).count(),
        [skinId]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAdded = mounted && (inWishlist || 0) > 0;

    const toggleWishlist = async () => {
        try {
            if (isAdded) {
                // Find and delete
                const item = await db.wishlist.where("skinId").equals(skinId).first();
                if (item && item.id) {
                    await db.wishlist.delete(item.id);
                }
            } else {
                // Add
                await db.wishlist.add({
                    key: championKey,
                    championName: championName, // Note: DB schema might expect 'name' as championName based on previous skin logic, let's check Skin interface
                    championId: championId,
                    skinId: skinId,
                    skinNum: Number(skinNum),
                    skinName: skinName,
                    // We might want to fetch and store rpPrice too if available in props, but interface doesn't strictly require it yet for just adding.
                    // Ideally we should pass price to this component if we want to filter by price later.
                } as any);
            }
        } catch (error) {
            console.error("Failed to toggle wishlist", error);
        }
    };

    return (
        <Tooltip content={isAdded ? "Already in Wishlist" : "Add to Wishlist"}>
            <Button
                isIconOnly
                className={`bg-transparent text-default-400 data-[hover=true]:bg-transparent ${className}`}
                radius="full"
                variant="light"
                onPress={toggleWishlist}
                aria-label={isAdded ? "Remove from wishlist" : "Add to wishlist"}
            >
                <HeartFilledIcon className={isAdded ? "text-danger" : "text-default-400"} />
            </Button>
        </Tooltip>
    );
}
