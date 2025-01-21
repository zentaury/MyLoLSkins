"use client"

import { usePathname, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect } from "react"

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
};

const GoogleAdUnitClient = ({isProduction,children}: {
    isProduction: boolean;
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (isProduction) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }else{
            console.log("Google Ads not loaded in development mode");
        }
    }, [pathname, searchParams, isProduction]);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default GoogleAdUnitClient;