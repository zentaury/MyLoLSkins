

import { title } from "@/components/primitives";
import Link from "next/link";
import { getChampionData } from "../api/dataDragonAPI";
import Image from "next/image";
import { ChampionSkinImage } from "@/components/champion-skin-image";
import { ChampionSkinsGrid } from "@/components/champion-skins-grid";

export default async function ChampionPage ({params}:{params:{championName: string}}) {
    const championName = params.championName;
    const championObject = await getChampionData(championName);
    const champion = championObject.data[`${championName}`];

    return (
        <>
            <div>
                <Link href="/">Back</Link>
              </div>
            <h1 className={title()}>{champion.id}</h1>
            <ChampionSkinsGrid>
            {champion.skins.map((skin:any) => {
                return <ChampionSkinImage key={skin.num + champion.name} skinNumber={skin.num} championName={champion.name}/>})}
            </ChampionSkinsGrid>
        </>
    );
}