# Donation Button in Search Bar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el `DonationBanner` dismissable por un botón `☕ Support` permanente como primer elemento de la fila de búsqueda en la página de champions.

**Architecture:** Se agrega un `Button` de NextUI directamente en el flex-row de búsqueda en `ChampionsGrid`. El botón dispara el widget de Buy Me a Coffee existente vía `document.getElementById("bmc-wbtn")?.click()`. El componente `DonationBanner` se elimina por completo al no tener más callers.

**Tech Stack:** Next.js 15, React 19, NextUI (`@nextui-org/button`), Tailwind CSS.

---

### Task 1: Agregar el botón Support en champions-grid.tsx

**Files:**
- Modify: `components/champions-grid.tsx`

- [ ] **Step 1: Agregar el import de Button**

En `components/champions-grid.tsx`, el import de `@nextui-org/input` ya existe. Agregar `Button` de NextUI al inicio del archivo junto a los imports existentes:

```tsx
import { Button } from "@nextui-org/button";
```

- [ ] **Step 2: Agregar el botón como primer elemento del flex-row**

Ubicar el `div` con clase `flex flex-col sm:flex-row gap-4 w-full mb-4` (línea ~70) y agregar el botón antes del `Input`:

```tsx
<div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
    <Button
        color="warning"
        variant="flat"
        className="flex-shrink-0"
        onPress={() => (document.getElementById("bmc-wbtn") as HTMLElement | null)?.click()}
    >
        ☕ Support
    </Button>
    <Input
        id="championNameInput"
        className="flex-1"
        type="text"
        label="Find Champion"
        placeholder={inputPlaceholderChampionName}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
    />
    <Select
        label="Filter by Ownership"
        className="w-full sm:w-48"
        defaultSelectedKeys={["all"]}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOwnershipFilter(e.target.value)}
    >
        <SelectItem key="all" value="all">
            Show All
        </SelectItem>
        <SelectItem key="owned" value="owned">
            Owned Only
        </SelectItem>
    </Select>
</div>
```

- [ ] **Step 3: Eliminar DonationBanner del JSX y su import**

Quitar la línea de import:
```tsx
import { DonationBanner } from "./donation-banner";
```

Quitar el bloque JSX completo (el `div` con clase `py-2` que contiene `<DonationBanner />`):
```tsx
<div className="py-2">
    <DonationBanner />
    {/* <OptimizedAdBanner ... /> */}
</div>
```

- [ ] **Step 4: Verificar que el build compila sin errores**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully` sin warnings relacionados a `DonationBanner` o imports no usados.

- [ ] **Step 5: Commit**

```bash
git add components/champions-grid.tsx
git commit -m "feat: add permanent Support button to search bar"
```

---

### Task 2: Eliminar el componente DonationBanner

**Files:**
- Delete: `components/donation-banner.tsx`

- [ ] **Step 1: Verificar que donation-banner.tsx no tiene otros callers**

```bash
grep -r "DonationBanner\|donation-banner" --include="*.tsx" --include="*.ts" .
```

Resultado esperado: cero resultados (ya se eliminó el import en Task 1).

- [ ] **Step 2: Eliminar el archivo**

```bash
rm components/donation-banner.tsx
```

- [ ] **Step 3: Verificar build limpio**

```bash
pnpm build
```

Resultado esperado: `✓ Compiled successfully` sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused DonationBanner component"
```

---

### Task 3: Verificación manual en el navegador

**Files:** ninguno — solo verificación.

- [ ] **Step 1: Levantar el servidor de desarrollo**

```bash
pnpm dev
```

- [ ] **Step 2: Verificar el layout en desktop**

Abrir `http://localhost:3000`. Confirmar que la fila de búsqueda muestra:
```
[ ☕ Support ] [ Find Champion ............. ] [ Filter by Ownership ]
```
Y que el antiguo banner amarillo ya no aparece.

- [ ] **Step 3: Verificar el botón en mobile**

Reducir el ancho del navegador a menos de 640px (`sm` breakpoint). Confirmar que los elementos se apilan verticalmente con el botón primero.

- [ ] **Step 4: Verificar que el botón abre el widget BMC**

Presionar `☕ Support`. Debe abrirse el widget flotante de Buy Me a Coffee (requiere que el script BMC esté cargado — verificar que no hay errores en consola).
