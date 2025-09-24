import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className={title({ size: "lg" })}>About My LoL Skins</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Your personal League of Legends skin collection manager
        </p>
      </div>

      {/* What is My LoL Skins */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>What is My LoL Skins?</h2>
        </CardHeader>
        <CardBody>
          <p className="text-default-600 leading-relaxed">
            My LoL Skins is a web application designed for League of Legends players who want to keep track 
            of their skin collection. Built with modern web technologies, it provides an intuitive interface 
            to manage, organize, and value your digital cosmetic investments in League of Legends.
          </p>
          <p className="text-default-600 leading-relaxed mt-4">
            Whether you&apos;re a casual player with a few favorite skins or a collector with hundreds of cosmetics, 
            My LoL Skins helps you organize your collection and understand its value.
          </p>
        </CardBody>
      </Card>

      {/* Key Features */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Key Features</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">🏆 Champion Browser</h3>
              <ul className="space-y-2 text-default-600">
                <li>• Browse all League of Legends champions</li>
                <li>• Real-time search and filtering</li>
                <li>• Updated champion data from Riot&apos;s API</li>
                <li>• High-quality champion artwork</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-secondary">🎨 Skin Collection</h3>
              <ul className="space-y-2 text-default-600">
                <li>• Add skins to your personal collection</li>
                <li>• View all available skins per champion</li>
                <li>• Track owned vs. available skins</li>
                <li>• Remove skins from collection easily</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-success">💰 RP Value Tracking</h3>
              <ul className="space-y-2 text-default-600">
                <li>• Manually set RP prices for your skins</li>
                <li>• Quick-select common RP values</li>
                <li>• Calculate total collection value</li>
                <li>• Track investment in your collection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-warning">📊 Collection Statistics</h3>
              <ul className="space-y-2 text-default-600">
                <li>• Total skins owned</li>
                <li>• Number of champions with skins</li>
                <li>• Average skins per champion</li>
                <li>• Total RP value of collection</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* How It Works */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className={title({ size: "sm" })}>How It Works</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Chip color="primary" variant="flat" className="mt-1 min-h-[44px] flex items-center">1</Chip>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">Browse Champions</h3>
                <p className="text-default-600 leading-relaxed">
                  Start by exploring the champions page where you can search and view all League of Legends champions 
                  with their beautiful loading screen artwork.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Chip color="secondary" variant="flat" className="mt-1 min-h-[44px] flex items-center">2</Chip>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">Explore Skins</h3>
                <p className="text-default-600 leading-relaxed">
                  Click on any champion to view all their available skins. Each skin is displayed with high-quality 
                  images and you can see which ones you already own.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Chip color="success" variant="flat" className="mt-1 min-h-[44px] flex items-center">3</Chip>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">Build Your Collection</h3>
                <p className="text-default-600 leading-relaxed">
                  Add skins to your collection by clicking on them. Your collection is saved locally in your browser 
                  and persists between sessions.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Chip color="warning" variant="flat" className="mt-1 min-h-[44px] flex items-center">4</Chip>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-lg">Track Value</h3>
                <p className="text-default-600 leading-relaxed">
                  Visit your &quot;My Skins&quot; page to add RP prices to your skins and see the total value of your collection. 
                  Use quick-select buttons for common prices or enter custom values.
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>


      {/* Support */}
      <Card>
        <CardHeader>
          <h2 className={title({ size: "sm" })}>Support & Feedback</h2>
        </CardHeader>
        <CardBody>
          <p className="text-default-600 mb-4">
            My LoL Skins is an open-source project created for the League of Legends community. 
            If you enjoy using the application and would like to support its development, you can:
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="https://paypal.me/Zentaury?country.x=SV&locale.x=es_XC" 
              isExternal 
              className="text-primary"
            >
              💝 Support via PayPal
            </Link>
          </div>
          <p className="text-small text-default-500 mt-6">
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
