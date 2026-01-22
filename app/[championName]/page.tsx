
import Link from "next/link";

import { getChampionData } from "../api/dataDragonAPI";

import { ChampionSkinImage } from "@/components/champion-skin-image";

interface PageProps {
    params: Promise<{ championName: string }>;
}

import Image from "next/image";
import { Card, CardHeader } from "@nextui-org/card";

import { Metadata } from "next";

import ChampionSkinsCount from "@/components/champion-skins-count";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { championName } = await params;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[`${championName}`];

    if (!champion) {
        return {
            title: "Champion Not Found",
        };
    }

    const title = `${champion.name}: All Skins & RP Prices - My LoL Skins`;
    const description = `View all ${champion.skins.length - 1} skins for ${champion.name} (${champion.title}). Track your collection, see prices, and manage your wishlist.`;
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${champion.name} Splash Art`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
}

export default async function ChampionPage({ params }: PageProps) {
    const { championName } = await params;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[`${championName}`];

    // Filtrar las skins para excluir la primera (skin por defecto)
    const skins = champion.skins.slice(1);

    return (
        <div>
            <div className="mb-4">
                <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold hover:text-primary transition-colors">
                    ← Back to Champions
                </Link>
            </div>
            <Card isPressable={false} className="">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start justify-start p-4 sm:p-6">
                    <h2 className="text-white/60 text-lg sm:text-2xl md:text-3xl lg:text-4xl capitalize font-bold">{champion.title}</h2>
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl capitalize font-bold">{champion.name}</h1>
                    <h3 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl capitalize font-medium"><ChampionSkinsCount championKey={champion.key} />\{champion.skins.length - 1} Skins</h3>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    </div>
                </div>
            </Card>
            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                {skins.map((skin: any) => {
                    // Community Dragon uses championKey + skinNum format (e.g., "103015" for Ahri skin 15)
                    const communityDragonSkinId = `${champion.key}${String(skin.num).padStart(3, '0')}`;
                    return <ChampionSkinImage
                        key={"Skin" + skin.id}
                        championId={champion.id}
                        championKey={champion.key}
                        championName={champion.name}
                        championTitle={champion.title}
                        skinId={communityDragonSkinId}
                        skinName={skin.name}
                        skinNum={skin.num}
                    />
                })}
            </div>
        </div>
    );
}
