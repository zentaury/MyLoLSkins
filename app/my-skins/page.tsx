"use client";
import { MySkinsGrid } from "@/components/my-skins-grid";
import { title } from "@/components/primitives";
import { db } from "@/db/IndexedDB";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { getAllChampionsList } from "../api/dataDragonAPI";

export default function MySkinsPage() {
  const skinsList = useLiveQuery(() => db.skins.toArray());
  const [champions, setChampions] = useState([]);
  useEffect(() => {

    const fetchAllChampios = async () => {
      let championsList = await getAllChampionsList();
      setChampions(championsList);
    }
    fetchAllChampios();
  }, []);

  const championsArrayList = Object.entries(champions);
  console.log(championsArrayList);

  return (
    <>
      <div>
        <h1 className={title()}>My Skins</h1>
      </div>
      <div>
        {championsArrayList.map((champion) =>
          <>
            <div className="flex ...">
              <div className="flex-none w-14 h-14 ...">
                {champion[0]}
              </div>
              <div className="grow h-14 ...">
                
              </div>
            </div>
          </>)}
      </div>
      <div>
        <MySkinsGrid skinsList={skinsList} />
      </div>
    </>);
}
