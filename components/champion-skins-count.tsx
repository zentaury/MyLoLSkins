"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/IndexedDB";

interface ChampionSkinsCountProps {
  championKey: string;
}

const ChampionSkinsCount = ({ championKey }: ChampionSkinsCountProps) => {
  // Usar useLiveQuery para reactividad automática
  const championSkins = useLiveQuery(
    () => db.skins.where("key").equals(championKey).toArray(),
    [championKey]
  );

  // Contar skins poseídas (sin incluir skin default)
  const totalSkins = championSkins?.length ?? 0;

  return (
    <p className="inline text-white">
      {totalSkins}
    </p>
  );
};

export default ChampionSkinsCount;
