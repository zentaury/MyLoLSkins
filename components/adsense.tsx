import Script from "next/script";

type AdSenseProps = {
    clientId: string,
};

const Adsense = ({clientId}: AdSenseProps) => {
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
};

export default Adsense;