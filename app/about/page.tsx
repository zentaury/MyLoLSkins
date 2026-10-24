import type { Metadata } from "next";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Free League of Legends skin tracker: build your collection, estimate its RP value and keep a wishlist. No account needed, data stays in your browser.",
  alternates: { canonical: "/about" },
};

const bodyClass = "gap-4 text-default-600 leading-relaxed";
const listClass = "list-disc pl-5 space-y-2";
const lead = "font-semibold text-foreground";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className={title({ size: "lg" })}>About My LoL Skins</h1>
        <p className={subtitle({ class: "mt-4" })}>
          A free tracker for your League of Legends skin collection
        </p>
      </div>

      {/* What is My LoL Skins */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>What is My LoL Skins?</h2>
        </CardHeader>
        <CardBody className={bodyClass}>
          <p>
            My LoL Skins is a free tracker made for the League of Legends community. Pick the skins you
            own, see what your collection adds up to in RP and keep a wishlist of the skins you want next.
          </p>
          <p>
            With so many skins across so many champions, it is hard to remember what you already own or
            what it is worth. My LoL Skins keeps that in one place, with no spreadsheet and no account.
          </p>
        </CardBody>
      </Card>

      {/* What you can do */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>What you can do</h2>
        </CardHeader>
        <CardBody className={bodyClass}>
          <ul className={listClass}>
            <li>
              <strong className={lead}>Browse champions.</strong> Search every champion by name, or switch to
              Owned Only to see the champions you already have skins for.
            </li>
            <li>
              <strong className={lead}>Mark the skins you own.</strong> Open a champion to see its skins and
              click one to add it to your collection. Owned skins show a check mark. Chromas are not listed
              separately.
            </li>
            <li>
              <strong className={lead}>Review My Skins.</strong> See your collection in one place with a
              champion search, price filters and stats: total skins, champions, collection value in RP and how
              many skins have a price.
            </li>
            <li>
              <strong className={lead}>Estimate and edit RP prices.</strong> A price is estimated from the
              skin&apos;s rarity when you add it. You can change any price with quick-select values or your own
              number.
            </li>
            <li>
              <strong className={lead}>Auto-assign prices.</strong> A tool in the Collection options menu fills
              in estimated prices for skins that do not have one yet and keeps the prices you set yourself. It
              also covers your wishlist.
            </li>
            <li>
              <strong className={lead}>Keep a wishlist.</strong> Click the heart on a skin you do not own yet to
              save it for later, and click it again to remove it.
            </li>
            <li>
              <strong className={lead}>Back up your collection.</strong> Export it to a JSON file and import
              that file later, for example in another browser. Skins you already have are skipped on import.
            </li>
            <li>
              <strong className={lead}>Share it.</strong> Share Collection builds an image card with your name,
              total skins, collection value and your most expensive skin, ready to download as a PNG.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* How It Works */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>How it works</h2>
        </CardHeader>
        <CardBody>
          <ol className="list-decimal pl-5 space-y-5 marker:font-semibold marker:text-primary">
            <li>
              <h3 className={lead}>Browse champions</h3>
              <p className="mt-1 text-default-600 leading-relaxed">
                Start on the home page. Search by name, or use Owned Only to see the champions you already
                have skins for.
              </p>
            </li>
            <li>
              <h3 className={lead}>Open a champion</h3>
              <p className="mt-1 text-default-600 leading-relaxed">
                Click a champion to see all of its skins with their loading screen art.
              </p>
            </li>
            <li>
              <h3 className={lead}>Build your collection</h3>
              <p className="mt-1 text-default-600 leading-relaxed">
                Click a skin to add it to your collection. A check mark shows you own it and its RP price is
                estimated from its rarity. Not ready to buy? Click the heart to save it to your wishlist.
              </p>
            </li>
            <li>
              <h3 className={lead}>Review your value</h3>
              <p className="mt-1 text-default-600 leading-relaxed">
                Open My Skins to see your totals, filter by price and edit any RP price. Use Auto-Assign RP
                Prices for skins that are missing one.
              </p>
            </li>
            <li>
              <h3 className={lead}>Back up and share</h3>
              <p className="mt-1 text-default-600 leading-relaxed">
                From My Skins, use the Collection options menu (⋯) to export a JSON backup, and Share
                Collection to download an image card.
              </p>
            </li>
          </ol>
        </CardBody>
      </Card>

      {/* Your data and privacy */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Your data and privacy</h2>
        </CardHeader>
        <CardBody className={bodyClass}>
          <ul className={listClass}>
            <li>
              Your collection and wishlist are stored in your browser, on the device you use. Your collection
              is never sent to a server.
            </li>
            <li>There is no account to create and no sign-in.</li>
            <li>The site shows no ads. It is financed by voluntary donations.</li>
            <li>
              Like most websites, My LoL Skins may use basic analytics and performance monitoring to
              understand how the site is used.
            </li>
            <li>
              Some third-party widgets load from their own servers: the Buy Me a Coffee button on every
              page and the X timeline on the News page.
            </li>
          </ul>
          <p>
            Because your data lives in your browser, clearing your browser&apos;s site data deletes it, and a
            different browser or device starts empty. Export a backup from My Skins first. The backup file
            covers the skins you own; your wishlist is not included.
          </p>
        </CardBody>
      </Card>

      {/* Where the data comes from */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Where the data comes from</h2>
        </CardHeader>
        <CardBody className={bodyClass}>
          <p>
            Champions, skins and splash art come from Riot&apos;s Data Dragon. Skin rarity comes from Community
            Dragon. RP prices are estimated from that rarity:
          </p>
          <ul className={listClass}>
            <li>Rare: 975 RP</li>
            <li>Epic, Mythic and Exalted: 1350 RP</li>
            <li>Legendary and Transcendent: 1820 RP</li>
            <li>Ultimate: 3250 RP</li>
          </ul>
          <p>
            Skins without a rarity get no automatic price, so you enter it yourself. Estimates can differ from
            the in-game store, for example during sales or for legacy skins, so treat the collection value as
            an approximation.
          </p>
        </CardBody>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Frequently asked questions</h2>
        </CardHeader>
        <CardBody className="gap-5">
          <div>
            <h3 className={lead}>Is My LoL Skins free?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              Yes. It is free to use and has no ads. It is financed by voluntary donations.
            </p>
          </div>
          <div>
            <h3 className={lead}>Do I need an account?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              No. There is nothing to sign up for. Open a champion and start adding skins.
            </p>
          </div>
          <div>
            <h3 className={lead}>Where is my collection stored, and what if I switch devices?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              In your browser, on the device you use. A different browser or device starts empty, and clearing
              your site data erases it. Export a backup from My Skins and import it wherever you need it.
            </p>
          </div>
          <div>
            <h3 className={lead}>Are the RP prices exact?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              No. They are estimates based on skin rarity and can differ from the in-game store. You can edit
              any price, and skins without a rarity need a price entered by hand.
            </p>
          </div>
          <div>
            <h3 className={lead}>Does it connect to my Riot account?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              No. It does not log in to Riot or read your inventory. You choose which skins you own, and the
              name on the share card is just text you type.
            </p>
          </div>
          <div>
            <h3 className={lead}>Is it affiliated with Riot Games?</h3>
            <p className="mt-1 text-default-600 leading-relaxed">
              No. My LoL Skins is an independent project made for the League of Legends community and is not
              endorsed by Riot Games.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Support &amp; feedback</h2>
        </CardHeader>
        <CardBody className={bodyClass}>
          <p>
            My LoL Skins is a project created for the League of Legends community. If you enjoy it, you can
            support its development with a voluntary donation. Questions, bug reports and ideas are welcome
            on X.
          </p>
          <ul className={listClass}>
            <li>
              <Link href="https://buymeacoffee.com/Zentaury" isExternal className="text-primary">
                Support via Buy Me a Coffee
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/MyLoLSkinsApp" isExternal className="text-primary">
                @MyLoLSkinsApp on X
              </Link>
            </li>
            <li>
              <Link href="https://github.com/zentaury" isExternal className="text-primary">
                Zentaury on GitHub
              </Link>
            </li>
          </ul>
          <p className="text-small text-default-500 mt-2">
            <strong>Disclaimer:</strong> My LoL Skins is not endorsed by Riot Games and does not reflect
            the views or opinions of Riot Games or anyone officially involved in producing or managing
            League of Legends. League of Legends and all associated properties are trademarks or
            registered trademarks of Riot Games, Inc.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
