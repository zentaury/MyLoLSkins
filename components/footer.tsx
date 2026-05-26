import React from "react";
import Link from "next/link";
import { HexLogo } from "@/components/icons";

const Footer = () => {
  return (
    <footer className="border-t border-divider mt-auto">
      <div className="container mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 opacity-70">
            <HexLogo size={18} />
            <span className="font-display font-bold text-sm text-foreground">My LoL Skins</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-tiny text-default-400 text-center md:text-right max-w-md">
              Not endorsed by Riot Games, Inc. All trademarks are property of their respective owners.
            </p>
            <Link
              href="https://github.com/zentaury"
              className="text-tiny text-primary hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Created by Zentaury
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;