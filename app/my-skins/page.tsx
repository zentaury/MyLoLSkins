"use client";
import { MySkinsGrid } from "@/components/my-skins-grid";
import { title } from "@/components/primitives";
import { db } from "@/db/IndexedDB";
import { useLiveQuery } from "dexie-react-hooks";

export default function MySkinsPage() {
  const skinsList = useLiveQuery(() => db.skins.toArray());
  return (
    <>
      <div>
        <h1 className={title()}>My Skins</h1>
      </div>
      <div>
        <MySkinsGrid skinsList={skinsList}/>
      </div>
    </>);
}
