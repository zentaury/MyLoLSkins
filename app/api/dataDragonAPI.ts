
let cachedVersion: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

async function getCurrentVersion(): Promise<string> {
  const now = Date.now();
  
  // Verificar si el cache es válido (existe y no ha expirado)
  if (cachedVersion !== null && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedVersion;
  }
  
  // Obtener nueva versión y actualizar cache
  const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_DRAGON_GAME_PATCH_VERSION_URL}`);
  const versions: string[] = await response.json();
  cachedVersion = versions[0]; // La última versión es la primera en la lista
  cacheTimestamp = now;
  
  console.log(`Data Dragon version updated: ${cachedVersion} at ${new Date(now).toISOString()}`);
  return cachedVersion;
}

async function getDataDragonApiUrl(): Promise<string> {
  const version = await getCurrentVersion();
  return `${process.env.NEXT_PUBLIC_DATA_DRAGON_BASE_URL}/${version}/data/${process.env.NEXT_PUBLIC_DATA_DRAGON_LANGUAGE}`;
}

export async function getAllChampionsList() {
  const DATA_DRAGON_API = await getDataDragonApiUrl();
  const response = await fetch(`${DATA_DRAGON_API}/champion.json`);
  const data = await response.json();
  return data.data;
}

export async function getChampionData(championName: string) {
  const DATA_DRAGON_API = await getDataDragonApiUrl();
  const response = await fetch(`${DATA_DRAGON_API}/champion/${championName}.json`);
  const data = await response.json();
  return data;
}
