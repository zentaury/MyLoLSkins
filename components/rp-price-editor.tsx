"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { db } from "@/db/IndexedDB";

interface RPPriceEditorProps {
    skinId: number;
    currentPrice?: number;
    skinName: string;
    onPriceUpdate: (newPrice: number | undefined) => void;
}

export function RPPriceEditor({ skinId, currentPrice, skinName, onPriceUpdate }: RPPriceEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [price, setPrice] = useState<string>(currentPrice?.toString() || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const numericPrice = price.trim() === "" ? undefined : parseInt(price);
            
            if (numericPrice !== undefined && (numericPrice < 0 || numericPrice > 10000)) {
                alert("Please enter a valid RP price between 0 and 10000");
                setIsLoading(false);
                return;
            }

            await db.skins.update(skinId, { rpPrice: numericPrice });
            onPriceUpdate(numericPrice);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating RP price:", error);
            alert("Error updating price. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setPrice(currentPrice?.toString() || "");
        setIsEditing(false);
    };

    const handleRemovePrice = async () => {
        setIsLoading(true);
        try {
            await db.skins.update(skinId, { rpPrice: undefined });
            onPriceUpdate(undefined);
            setPrice("");
            setIsEditing(false);
        } catch (error) {
            console.error("Error removing RP price:", error);
            alert("Error removing price. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div className="flex flex-col gap-3 p-3 bg-default-100 rounded-lg w-full max-w-sm mx-auto">
                <p className="text-sm text-default-600 text-center font-medium">{skinName}</p>
                <Input
                    size="md"
                    type="number"
                    placeholder="RP price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    max="10000"
                    endContent={<span className="text-sm font-medium">RP</span>}
                    className="text-center"
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button size="md" variant="flat" onPress={() => setPrice("520")} className="min-h-[44px]">520</Button>
                    <Button size="md" variant="flat" onPress={() => setPrice("750")} className="min-h-[44px]">750</Button>
                    <Button size="md" variant="flat" onPress={() => setPrice("975")} className="min-h-[44px]">975</Button>
                    <Button size="md" variant="flat" onPress={() => setPrice("1350")} className="min-h-[44px]">1350</Button>
                    <Button size="md" variant="flat" onPress={() => setPrice("1820")} className="min-h-[44px]">1820</Button>
                    <Button size="md" variant="flat" onPress={() => setPrice("3250")} className="min-h-[44px]">3250</Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                        size="md" 
                        color="primary" 
                        onPress={handleSave}
                        isLoading={isLoading}
                        className="flex-1 min-h-[44px]"
                    >
                        Save
                    </Button>
                    <Button 
                        size="md" 
                        variant="light" 
                        onPress={handleCancel}
                        className="flex-1 min-h-[44px]"
                    >
                        Cancel
                    </Button>
                    {currentPrice && (
                        <Button 
                            size="md" 
                            color="danger" 
                            variant="flat"
                            onPress={handleRemovePrice}
                            isLoading={isLoading}
                            className="min-h-[44px]"
                        >
                            Remove
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Button
            size="md"
            variant={currentPrice ? "flat" : "ghost"}
            color={currentPrice ? "success" : "default"}
            onPress={() => setIsEditing(true)}
            className="min-w-unit-20 min-h-[44px] text-sm font-medium"
        >
            {currentPrice ? `${currentPrice} RP` : "Add RP"}
        </Button>
    );
}
