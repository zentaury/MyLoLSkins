import { MetadataRoute } from 'next';

import { getAllChampionsList } from './api/dataDragonAPI';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mylolskins.com';

  const staticPages = [
    '',
    'my-skins',
    'wishlist',
    'news',
    'about',
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date().toISOString(),
  }));

  // Fetch dynamic pages from Data Dragon API
  const championsData = await getAllChampionsList();
  const champions = Object.keys(championsData);

  const dynamicPages = champions.map((championKey) => ({
    url: `${baseUrl}/${championKey}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticPages, ...dynamicPages];
}