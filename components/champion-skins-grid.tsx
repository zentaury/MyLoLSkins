import { ReactNode } from "react";

export function ChampionSkinsGrid({children}: {children:ReactNode}) {
    return(
            <div className=" py-10 grid grid-cols-4 gap-4"> 
                    {children}
            </div>
    );
};