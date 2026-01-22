/**
 * Migration utility to update existing skins with rarity and automatic pricing
 */

import { db } from "@/db/IndexedDB";
import { getSkinRarityData } from "@/app/api/dataDragonAPI";
import { estimateSkinPrice } from "./skinPricing";

export interface MigrationProgress {
  total: number;
  processed: number;
  updated: number;
  skipped: number;
  errors: number;
}

export async function migrateSkinPrices(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationProgress> {
  const progress: MigrationProgress = {
    total: 0,
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    // Get all skins from the database
    const allSkins = await db.skins.toArray();
    progress.total = allSkins.length;

    // Update progress
    onProgress?.(progress);

    // Process each skin
    for (const skin of allSkins) {
      try {
        // Reconstruct correct skinId (Community Dragon format)
        // Format: championKey + skinNum (padded to 3 digits)
        const correctSkinId = `${skin.key}${String(skin.skinNum).padStart(3, '0')}`;
        
        // Check if skinId needs to be updated
        const needsSkinIdUpdate = skin.skinId !== correctSkinId;

        // Get rarity data from Community Dragon using correct skinId
        const rarityData = await getSkinRarityData(correctSkinId);

        if (rarityData) {
          // Calculate automatic price
          const isBase = skin.skinNum === 0;
          const autoPrice = estimateSkinPrice(rarityData.rarity, isBase);

          // Update skin in database
          await db.skins.update(skin.id!, {
            skinId: correctSkinId, // Always update to correct format
            rarity: rarityData.rarity,
            isBase: isBase,
            // Only update rpPrice if it's not already set by user
            ...(skin.rpPrice === undefined && { rpPrice: autoPrice }),
          });

          progress.updated++;
        } else {
          // No rarity data found, but still update skinId if needed
          if (needsSkinIdUpdate) {
            await db.skins.update(skin.id!, {
              skinId: correctSkinId,
            });
            progress.updated++;
          } else {
            progress.skipped++;
          }
        }

        progress.processed++;
        onProgress?.(progress);

        // Small delay to avoid overwhelming the API
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Error processing skin ${skin.skinId}:`, error);
        progress.errors++;
        progress.processed++;
        onProgress?.(progress);
      }
    }

    return progress;
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

/**
 * Migrate wishlist skins as well
 */
export async function migrateWishlistPrices(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationProgress> {
  const progress: MigrationProgress = {
    total: 0,
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  try {
    const allSkins = await db.wishlist.toArray();
    progress.total = allSkins.length;
    onProgress?.(progress);

    for (const skin of allSkins) {
      try {
        // Reconstruct correct skinId (Community Dragon format)
        const correctSkinId = `${skin.key}${String(skin.skinNum).padStart(3, '0')}`;
        
        // Check if skinId needs to be updated
        const needsSkinIdUpdate = skin.skinId !== correctSkinId;

        // Get rarity data from Community Dragon using correct skinId
        const rarityData = await getSkinRarityData(correctSkinId);

        if (rarityData) {
          const isBase = skin.skinNum === 0;
          const autoPrice = estimateSkinPrice(rarityData.rarity, isBase);

          await db.wishlist.update(skin.id!, {
            skinId: correctSkinId, // Always update to correct format
            rarity: rarityData.rarity,
            isBase: isBase,
            ...(skin.rpPrice === undefined && { rpPrice: autoPrice }),
          });

          progress.updated++;
        } else {
          // No rarity data found, but still update skinId if needed
          if (needsSkinIdUpdate) {
            await db.wishlist.update(skin.id!, {
              skinId: correctSkinId,
            });
            progress.updated++;
          } else {
            progress.skipped++;
          }
        }

        progress.processed++;
        onProgress?.(progress);
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Error processing wishlist skin ${skin.skinId}:`, error);
        progress.errors++;
        progress.processed++;
        onProgress?.(progress);
      }
    }

    return progress;
  } catch (error) {
    console.error("Wishlist migration failed:", error);
    throw error;
  }
}

/**
 * Migrate both collection and wishlist
 */
export async function migrateAllSkins(
  onProgress?: (progress: { collection: MigrationProgress; wishlist: MigrationProgress }) => void
): Promise<{ collection: MigrationProgress; wishlist: MigrationProgress }> {
  const collectionProgress = await migrateSkinPrices((p) => {
    onProgress?.({ collection: p, wishlist: { total: 0, processed: 0, updated: 0, skipped: 0, errors: 0 } });
  });

  const wishlistProgress = await migrateWishlistPrices((p) => {
    onProgress?.({ collection: collectionProgress, wishlist: p });
  });

  return {
    collection: collectionProgress,
    wishlist: wishlistProgress,
  };
}
