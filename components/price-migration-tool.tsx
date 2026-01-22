"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Progress } from "@nextui-org/progress";
import { migrateAllSkins, MigrationProgress } from "@/utils/migrateSkinPrices";

export function PriceMigrationTool() {
    const [isMigrating, setIsMigrating] = useState(false);
    const [collectionProgress, setCollectionProgress] = useState<MigrationProgress | null>(null);
    const [wishlistProgress, setWishlistProgress] = useState<MigrationProgress | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const handleMigrate = async () => {
        setIsMigrating(true);
        setIsComplete(false);
        setCollectionProgress(null);
        setWishlistProgress(null);

        try {
            await migrateAllSkins((progress) => {
                setCollectionProgress(progress.collection);
                setWishlistProgress(progress.wishlist);
            });
            setIsComplete(true);
        } catch (error) {
            console.error("Migration failed:", error);
            alert("Migration failed. Please try again.");
        } finally {
            setIsMigrating(false);
        }
    };

    const getProgressPercentage = (progress: MigrationProgress | null) => {
        if (!progress || progress.total === 0) return 0;
        return (progress.processed / progress.total) * 100;
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader className="flex flex-col gap-2 items-start">
                <h3 className="text-xl font-bold">Update Skin Prices</h3>
                <p className="text-sm text-default-500">
                    Automatically add rarity and RP prices to your existing skins based on Community Dragon data.
                </p>
            </CardHeader>
            <CardBody className="gap-4">
                {!isMigrating && !isComplete && (
                    <div className="flex flex-col gap-3">
                        <div className="bg-default-100 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">What this does:</h4>
                            <ul className="text-sm text-default-600 space-y-1 list-disc list-inside">
                                <li>Fetches rarity data for all your skins</li>
                                <li>Automatically assigns RP prices based on rarity</li>
                                <li>Preserves any prices you&apos;ve manually set</li>
                                <li>Updates both collection and wishlist</li>
                            </ul>
                        </div>
                        <Button
                            color="primary"
                            size="lg"
                            onPress={handleMigrate}
                            className="w-full"
                        >
                            Start Update
                        </Button>
                    </div>
                )}

                {isMigrating && (
                    <div className="flex flex-col gap-6">
                        {/* Collection Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Collection</span>
                                {collectionProgress && (
                                    <span className="text-sm text-default-500">
                                        {collectionProgress.processed} / {collectionProgress.total}
                                    </span>
                                )}
                            </div>
                            <Progress
                                value={getProgressPercentage(collectionProgress)}
                                color="primary"
                                className="w-full"
                                size="md"
                            />
                            {collectionProgress && (
                                <div className="flex gap-2 flex-wrap">
                                    <Chip size="sm" color="success" variant="flat">
                                        Updated: {collectionProgress.updated}
                                    </Chip>
                                    <Chip size="sm" color="default" variant="flat">
                                        Skipped: {collectionProgress.skipped}
                                    </Chip>
                                    {collectionProgress.errors > 0 && (
                                        <Chip size="sm" color="danger" variant="flat">
                                            Errors: {collectionProgress.errors}
                                        </Chip>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Wishlist Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Wishlist</span>
                                {wishlistProgress && (
                                    <span className="text-sm text-default-500">
                                        {wishlistProgress.processed} / {wishlistProgress.total}
                                    </span>
                                )}
                            </div>
                            <Progress
                                value={getProgressPercentage(wishlistProgress)}
                                color="secondary"
                                className="w-full"
                                size="md"
                            />
                            {wishlistProgress && (
                                <div className="flex gap-2 flex-wrap">
                                    <Chip size="sm" color="success" variant="flat">
                                        Updated: {wishlistProgress.updated}
                                    </Chip>
                                    <Chip size="sm" color="default" variant="flat">
                                        Skipped: {wishlistProgress.skipped}
                                    </Chip>
                                    {wishlistProgress.errors > 0 && (
                                        <Chip size="sm" color="danger" variant="flat">
                                            Errors: {wishlistProgress.errors}
                                        </Chip>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isComplete && collectionProgress && wishlistProgress && (
                    <div className="flex flex-col gap-4">
                        <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg border border-success-200 dark:border-success-800">
                            <h4 className="font-semibold text-success-700 dark:text-success-400 mb-2">
                                ✓ Update Complete!
                            </h4>
                            <div className="text-sm space-y-1">
                                <p>
                                    <strong>Collection:</strong> {collectionProgress.updated} skins updated,{" "}
                                    {collectionProgress.skipped} skipped
                                </p>
                                <p>
                                    <strong>Wishlist:</strong> {wishlistProgress.updated} skins updated,{" "}
                                    {wishlistProgress.skipped} skipped
                                </p>
                            </div>
                        </div>
                        <Button
                            color="default"
                            variant="flat"
                            onPress={() => {
                                setIsComplete(false);
                                setCollectionProgress(null);
                                setWishlistProgress(null);
                            }}
                        >
                            Close
                        </Button>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
