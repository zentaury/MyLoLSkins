"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FlexCardPreview } from "./flex-card-preview";
import { toPng } from 'html-to-image';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";

export function FlexCardModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [summonerName, setSummonerName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    // Stats Calculation
    const stats = useLiveQuery(async () => {
        const allSkins = await db.skins.toArray();
        const total = allSkins.length;
        const value = allSkins.reduce((acc, skin) => acc + (skin.rpPrice || 0), 0);

        // Find most expensive skin (simple heuristic for "Top Skin" for now)
        const top = allSkins.reduce((prev, current) => {
            return (prev.rpPrice || 0) > (current.rpPrice || 0) ? prev : current;
        }, allSkins[0] || null);

        return { total, value, top };
    });

    const handleDownload = async () => {
        const node = document.getElementById('flex-card-node');
        if (!node) return;

        setIsGenerating(true);
        try {
            const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `mylolskins-flex-${summonerName || 'summoner'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <Button onPress={onOpen} color="secondary" variant="flat" className="font-semibold">
                Share Collection
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="4xl"
                backdrop="blur"
                classNames={{
                    base: "bg-[#18181b] dark:bg-[#18181b] text-[#ECEDEE]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose: () => void) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Generate Skins Collection Card</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4 items-end">
                                        <Input
                                            label="Summoner Name"
                                            placeholder="Enter your name"
                                            value={summonerName}
                                            onValueChange={setSummonerName}
                                            variant="bordered"
                                            className="max-w-xs"
                                        />
                                        <p className="text-small text-default-400 mb-2">
                                            Preview updates automatically below.
                                        </p>
                                    </div>

                                    {/* Preview Container - Centered and scaled if needed */}
                                    <div className="flex justify-center bg-black/50 p-4 rounded-xl border border-white/5 overflow-auto">
                                        {/* We render the card here. It needs to be visible to be captured. */}
                                        <div className="scale-75 sm:scale-100 origin-center transition-transform">
                                            <FlexCardPreview
                                                summonerName={summonerName}
                                                totalSkins={stats?.total || 0}
                                                totalValue={stats?.value || 0}
                                                topSkin={stats?.top ? {
                                                    name: stats.top.skinName,
                                                    price: stats.top.rpPrice || 0,
                                                    image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${stats.top.name}_${stats.top.skinNum}.jpg`
                                                } : null}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleDownload}
                                    isLoading={isGenerating}
                                >
                                    Download Image
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
