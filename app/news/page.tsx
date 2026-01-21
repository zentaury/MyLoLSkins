"use client";

import { useEffect } from "react";
import { title } from "@/components/primitives";

export default function NewsPage() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-8">
            <div className="text-center mb-10">
                <h1 className={title()}>Latest News</h1>
                <p className="text-default-500 mt-4">
                    Stay updated with the latest changes and announcements from My LoL Skins.
                </p>
            </div>

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[600px] min-h-[600px] bg-black/20 rounded-xl p-4">
                    <a
                        className="twitter-timeline"
                        data-theme="dark"
                        data-height="800"
                        href="https://twitter.com/MyLoLSkinsApp?ref_src=twsrc%5Etfw"
                    >
                        Tweets by MyLoLSkinsApp
                    </a>
                </div>
            </div>
        </div>
    );
}
