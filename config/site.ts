export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My LoL Skins",
  description: "Manage your League Of Legends Skins",
  navItems: [
    {
      label: "Champions",
      href: "/",
    },
    {
      label: "My Skins",
      href: "/my-skins",
    },
    {
      label: "Favorites",
      href: "/favorites",
    }
  ],
  navMenuItems: [
    {
      label: "Champions",
      href: "/",
    },
    {
      label: "My Skins",
      href: "/my-skins",
    },
    {
      label: "Favorites",
      href: "/favorites",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
