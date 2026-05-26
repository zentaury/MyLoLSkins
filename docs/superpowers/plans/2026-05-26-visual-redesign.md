# Visual Redesign — Hextech Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la identidad visual genérica de la app (Inter, NextUI defaults, gray footer) por una estética "Hextech Dark" coherente con el universo de League of Legends.

**Architecture:** Todos los cambios son aditivos o de reemplazo dentro de archivos existentes. El sistema de color se centraliza en `tailwind.config.js` vía el plugin de NextUI. La tipografía vive en `config/fonts.ts` y se propaga como variables CSS. Los cambios visuales de componentes usan clases Tailwind + clsx.

**Tech Stack:** Next.js 15, NextUI v2, Tailwind CSS 3, next/font/google, clsx.

---

### Task 1: Tipografía — Syne + DM Sans

**Files:**
- Modify: `config/fonts.ts`
- Modify: `tailwind.config.js`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Reemplazar fuentes en `config/fonts.ts`**

```typescript
import { Syne, DM_Sans, Fira_Code as FontMono } from "next/font/google";

export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
```

- [ ] **Step 2: Registrar `font-display` en `tailwind.config.js`**

Reemplazar el bloque `theme.extend.fontFamily` completo:

```js
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-sans)"],
      mono: ["var(--font-geist-mono)"],
      display: ["var(--font-display)"],
    },
  },
},
```

- [ ] **Step 3: Añadir `fontDisplay.variable` al body en `app/layout.tsx`**

Localizar la importación de `fontSans` y añadir `fontDisplay`:

```tsx
import { fontSans, fontDisplay } from "@/config/fonts";
```

Luego en el className del `<body>`:

```tsx
<body
  className={clsx(
    "min-h-screen bg-background font-sans antialiased",
    fontSans.variable,
    fontDisplay.variable,
  )}
>
```

- [ ] **Step 4: Verificar build**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully` sin errores.

---

### Task 2: Hextech Color Palette en NextUI

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Configurar tema hextech en el plugin nextui**

Reemplazar el bloque `plugins` completo en `tailwind.config.js`:

```js
plugins: [
  nextui({
    themes: {
      dark: {
        colors: {
          background: "#010A13",
          foreground: "#F0E6D3",
          primary: {
            50:  "#FFF8E1",
            100: "#FFECB3",
            200: "#FFE082",
            300: "#FFD54F",
            400: "#FFCA28",
            500: "#C89B3C",
            600: "#A07830",
            700: "#785624",
            800: "#503418",
            900: "#28120C",
            DEFAULT: "#C89B3C",
            foreground: "#010A13",
          },
          focus: "#C89B3C",
        },
      },
      light: {
        colors: {
          primary: {
            DEFAULT: "#C89B3C",
            foreground: "#010A13",
          },
          focus: "#C89B3C",
        },
      },
    },
  }),
],
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully`.

---

### Task 3: Hex Grid Background

**Files:**
- Modify: `styles/globals.css`

- [ ] **Step 1: Añadir patrón de hexágonos y estilos base**

Reemplazar el contenido completo de `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --hex-stroke: rgba(200, 155, 60, 0.05);
  }

  .dark {
    --hex-stroke: rgba(200, 155, 60, 0.06);
  }

  body {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97'%3E%3Cpath d='M28 64L0 48V16L28 0L56 16V48L28 64ZM28 97L0 81V49L28 33L56 49V81L28 97Z' fill='none' stroke='rgba(200%2C155%2C60%2C0.06)' stroke-width='1'/%3E%3C/svg%3E");
    background-size: 56px 97px;
    background-attachment: fixed;
  }
}
```

- [ ] **Step 2: Verificar build**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully`.

---

### Task 4: Champion Card — Owned Glow Dorado

**Files:**
- Modify: `components/champion-card.tsx`

- [ ] **Step 1: Añadir import de clsx y owned glow**

Añadir import de clsx al archivo (si no existe):

```tsx
import clsx from "clsx";
```

- [ ] **Step 2: Aplicar clases condicionales de glow en el Card**

Reemplazar el componente completo `champion-card.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { ChampionCardProps } from "@/app/interfaces/champion-card-interface";

export function ChampionCard({ championKey, name, title, skinNumber, ownedCount, priority = false }: ChampionCardProps) {
    const router = useRouter();
    const isOwned = ownedCount !== undefined && ownedCount > 0;

    return (
        <Card
            isPressable
            isHoverable
            onPress={() => router.push(`/${championKey}`)}
            className={clsx(
                "border-none cursor-pointer overflow-hidden transition-all duration-300",
                isOwned && [
                    "ring-1 ring-[#C89B3C]",
                    "shadow-[0_0_18px_rgba(200,155,60,0.35)]",
                ]
            )}
            radius="lg"
        >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start w-full">
                {isOwned && (
                    <div className="absolute top-0 right-0 z-20 m-2">
                        <Chip
                            size="sm"
                            variant="flat"
                            className="text-tiny font-bold shadow-lg bg-[#C89B3C]/20 border border-[#C89B3C]/60 text-[#C89B3C]"
                        >
                            {ownedCount} OWNED
                        </Chip>
                    </div>
                )}
                <p className="text-tiny text-white/60 uppercase font-bold tracking-widest">{title}</p>
                <h4 className="text-white font-display font-bold text-large">{name}</h4>
            </CardHeader>
            <Image
                isZoomed
                as={NextImage}
                priority={priority}
                alt={`${name} - ${title}`}
                className="z-0 w-full h-full object-cover"
                classNames={{
                    wrapper: "w-full h-full",
                    img: "w-full h-full object-cover"
                }}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championKey}_${skinNumber}.jpg`}
                width={process.env.NEXT_PUBLIC_CARD_WIDTH}
                height={process.env.NEXT_PUBLIC_CARD_HEIGHT}
            />
        </Card>
    );
}
```

- [ ] **Step 3: Verificar build**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully`.

---

### Task 5: Navbar — Logo Hextech

**Files:**
- Modify: `components/icons.tsx`
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Añadir `HexLogo` icon a `components/icons.tsx`**

Añadir al final del archivo (antes del último export si lo hay, o simplemente al final):

```tsx
export const HexLogo: React.FC<IconSvgProps> = ({
  size = 28,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    width={size || width}
    viewBox="0 0 28 32"
    {...props}
  >
    <path
      d="M14 1L27 8V24L14 31L1 24V8L14 1Z"
      stroke="#C89B3C"
      strokeWidth="1.5"
      fill="rgba(200,155,60,0.08)"
    />
    <path
      d="M14 8L21 12V20L14 24L7 20V12L14 8Z"
      fill="#C89B3C"
      fillOpacity="0.9"
    />
  </svg>
);
```

- [ ] **Step 2: Actualizar `components/navbar.tsx`**

Reemplazar el contenido completo del archivo:

```tsx
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { HexLogo } from "@/components/icons";

import packageJson from "@/package.json";
import { Chip } from "@nextui-org/chip";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <HexLogo size={26} />
            <p className="font-display font-bold text-inherit tracking-wide">My LoL Skins</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium font-sans",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-2">
          <Chip variant="flat" size="sm" className="border border-[#C89B3C]/30 text-[#C89B3C]/70 text-tiny">
            <span>v{packageJson.version}</span>
          </Chip>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
```

- [ ] **Step 3: Verificar build**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully`.

---

### Task 6: Footer Rediseñado

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Reemplazar el footer con diseño hextech**

Reemplazar el contenido completo de `components/footer.tsx`:

```tsx
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
```

- [ ] **Step 2: Verificar build final**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully` sin warnings.
