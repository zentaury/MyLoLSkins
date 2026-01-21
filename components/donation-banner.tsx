"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";

const BANNER_DISMISSED_KEY = "donation-banner-dismissed";

export function DonationBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
        if (!dismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem(BANNER_DISMISSED_KEY, "true");
        setIsVisible(false);
    };

    const handleSupport = () => {
        // Trigger the Buy Me a Coffee widget
        const bmcButton = document.getElementById("bmc-wbtn");
        if (bmcButton) {
            bmcButton.click();
        }
    };

    if (!isVisible) return null;

    return (
        <Card className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 border-small border-amber-500/20 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
                <div className="text-center sm:text-left">
                    <p className="font-semibold text-foreground">
                        We removed all ads for a better experience!
                    </p>
                    <p className="text-sm text-default-600">
                        Now we rely on your support. If you enjoy My LoL Skins, consider helping us keep it running.
                    </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <Button
                        color="primary"
                        variant="solid"
                        onPress={handleSupport}
                    >
                        Support Us
                    </Button>
                    <Button
                        variant="light"
                        onPress={handleDismiss}
                    >
                        Maybe Later
                    </Button>
                </div>
            </div>
        </Card>
    );
}
