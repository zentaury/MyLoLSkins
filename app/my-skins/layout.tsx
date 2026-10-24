import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Skins",
  robots: { index: false, follow: true },
};

export default function MySkinsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <main className="container mx-auto max-w-7xl grow">
        {children}
      </main>
    </section>
  );
}
