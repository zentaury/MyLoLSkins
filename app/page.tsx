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
