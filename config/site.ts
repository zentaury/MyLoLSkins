export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My LoL Skins",
  description: "Manage Your League Of Legends Skins",
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
      label: "About",
      href: "/about",
    },
    // {
    //   label: "Favorites",
    //   href: "/favorites",
    // }
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
      label: "About",
      href: "/about",
    },
    // {
    //   label: "Favorites",
    //   href: "/favorites",
    // },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://paypal.me/Zentaury?country.x=SV&locale.x=es_XC",
  },
};
