"use client";

import { useState, useRef } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { db } from "@/db/IndexedDB";
import { FlexCardModal } from "./flex-card-modal";
import { PriceMigrationTool } from "./price-migration-tool";

export function OptionsDropdown() {
    const [isMigrateModalOpen, setIsMigrateModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const shareButtonRef = useRef<HTMLButtonElement>(null);

    const handleExport = async () => {
        try {
            const skins = await db.skins.toArray();
            const dataStr = JSON.stringify(skins, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const date = new Date().toISOString().split('T')[0];
            const filename = `mylolskins-backup-${date}.json`;

            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const content = e.target?.result as string;
                const importedSkins = JSON.parse(content);

                if (!Array.isArray(importedSkins)) {
                    throw new Error("Invalid format: expected an array.");
                }

                let addedCount = 0;
                let skippedCount = 0;

                for (const skin of importedSkins) {
                    if (!skin.skinId) {
                        console.warn("Skipping invalid skin entry:", skin);
                        continue;
                    }

                    const existing = await db.skins.where("skinId").equals(skin.skinId).count();

                    if (existing === 0) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, ...skinData } = skin;
                        await db.skins.add(skinData);
                        addedCount++;
                    } else {
                        skippedCount++;
                    }
                }

                alert(`Import complete: ${addedCount} added, ${skippedCount} skipped (duplicates).`);
            } catch (error) {
                console.error("Import failed:", error);
                alert("Import failed: Invalid file format.");
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        };
        reader.readAsText(file);
    };

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        
        if (value === "migrate") {
            setIsMigrateModalOpen(true);
        } else if (value === "export") {
            handleExport();
        } else if (value === "import") {
            fileInputRef.current?.click();
        } else if (value === "share") {
            // Trigger FlexCardModal button click
            shareButtonRef.current?.click();
        }
    };

    return (
        <>
            <Select
                label="Options"
                placeholder="Select an option"
                className="w-full sm:w-48"
                selectedKeys={[]}
                onChange={handleSelectionChange}
            >
                <SelectItem key="migrate" value="migrate">
                    Auto-Assign RP Prices
                </SelectItem>
                <SelectItem key="export" value="export">
                    Export Collection
                </SelectItem>
                <SelectItem key="import" value="import">
                    Import Collection
                </SelectItem>
                <SelectItem key="share" value="share">
                    Share Collection
                </SelectItem>
            </Select>

            {/* Hidden file input for import */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".json"
                onChange={handleImport}
            />

            {/* Modal for Price Migration */}
            <Modal
                isOpen={isMigrateModalOpen}
                onClose={() => setIsMigrateModalOpen(false)}
                size="2xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    <ModalHeader>Auto-Assign RP Prices</ModalHeader>
                    <ModalBody className="pb-6">
                        <PriceMigrationTool />
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Hidden FlexCardModal - we'll trigger its button programmatically */}
            <div className="hidden">
                <div ref={(el) => {
                    if (el) {
                        const button = el.querySelector('button');
                        if (button && shareButtonRef.current !== button) {
                            shareButtonRef.current = button as HTMLButtonElement;
                        }
                    }
                }}>
                    <FlexCardModal />
                </div>
            </div>
        </>
    );
}
