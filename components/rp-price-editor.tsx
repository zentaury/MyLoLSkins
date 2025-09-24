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
            <div className="flex flex-col gap-2 p-2 bg-default-100 rounded-lg">
                <p className="text-xs text-default-600">{skinName}</p>
                <Input
                    size="sm"
                    type="number"
                    placeholder="RP price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    max="10000"
                    endContent={<span className="text-xs">RP</span>}
                />
                <div className="flex flex-wrap gap-1">
                    <Button size="sm" variant="flat" onPress={() => setPrice("520")}>520</Button>
                    <Button size="sm" variant="flat" onPress={() => setPrice("750")}>750</Button>
                    <Button size="sm" variant="flat" onPress={() => setPrice("975")}>975</Button>
                    <Button size="sm" variant="flat" onPress={() => setPrice("1350")}>1350</Button>
                    <Button size="sm" variant="flat" onPress={() => setPrice("1820")}>1820</Button>
                    <Button size="sm" variant="flat" onPress={() => setPrice("3250")}>3250</Button>
                </div>
                <div className="flex gap-1">
                    <Button 
                        size="sm" 
                        color="primary" 
                        onPress={handleSave}
                        isLoading={isLoading}
                        className="flex-1"
                    >
                        Save
                    </Button>
                    <Button 
                        size="sm" 
                        variant="light" 
                        onPress={handleCancel}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    {currentPrice && (
                        <Button 
                            size="sm" 
                            color="danger" 
                            variant="flat"
                            onPress={handleRemovePrice}
                            isLoading={isLoading}
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
            size="sm"
            variant={currentPrice ? "flat" : "ghost"}
            color={currentPrice ? "success" : "default"}
            onPress={() => setIsEditing(true)}
            className="min-w-unit-16"
        >
            {currentPrice ? `${currentPrice} RP` : "Add RP"}
        </Button>
    );
}
