"use client";

import { Input } from "@nextui-org/input";
import { ChampionCard } from "./champion-card";
import { title } from "./primitives";
import { useEffect, useState } from "react";
import { ChampionsGridProps } from "@/app/interfaces/champion-grid-interface";

import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("../components/ad-banner"), {
    ssr: false,
   });

export function ChampionsGrid({championsList}: ChampionsGridProps) {

    const [inputPlaceholderChampionName, setInputPlaceholderChampionName] = useState('');

    const championsArrayList = Object.entries(championsList);

    const [searchText, setSearchText] =  useState("");

    const searchChampionFilter = (championList: any) => {
        return championList.filter(
            (champion: any) => champion[1].name.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const filteredChampionList = searchChampionFilter(championsArrayList);

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
                <Input id="championNameInput" className="py-5" type="text" label="Find Champion" placeholder={inputPlaceholderChampionName} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <AdBanner data-ad-slot={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_DISPLAY1_HOME}`} data-full-width-responsive="true" data-ad-layout="in-article" data-ad-format="fluid"/>
            </div>
            <div className=" py-10 grid grid-cols-4 gap-4"> 
                {filteredChampionList.map((champion:any) => {return <ChampionCard key={champion[0]} championKey={champion[0]} name={champion[1].name} title={champion[1].title} skinNumber={0}/>})}
            </div>
        </div>

    );
};