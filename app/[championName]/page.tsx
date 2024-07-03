

import { title } from "@/components/primitives";
import Link from "next/link";
import { getChampionData } from "../api/dataDragonAPI";

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
            {champion.skins.map((skin:any) => {return <h1>{skin.name}</h1>})}
        </>
    );
}