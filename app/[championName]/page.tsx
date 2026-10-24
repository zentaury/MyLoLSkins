
import Link from "next/link";

import { getAllChampionsList, getChampionData } from "../api/dataDragonAPI";

import { ChampionSkinImage } from "@/components/champion-skin-image";

interface PageProps {
    params: Promise<{ championName: string }>;
}

import Image from "next/image";
import { Card, CardHeader } from "@heroui/card";

import { Metadata } from "next";

import ChampionSkinsCount from "@/components/champion-skins-count";
import { siteConfig } from "@/config/site";

// Exclude base skin and any variant/chroma — DDragon marks these with a parentSkin field.
// Chromas share their parent's loading screen and return 403 when requested directly.
function getChampionSkins(champion: any) {
    return champion.skins.slice(1).filter((skin: any) => skin.parentSkin === undefined);
}

export const revalidate = 86400;

// Unknown names get a router 404 with no render, Data Dragon call or cache entry. A champion released after a deploy
// shows up on the next one, like the home page and the sitemap, which are prerendered too.
export const dynamicParams = false;

// No try/catch: with dynamicParams off, an empty list would turn every champion page into a 404
export async function generateStaticParams() {
    return Object.keys(await getAllChampionsList()).map((championName) => ({ championName }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { championName } = await params;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[championName];

    if (!champion) {
        return {
            title: "Champion Not Found",
        };
    }

    const title = `${champion.name}: All Skins & RP Prices`;
    // openGraph/twitter titles do not go through the root title template
    const socialTitle = `${title} - ${siteConfig.name}`;
    const description = `View all ${getChampionSkins(champion).length} skins for ${champion.name} (${champion.title}). Track your collection, see prices, and manage your wishlist.`;
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`;

    return {
        title: title,
        description: description,
        alternates: { canonical: `/${championName}` },
        openGraph: {
            title: socialTitle,
            description: description,
            siteName: siteConfig.name,
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 1215,
                    height: 717,
                    alt: `${champion.name} Splash Art`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description: description,
            creator: "@MyLoLSkinsApp",
            images: [imageUrl],
        },
    };
}

export default async function ChampionPage({ params }: PageProps) {
    const { championName } = await params;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[championName];

    const skins = getChampionSkins(champion);

    return (
        <div>
            <div className="mb-4">
                <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold hover:text-primary transition-colors">
                    ← Back to Champions
                </Link>
            </div>
            <Card isPressable={false} className="">
                <CardHeader className="absolute z-10 top-1 flex-col items-start! justify-start p-4 sm:p-6">
                    <h2 className="text-white/60 text-lg sm:text-2xl md:text-3xl lg:text-4xl capitalize font-bold">{champion.title}</h2>
                    <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl capitalize font-bold">{champion.name}</h1>
                    <h3 className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl capitalize font-medium"><ChampionSkinsCount championKey={champion.key} />/{skins.length} Skins</h3>
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
                        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
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
