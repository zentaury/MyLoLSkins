"use client";

import { Input } from "@nextui-org/input";
import { ChampionCard } from "./champion-card";
import { DonationBanner } from "./donation-banner";
// import OptimizedAdBanner from "./optimized-ad-banner";
import { title } from "./primitives";
import { useEffect, useState } from "react";
import { ChampionsGridProps } from "@/app/interfaces/champion-grid-interface";

import { db } from "@/db/IndexedDB";
import { useLiveQuery } from "dexie-react-hooks";
import { Select, SelectItem } from "@nextui-org/select";

export function ChampionsGrid({ championsList }: ChampionsGridProps) {

    const [inputPlaceholderChampionName, setInputPlaceholderChampionName] = useState('');
    const [searchText, setSearchText] = useState("");
    const [ownershipFilter, setOwnershipFilter] = useState("all");

    // Get all owned skins from IndexedDB
    const ownedSkins = useLiveQuery(() => db.skins.toArray()) || [];

    // Create a map of championKey -> ownedCount
    const skinsByChampion = ownedSkins.reduce((acc: Record<string, number>, skin: any) => {
        // extract championKey from skin.key (skin.key format is likely numbers, need to match with champion List)
        // Wait, skin.key in db.skins seems to include championId.
        // Let's look at interfaces again. ChampionCard uses championKey (string, e.g. "Aatrox").
        // DB Skins has 'name', 'key', 'skinName'. 
        // skin.name is likely the champion name (e.g. "Aatrox").
        const champName = skin.name;
        acc[champName] = (acc[champName] || 0) + 1;
        return acc;
    }, {});


    const championsArrayList = Object.entries(championsList);

    const searchChampionFilter = (championList: any) => {
        return championList.filter(
            (champion: any) => {
                const nameMatch = champion[1].name.toLowerCase().includes(searchText.toLowerCase());
                if (!nameMatch) return false;

                if (ownershipFilter === "owned") {
                    return (skinsByChampion[champion[1].name] || 0) > 0;
                }

                return true;
            }
        );
    };

    const filteredChampionList = searchChampionFilter(championsArrayList);

    useEffect(() => {
        const returnRandomChampionName = () => {
            let randomChampion = Math.floor(Math.random() * championsArrayList.length);
            setInputPlaceholderChampionName(championsArrayList[randomChampion][0].toString());
        };
        returnRandomChampionName();
    }, []);

    return (
        <div>
            <div className="text-center">
                <h1 className={title({ size: "sm" })}>Champions</h1>
                <br />
                <br />
                <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
                    <Input
                        id="championNameInput"
                        className="flex-1"
                        type="text"
                        label="Find Champion"
                        placeholder={inputPlaceholderChampionName}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Select
                        label="Filter by Ownership"
                        className="w-full sm:w-48"
                        defaultSelectedKeys={["all"]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOwnershipFilter(e.target.value)}
                    >
                        <SelectItem key="all" value="all">
                            Show All
                        </SelectItem>
                        <SelectItem key="owned" value="owned">
                            Owned Only
                        </SelectItem>
                    </Select>
                </div>
                <div className="py-2">
                    <DonationBanner />
                    {/* <OptimizedAdBanner 
                        slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_HOME || ""}
                        className="py-4"
                    /> */}
                </div>
            </div>
            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredChampionList.map((champion: any) => {
                    const ownedCount = skinsByChampion[champion[1].name] || 0;
                    return (
                        <ChampionCard
                            key={champion[0]}
                            championKey={champion[0]}
                            name={champion[1].name}
                            title={champion[1].title}
                            skinNumber={0}
                            ownedCount={ownedCount}
                        />
                    );
                })}
            </div>
        </div>

    );
};
