"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";

export function SkinsCollectionStats() {
    // Obtener todas las skins de la colección en tiempo real
    const skins = useLiveQuery(() => db.skins.toArray());
    
    // Calcular estadísticas
    const totalSkins = skins?.length || 0;
    const uniqueChampions = new Set(skins?.map(skin => skin.key)).size || 0;
    
    // Agrupar skins por campeón para mostrar el campeón con más skins
    const skinsByChampion = skins?.reduce((acc: any, skin) => {
        acc[skin.key] = (acc[skin.key] || 0) + 1;
        return acc;
    }, {}) || {};
    
    const mostSkinsChampion = Object.entries(skinsByChampion).reduce((max: any, current: any) => {
        return current[1] > (max[1] || 0) ? current : max;
    }, ['', 0]);

    return (
        <Card className="w-full mb-6">
            <CardBody>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    <div className="text-center">
                        <p className="text-small text-default-500">Total Skins</p>
                        <Chip 
                            color="primary" 
                            variant="flat" 
                            size="lg"
                            className="text-lg font-bold"
                        >
                            {totalSkins}
                        </Chip>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-small text-default-500">Champions</p>
                        <Chip 
                            color="secondary" 
                            variant="flat" 
                            size="lg"
                            className="text-lg font-bold"
                        >
                            {uniqueChampions}
                        </Chip>
                    </div>
                    
                    {mostSkinsChampion[0] && (
                        <div className="text-center">
                            <p className="text-small text-default-500">Most Skins</p>
                            <Chip 
                                color="success" 
                                variant="flat" 
                                size="lg"
                                className="text-lg font-bold"
                            >
                                {mostSkinsChampion[1]} skins
                            </Chip>
                        </div>
                    )}
                    
                    {totalSkins > 0 && (
                        <div className="text-center">
                            <p className="text-small text-default-500">Avg per Champion</p>
                            <Chip 
                                color="warning" 
                                variant="flat" 
                                size="lg"
                                className="text-lg font-bold"
                            >
                                {(totalSkins / uniqueChampions).toFixed(1)}
                            </Chip>
                        </div>
                    )}
                </div>
                
                {totalSkins === 0 && (
                    <div className="text-center py-4">
                        <p className="text-default-500">No skins in your collection yet!</p>
                        <p className="text-small text-default-400">Start adding skins from champion pages</p>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
