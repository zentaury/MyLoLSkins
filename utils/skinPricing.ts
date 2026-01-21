/**
 * Skin pricing utilities
 * Maps Community Dragon rarity to RP prices
 */

export const SKIN_PRICE_MAP: Record<string, number> = {
  'kUltimate': 3250,      // Ultimate skins
  'kLegendary': 1820,     // Legendary skins
  'kEpic': 1350,          // Epic skins (most modern skins)
  'kMythic': 1350,        // Prestige/Hextech skins
  'kExalted': 1350,       // Exalted skins
  'kTranscendent': 1820,  // Transcendent skins
  'kRare': 975,           // Rare skins
  // kNoRarity is intentionally omitted - user will set price manually
};

/**
 * Estimates the RP price of a skin based on its rarity
 * Returns undefined for kNoRarity skins (user should set manually)
 */
export function estimateSkinPrice(rarity: string | undefined, isBase: boolean = false): number | undefined {
  // Default/base skins are free
  if (isBase) return 0;
  
  // If no rarity or kNoRarity, return undefined (user will set manually)
  if (!rarity || rarity === 'kNoRarity') {
    return undefined;
  }
  
  // Return mapped price or undefined
  return SKIN_PRICE_MAP[rarity];
}

/**
 * Gets a human-readable rarity name
 */
export function getRarityDisplayName(rarity: string | undefined): string {
  const rarityNames: Record<string, string> = {
    'kUltimate': 'Ultimate',
    'kLegendary': 'Legendary',
    'kEpic': 'Epic',
    'kMythic': 'Mythic',
    'kExalted': 'Exalted',
    'kTranscendent': 'Transcendent',
    'kRare': 'Rare',
    'kNoRarity': 'Standard'
  };
  
  return rarityNames[rarity || 'kNoRarity'] || 'Unknown';
}
