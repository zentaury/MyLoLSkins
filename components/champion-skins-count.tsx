"use client";

import { useEffect, useState } from "react";
import { db } from "@/db/IndexedDB";

interface ChampionSkinsCountProps {
  championKey: string;
}

const ChampionSkinsCount = ({ championKey }: ChampionSkinsCountProps) => {
  const [totalSkins, setTotalSkins] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChampionSkins = async () => {
      try {
        const championSkins = await db.skins.where("key").equals(championKey).toArray();
        console.log(championSkins);
        setTotalSkins(championSkins.length);
      } catch (err) {
        setError("Failed to fetch champion skins from IndexedDB");
        console.error(err);
      }
    };

    fetchChampionSkins();
  }, [championKey]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <p className="inline text-white">
      {totalSkins}
    </p>
  );
};

export default ChampionSkinsCount;