"use client";
import { getAllChampionsList } from "@/app/api/dataDragonAPI";
import { db } from "@/db/IndexedDB";
import { Input } from "@nextui-org/input";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import { SkinsCollectionStats } from "./skins-collection-stats";
import { RPPriceEditor } from "./rp-price-editor";
import { DonationBanner } from "./donation-banner";
// import OptimizedAdBanner from "./optimized-ad-banner";



import { Select, SelectItem } from "@nextui-org/select";

export function MySkinsGrid() {

    const [champions, setChampions] = useState([]);
    const [skins, setSkins]: any = useState([]);
    const [searchText, setSearchText] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");

    const championsArrayList: any = Object.entries(champions);

    useLiveQuery(() => db.skins.toArray().then((response) => { setSkins(JSON.parse(JSON.stringify(response))) }));

    const fetchAllChampios = async () => {
        let championsList = await getAllChampionsList();
        await setChampions(championsList);
    }

    //filtering champion by input text
    const searchChampionFilter = (championList: any) => {
        return championList.filter(
            (champion: any) => champion[1].name.toLowerCase().includes(searchText.toLowerCase())
        );
    };
    const filteredChampionList: any = searchChampionFilter(championsArrayList);

    let championKey = [0];
    championKey = filteredChampionList?.map((champion: any) => champion[1].key)

    //filtering skin by skin key and champion key
    const filteredSkins = (searchText.length === 0 ? skins : skins?.filter((skin: any) => skin.key.includes(championKey[0])))?.filter((skin: any) => {
        if (priceFilter === "all") return true;
        if (priceFilter === "975") return (skin.rpPrice || 0) <= 975;
        if (priceFilter === "1350") return (skin.rpPrice || 0) === 1350;
        if (priceFilter === "1820") return (skin.rpPrice || 0) === 1820;
        if (priceFilter === "3250") return (skin.rpPrice || 0) >= 3250;
        return true;
    });

    //delete skin from db by skinId
    const deleteSkinOwned = useCallback(async (id: number) => {
        await db.skins.delete(id);
        console.warn("Skin Deleted From Collection");
    }, [])

    useEffect(() => {
        fetchAllChampios();
    }, []);

    return (
        <div id="container" className="w-full">
            <h1 className={title()}>My Skins</h1>
            <div className="py-5" />
            <SkinsCollectionStats />
            <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
                <Input
                    id="championNameInput"
                    className="flex-1"
                    type="text"
                    label="Find Champion"
                    placeholder="Champion Name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                    label="Filter by Price"
                    className="w-full sm:w-48"
                    defaultSelectedKeys={["all"]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriceFilter(e.target.value)}
                >
                    <SelectItem key="all" value="all">All Prices</SelectItem>
                    <SelectItem key="975" value="975">975 RP & Lower</SelectItem>
                    <SelectItem key="1350" value="1350">1350 RP</SelectItem>
                    <SelectItem key="1820" value="1820">1820 RP</SelectItem>
                    <SelectItem key="3250" value="3250">3250 RP</SelectItem>
                </Select>
            </div>
            <div className="py-2">
                <DonationBanner />
                {/* <OptimizedAdBanner 
                    slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_MY_SKINS || ""}
                    className="py-5"
                /> */}
            </div>
            <div id="gridContainer" className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSkins?.map((champion: any, index: number) => {
                    return (
                        <Card id="mySkinsCard" key={index} isFooterBlurred isHoverable className="h-[auto] w-[auto]">
                            <Image
                                isZoomed
                                as={NextImage}
                                priority={true}
                                className="z-0 w-full h-full object-cover"
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_${champion.skinNum}.jpg`}
                                alt={`Picture of ${champion.name}`}
                                width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                                height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 flex-col gap-2">
                                <div className="w-full flex justify-between items-center">
                                    <h4 className="text-white font-semibold text-large">{champion.skinName}</h4>
                                    <Button color="danger" variant="ghost" radius="full" size="sm" onPress={() => deleteSkinOwned(champion.id)} >Remove</Button>
                                </div>
                                <div className="w-full flex justify-center">
                                    <RPPriceEditor
                                        skinId={champion.id}
                                        currentPrice={champion.rpPrice}
                                        skinName={champion.skinName}
                                        onPriceUpdate={(newPrice) => {
                                            // Actualizar el estado local para reflejar el cambio inmediatamente
                                            setSkins((prevSkins: any) =>
                                                prevSkins.map((skin: any) =>
                                                    skin.id === champion.id
                                                        ? { ...skin, rpPrice: newPrice }
                                                        : skin
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </CardFooter>
                        </Card>
                    );

                })}
            </div>
        </div>
    );
}
