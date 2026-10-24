import { Metadata } from "next";

import { WishlistGrid } from "@/components/wishlist-grid";

export const metadata: Metadata = {
    title: "Wishlist",
    robots: { index: false, follow: true },
};

export default function WishlistPage() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <WishlistGrid />
        </section>
    );
}
