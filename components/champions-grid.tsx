"use client";

import { ChampionCard } from "./champion-card";
import { title } from "./primitives";

export function ChampionsGrid({championsList}: ChampionsGridProps) {
    const championsArrayList = Object.entries(championsList);
    console.log(championsArrayList);
    return(
        <div>
            <div className="text-center">
                <h1 className={title({size: "sm"})}>Champions</h1>
            </div>
            <div className=" py-10 grid grid-cols-4 gap-4"> 
                {championsArrayList.map((champion:any) => {return <ChampionCard key={champion[0]} name={champion[0]} title={champion[1].title} skinNumber={0}></ChampionCard>})}
            </div>
        </div>

    );
};