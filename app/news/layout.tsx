import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Latest updates and announcements from My LoL Skins.",
  alternates: { canonical: "/news" },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
