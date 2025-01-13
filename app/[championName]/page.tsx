
import Link from "next/link";

import { getChampionData } from "../api/dataDragonAPI";

import { ChampionSkinImage } from "@/components/champion-skin-image";

import { PageProps } from "@/.next/types/app/page";

import Image from "next/image";
import { Card, CardHeader } from "@nextui-org/card";

export default async function ChampionPage({ params }: PageProps) {
    const {championName} = await params;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[`${championName}`];

    // Filtrar las skins para excluir la primera (skin por defecto)
    const skins = champion.skins.slice(1);

    return (
        <div>
            <div>
                <Link href="/" className="text-2xl font-bold">Back</Link>
            </div>
            <Card isPressable={false} className="">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start justify-start">    
                    <h2 className="text-white/60 text-4xl capitalize font-bold">{champion.title}</h2>
                    <h1 className="text-white text-7xl capitalize font-bold">{champion.name}</h1>
                </CardHeader>
                <div className="w-full">
                    <div className="w-full h-auto">
                        <Image
                            id="champion-splash"
                            style={{ width: "100%", height: "100%" }} 
                            priority={true}
                            className="z-0 w-full h-full object-cover"
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} 
                            alt={`Picture of ${championName}`}
                            width={1215}
                            height={717}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"/>
                    </div>
                </div>
            </Card>
                <div className=" py-10 grid grid-cols-4 gap-4 justify-center">
                {skins.map((skin: any) => {
                       return <ChampionSkinImage
                       key={"Skin" + skin.id}
                                championId={champion.id}
                                championKey={champion.key}
                                championName={champion.name}
                                championTitle={champion.title}
                                skinId={skin.id}
                                skinName={skin.name}
                                skinNum={skin.num}
                            />
                })}
                </div>
        </div>
    );
}