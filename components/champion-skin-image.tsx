import Image from "next/image";

export function ChampionSkinImage ({skinNumber, championName}: {skinNumber:string, championName:string}) {
    return(
        <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skinNumber}.jpg`}
            alt={`Picture of ${championName}`}
            width={200}
            height={500}
        >

        </Image>
    );
}