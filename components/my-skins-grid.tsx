"use client";
import { getAllChampionsList } from "@/app/api/dataDragonAPI";
import { db } from "@/db/IndexedDB";
import { Input } from "@heroui/input";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { Button } from "@heroui/button";
import { SkinsCollectionStats } from "./skins-collection-stats";
import { RPPriceEditor } from "./rp-price-editor";
import { OptionsDropdown } from "./options-dropdown";
import { FlexCardModal } from "./flex-card-modal";
import { SearchIcon } from "./icons";
// import OptimizedAdBanner from "./optimized-ad-banner";

// Valores del filtro de precio: los mismos que usa el filtrado de filteredSkins
const PRICE_FILTERS = [
    { value: "all", label: "All" },
    { value: "975", label: "≤ 975" },
    { value: "1350", label: "1350" },
    { value: "1820", label: "1820" },
    { value: "3250", label: "3250+" },
];

function SkinCardImage({ name, skinNum }: { name: string; skinNum: number }) {
    const [src, setSrc] = useState(
        `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_${skinNum}.jpg`
    );
    return (
        <Image
            isZoomed
            as={NextImage}
            priority={true}
            className="z-0 w-full h-full object-cover"
            src={src}
            alt={`Picture of ${name}`}
            width={process.env.NEXT_PUBLIC_CARD_WIDTH}
            height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
            onError={() => setSrc(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`)}
        />
    );
}

export function MySkinsGrid() {

    const [champions, setChampions] = useState([]);
    const [skins, setSkins]: any = useState([]);
    const [searchText, setSearchText] = useState("");
    const [priceFilter, setPriceFilter] = useState("all");

    const championsArrayList: any = Object.entries(champions);

    useLiveQuery(() => db.skins.toArray().then((response) => { setSkins(JSON.parse(JSON.stringify(response))) }));

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
        getAllChampionsList().then(setChampions);
    }, []);

    const uniqueChampions = new Set(skins.map((skin: any) => skin.key)).size;

    return (
        <div id="container" className="w-full">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
                <div>
                    <h1 className={title()}>My Skins</h1>
                    <p className="text-small text-default-500">
                        {skins.length} {skins.length === 1 ? "skin" : "skins"} · {uniqueChampions} {uniqueChampions === 1 ? "champion" : "champions"}
                    </p>
                </div>
                <div className="flex gap-2.5">
                    <FlexCardModal />
                    <OptionsDropdown />
                </div>
            </div>
            <SkinsCollectionStats />
            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full mb-5">
                <Input
                    id="championNameInput"
                    className="w-full md:max-w-xs"
                    type="text"
                    radius="full"
                    aria-label="Find champion"
                    placeholder="Find champion…"
                    startContent={<SearchIcon className="shrink-0 text-default-400" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <div role="group" aria-label="Filter by price" className="flex flex-wrap gap-1.5">
                    {PRICE_FILTERS.map(({ value, label }) => (
                        <Button
                            key={value}
                            size="sm"
                            radius="full"
                            color={priceFilter === value ? "primary" : "default"}
                            variant={priceFilter === value ? "solid" : "flat"}
                            aria-pressed={priceFilter === value}
                            onPress={() => setPriceFilter(value)}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </div>
            <div id="gridContainer" className="pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSkins?.map((champion: any) => {
                    return (
                        <Card id="mySkinsCard" key={champion.id} isHoverable className="h-[auto] w-[auto]">
                            <SkinCardImage name={champion.name} skinNum={champion.skinNum} />
                            <CardFooter className="absolute z-10 bottom-0 flex-col gap-2 pt-9 bg-linear-to-t from-black/95 to-transparent">
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
