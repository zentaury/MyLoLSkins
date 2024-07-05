import { ChampionsGrid } from "@/components/champions-grid";
import { getAllChampionsList } from "./api/dataDragonAPI";
import { Spinner } from "@nextui-org/spinner";

export default async function Home() {

  let championsList = await getAllChampionsList();
  if(!championsList) return <><div className="flex gap-4"><Spinner color="default"/></div></>

  return (
    <section className="items-center justify-center">
      <div>
        <ChampionsGrid key={"GridOne"} championsList={championsList}></ChampionsGrid>
      </div>
    </section>
  );
}
