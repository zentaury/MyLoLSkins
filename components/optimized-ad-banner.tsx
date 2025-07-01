"use client"

import { useEffect } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

interface OptimizedAdBannerProps {
    slot: string;
    format?: string;
    responsive?: boolean;
    className?: string;
}

const OptimizedAdBanner = ({ 
    slot, 
    format = "auto", 
    responsive = true, 
    className = "" 
}: OptimizedAdBannerProps) => {
    
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error("Error loading AdSense ad:", err);
            }
        }
    }, []);

    return (
        <div className={`ad-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={{
                    display: "block",
                    border: process.env.NODE_ENV === "development" ? "1px dashed #ccc" : "none",
                }}
                data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive.toString()}
            />
        </div>
    );
};

export default OptimizedAdBanner;
