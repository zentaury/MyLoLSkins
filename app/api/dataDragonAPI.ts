const VERSIONS_API = "https://ddragon.leagueoflegends.com/api/versions.json";
let cachedVersion: string | null = null;

async function getCurrentVersion(): Promise<string> {
  if (cachedVersion !== null) {
    return cachedVersion;
  }
  const response = await fetch(VERSIONS_API);
  const versions: string[] = await response.json();
  cachedVersion = versions[0]; // La última versión es la primera en la lista
  return cachedVersion;
}

async function getDataDragonApiUrl(): Promise<string> {
  const version = await getCurrentVersion();
  return `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US`;
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