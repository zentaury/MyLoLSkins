
const DATA_DRAGON_API="https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US"

export async function getAllChampionsList() {
    const response = await fetch(DATA_DRAGON_API + "/champion.json");
    const data = await response.json();
    return data.data;
}