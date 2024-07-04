"use client";

import { Input } from "@nextui-org/input";
import { ChampionCard } from "./champion-card";
import { title } from "./primitives";
import { useEffect, useState } from "react";

export function ChampionsGrid({championsList}: ChampionsGridProps) {

    const [inputPlaceholderChampionName, setInputPlaceholderChampionName] = useState('');

    const championsArrayList = Object.entries(championsList);

    useEffect(() => {
        const returnRandomChampionName = () => {
            let randomChampion = Math.floor(Math.random() * championsArrayList.length);
            setInputPlaceholderChampionName(championsArrayList[randomChampion][0].toString());
        };
        returnRandomChampionName();
    },[]);

    return(
        <div>
            <div className="text-center">
                <h1 className={title({size: "sm"})}>Champions</h1>
                <Input className="py-5" type="text" label="Find Champion" placeholder={inputPlaceholderChampionName} />
            </div>
            <div className=" py-10 grid grid-cols-4 gap-4"> 
                {championsArrayList.map((champion:any) => {return <ChampionCard key={champion[0]} name={champion[0]} title={champion[1].title} skinNumber={0}></ChampionCard>})}
            </div>
        </div>

    );
};