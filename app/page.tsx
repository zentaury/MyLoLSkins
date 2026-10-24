import type { Metadata } from "next";
import Link from "next/link";
import { ChampionsGrid } from "@/components/champions-grid";
import { getAllChampionsList } from "./api/dataDragonAPI";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const linkClass = "text-primary underline-offset-4 hover:underline";

export default async function Home() {

  let championsList = await getAllChampionsList();

  return (
    <section className="items-center justify-center">
      <div>
        <ChampionsGrid key={"GridOne"} championsList={championsList}/>
      </div>
      <section aria-labelledby="home-intro" className="max-w-3xl mx-auto pb-6">
        <h2 id="home-intro" className="text-xl font-semibold text-foreground">
          Track your League of Legends skin collection
        </h2>
        <p className="mt-3 leading-relaxed text-default-600">
          My LoL Skins is a free tracker for League of Legends skins. Mark the skins you own on each
          champion page, see their estimated RP value and keep a wishlist of what you want next. Your
          collection is never sent to a server and there is no account to create; read more on
          the <Link href="/about" className={linkClass}>About</Link> page.
        </p>
        <ul className="mt-4 list-disc pl-5 space-y-1.5 text-default-600">
          <li>Search every champion above and open one to see all of its skins.</li>
          <li>
            Add skins to <Link href="/my-skins" className={linkClass}>My Skins</Link> to see
            your totals, filter by price and edit RP prices.
          </li>
          <li>
            Save the skins you want next to your <Link href="/wishlist" className={linkClass}>Wishlist</Link>.
          </li>
          <li>Back up your collection to a JSON file or share it as an image card.</li>
        </ul>
      </section>
    </section>
  );
}
