"use client";

import { useState, useRef } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { db } from "@/db/IndexedDB";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

export function BackupManager() {
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importStatus, setImportStatus] = useState<{ message: string; type: "success" | "warning" | "danger" | "default" } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = async () => {
        setIsExporting(true);
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

            setImportStatus({ message: "Backup exported successfully!", type: "success" });
            setTimeout(() => setImportStatus(null), 3000);
        } catch (error) {
            console.error("Export failed:", error);
            setImportStatus({ message: "Export failed.", type: "danger" });
        } finally {
            setIsExporting(false);
        }
    };

    const triggerImport = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        setImportStatus(null);

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
                    // Check if skin exists by skinId
                    // Note: imported skin might have 'id' which is local auto-increment. We should ignore it for check.
                    // Actually, db adds new ID automatically if we don't provide it, or if we provide undefined.
                    // But we must check unicity first.

                    if (!skin.skinId) {
                        console.warn("Skipping invalid skin entry:", skin);
                        continue;
                    }

                    const existing = await db.skins.where("skinId").equals(skin.skinId).count();

                    if (existing === 0) {
                        // Remove the local ID to let DB assign a new one
                        const { id, ...skinData } = skin;
                        await db.skins.add(skinData);
                        addedCount++;
                    } else {
                        skippedCount++;
                    }
                }

                setImportStatus({
                    message: `Import complete: ${addedCount} added, ${skippedCount} skipped (duplicates).`,
                    type: "success"
                });

            } catch (error) {
                console.error("Import failed:", error);
                setImportStatus({ message: "Import failed: Invalid file format.", type: "danger" });
            } finally {
                setIsImporting(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Reset input
                }
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex gap-2 items-center">
            {importStatus && (
                <Chip color={importStatus.type} size="sm" variant="flat">
                    {importStatus.message}
                </Chip>
            )}

            <Tooltip content="Save your collection to a backup file">
                <Button
                    color="primary"
                    variant="flat"
                    isLoading={isExporting}
                    onPress={handleExport}
                    size="md"
                >
                    Export
                </Button>
            </Tooltip>
            <Tooltip content="Restore your collection from a backup file">
                <Button
                    color="default"
                    variant="faded"
                    isLoading={isImporting}
                    onPress={triggerImport}
                    size="md"
                >
                    Import
                </Button>
            </Tooltip>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".json"
                onChange={handleImport}
            />
        </div>
    );
}
