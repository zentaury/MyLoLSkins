'use client'

import { useEffect } from "react";

type AdBannerProps = {
    clientId: string;
    slot: string;
    format: string;
    dataFullWithResponsive: boolean;
}

const AdBanner = ({clientId, slot, format, dataFullWithResponsive}: AdBannerProps) => {

    useEffect(() => {
        try{
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }catch(e){
            console.error(e);
        }
    }, []);

    return(
        <ins    className="adsbygoogle"
                style={{display: "block", width: "100%", height: "100%"}}
                data-ad-client={clientId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={dataFullWithResponsive.toString()}
        >
        </ins>
    );
}

export default AdBanner;