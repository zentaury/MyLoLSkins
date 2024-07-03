import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { ChampionsGrid } from "@/components/champions-grid";
import { getAllChampionsList } from "./api/dataDragonAPI";

export default async function Home() {

  let championsList = await getAllChampionsList();

  return (
    <section className="items-center justify-center">
      <div>
        <ChampionsGrid key={"GridOne"} championsList={championsList}></ChampionsGrid>
      </div>
    </section>
  );
}
