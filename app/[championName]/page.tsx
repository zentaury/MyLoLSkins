import { title } from "@/components/primitives";
import Link from "next/link";
import { getChampionData } from "../api/dataDragonAPI";
import { ChampionSkinImage } from "@/components/champion-skin-image";

export default async function ChampionPage({ params }: { params: { championName: string } }) {
    const championName = params.championName;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[`${championName}`];

    return (
        <div>
            <div>
                <Link href="/">Back</Link>
            </div>
            <div>
                <h1 className={title()}>{champion.id}</h1>
            </div>
                <div className=" py-10 grid grid-cols-4 gap-4 justify-center">
                {champion.skins.map((skin: any) => {
                       return <ChampionSkinImage
                            key={skin.num + champion.name}
                            skinNumber={skin.num}
                            skinName={skin.name}
                            championName={champion.id}
                            championId={champion.id}
                            />
                })}
                </div>
        </div>
    );
}