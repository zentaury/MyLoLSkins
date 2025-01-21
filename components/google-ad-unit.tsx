import { Suspense } from "react";
import GoogleAdUnitClient from "./google-ad-unit-client";

const GoogleAdUnit = ({children} : {children: React.ReactNode}) => {
    return <Suspense>
        <GoogleAdUnitClient isProduction={process.env.NODE_ENV === "production"}>
            {children}
        </GoogleAdUnitClient>
    </Suspense>
};

export default GoogleAdUnit;