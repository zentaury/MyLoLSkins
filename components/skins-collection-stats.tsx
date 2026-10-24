"use client";

import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";

export function SkinsCollectionStats() {
    // Obtener todas las skins de la colección en tiempo real
    const skins = useLiveQuery(() => db.skins.toArray());

    // Calcular estadísticas
    const totalSkins = skins?.length || 0;
    const uniqueChampions = new Set(skins?.map(skin => skin.key)).size || 0;

    // Calcular valor total en RP
    const totalRPValue = skins?.reduce((total: number, skin) => {
        return total + (skin.rpPrice || 0);
    }, 0) || 0;

    const skinsWithPrice = skins?.filter(skin => skin.rpPrice && skin.rpPrice > 0).length || 0;

    return (
        <Card className="w-full mb-5 border border-primary/20" shadow="none">
            <CardBody className="p-0">
                {totalSkins === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-default-500">No skins in your collection yet!</p>
                        <p className="text-small text-default-400">Start adding skins from champion pages</p>
                    </div>
                ) : (
                    // gap-px over a tinted background draws the thin dividers, also between wrapped rows
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/15">
                        <div className="bg-content1 px-5 py-4">
                            <p className="mb-1 text-tiny uppercase tracking-wider text-default-500">Total skins</p>
                            <strong className="text-2xl font-bold">{totalSkins}</strong>
                        </div>

                        <div className="bg-content1 px-5 py-4">
                            <p className="mb-1 text-tiny uppercase tracking-wider text-default-500">Champions</p>
                            <strong className="text-2xl font-bold">{uniqueChampions}</strong>
                        </div>

                        <div className="bg-content1 px-5 py-4">
                            <p className="mb-1 text-tiny uppercase tracking-wider text-default-500">Collection value</p>
                            <strong className="text-2xl font-bold text-foreground dark:text-primary">
                                {totalRPValue.toLocaleString()}
                                <span className="text-base font-normal text-default-500"> RP</span>
                            </strong>
                        </div>

                        <div className="bg-content1 px-5 py-4">
                            <p className="mb-1 text-tiny uppercase tracking-wider text-default-500">Priced</p>
                            <strong className="text-2xl font-bold">
                                {skinsWithPrice}
                                <span className="text-base font-normal text-default-500"> / {totalSkins}</span>
                            </strong>
                            <Progress
                                aria-label="Skins with a price"
                                size="sm"
                                color="primary"
                                className="mt-2"
                                value={skinsWithPrice}
                                maxValue={totalSkins}
                            />
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
