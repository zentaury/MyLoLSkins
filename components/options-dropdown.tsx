"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { db } from "@/db/IndexedDB";
import { PriceMigrationTool } from "./price-migration-tool";

export function OptionsDropdown() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMigrateModalOpen, setIsMigrateModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleAction = (key: React.Key) => {
        setIsMenuOpen(false);

        if (key === "migrate") {
            setIsMigrateModalOpen(true);
        } else if (key === "export") {
            handleExport();
        } else if (key === "import") {
            fileInputRef.current?.click();
        }
    };

    return (
        <>
            {/* shortcut: @heroui/dropdown is not installed, so the menu is a Listbox inside a small Modal; swap it for Dropdown once the package is added */}
            <Button
                isIconOnly
                variant="flat"
                className="text-xl"
                aria-label="Collection options"
                aria-haspopup="dialog"
                onPress={() => setIsMenuOpen(true)}
            >
                ⋯
            </Button>
            <Modal isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} size="xs" placement="auto">
                <ModalContent>
                    <ModalHeader>Collection options</ModalHeader>
                    <ModalBody className="pb-4">
                        <Listbox aria-label="Collection options" onAction={handleAction}>
                            <ListboxItem key="export">Export Collection</ListboxItem>
                            <ListboxItem key="import">Import Collection</ListboxItem>
                            <ListboxItem key="migrate">Auto-Assign RP Prices</ListboxItem>
                        </Listbox>
                    </ModalBody>
                </ModalContent>
            </Modal>

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
        </>
    );
}
