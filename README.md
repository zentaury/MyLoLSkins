# 🎮 My LoL Skins

<div align="center">

![My LoL Skins](https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg)

**Your Personal League of Legends Skin Collection Manager**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-mylolskins.com-blue?style=for-the-badge)](https://mylolskins.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📖 About

**My LoL Skins** is a web application designed for League of Legends players who want to keep track of their skin collection. Browse all champions, explore their skins, build your personal collection, and track its value in RP—all stored locally in your browser.

🔗 **Try it now:** [mylolskins.com](https://mylolskins.com)

---

## ✨ Features

### 🏆 Champion Browser
- Browse all League of Legends champions with beautiful loading screen artwork
- Real-time search and filtering
- Always up-to-date with Riot's Data Dragon API

### 🎨 Skin Collection
- View all available skins for each champion
- Add skins to your personal collection with a single click
- Visual indicator showing which skins you already own
- Remove skins from your collection easily

### 💰 RP Value Tracking
- **Automatic RP pricing** based on skin rarity from Community Dragon API
- Set custom RP prices for each skin in your collection
- Quick-select buttons for common RP values (520, 750, 975, 1350, 1820, 3250)
- Calculate the total value of your entire collection
- **Auto-Assign RP Prices** tool to automatically price all skins based on rarity

### 📊 Collection Statistics
- Total skins owned
- Number of champions with skins
- Champion with the most skins
- Average skins per champion
- Total RP value of your collection

### 🌓 Dark/Light Mode
- Beautiful dark theme by default
- Toggle between themes with ease

---

## 🛠️ Tech Stack

### 💕 Wishlist
- Save skins you want to acquire to a dedicated list
- Toggle skins with a simple heart icon
- View your wishlist in a separate gallery

### 📸 Flex Card (Social Share)
- Generate a beautiful card with your collection stats
- Customize with your Summoner Name
- Features your "Crown Jewel" (most expensive skin) as the background
- Download and share on social media

### 💾 Collection Management (Options Menu)
- **Auto-Assign RP Prices**: Automatically assign RP prices to all skins based on their rarity
- **Export Collection**: Download your entire collection as a JSON backup file
- **Import Collection**: Restore or merge collections from backup files
- **Share Collection**: Generate and download a beautiful flex card with your collection stats
- All tools accessible from a convenient dropdown menu in My Skins page

### 🔍 Advanced Filtering
- Filter champions by "Owned" status
- Filter skins by RP Price tiers

### 💰 Donation System & RP Tracking
- Set RP prices and track total collection value
- Support development via "Buy Me a Coffee"
- Ad-free experience

### 📰 News Feed
- Stay updated with official announcements
- Integrated X (Twitter) timeline
- Never miss a new feature update

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React Framework (App Router) |
| [React 19](https://react.dev/) | User Interface |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| [NextUI v2](https://nextui.org/) | UI Components |
| [TailwindCSS](https://tailwindcss.com/) | Styling |
| [Dexie.js](https://dexie.org/) | IndexedDB Wrapper (Local Storage) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Riot Data Dragon API](https://developer.riotgames.com/docs/lol#data-dragon) | Champion & Skin Data |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zentaury/MyLoLSkins.git
   cd MyLoLSkins
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Card Images Size
   NEXT_PUBLIC_CARD_WIDTH=350
   NEXT_PUBLIC_CARD_HEIGHT=550

   # Data Dragon API
   NEXT_PUBLIC_DATA_DRAGON_GAME_PATCH_VERSION_URL="https://ddragon.leagueoflegends.com/api/versions.json"
   NEXT_PUBLIC_DATA_DRAGON_BASE_URL="https://ddragon.leagueoflegends.com/cdn"
   NEXT_PUBLIC_DATA_DRAGON_LANGUAGE="en_US"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
MyLoLSkins/
├── app/
│   ├── [championName]/     # Dynamic champion pages
│   ├── about/              # About page
│   ├── my-skins/           # Personal collection page
│   ├── api/                # Data Dragon API client
│   ├── interfaces/         # TypeScript interfaces
│   ├── layout.tsx          # Root layout with SEO
│   └── page.tsx            # Home page (Champions grid)
├── components/             # Reusable UI components
├── config/                 # Site configuration & SEO
├── db/                     # IndexedDB configuration
├── public/                 # Static assets
├── styles/                 # Global styles
└── types/                  # TypeScript types
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💖 Support

If you enjoy using My LoL Skins and would like to support its development:

<a href="https://www.buymeacoffee.com/Zentaury" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

**My LoL Skins** is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

---

<div align="center">

Made with ❤️ by [Zentaury](https://github.com/Zentaury)

</div>
