"use client";
import { MySkinsGrid } from "@/components/my-skins-grid";
import { title } from "@/components/primitives";

export default function MySkinsPage() {

  return (
    <>
      <div>
        <h1 className={title()}>My Skins</h1>
      </div>
      <div>
        <MySkinsGrid/>
      </div>
    </>);
}
