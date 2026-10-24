import { MetadataRoute } from 'next';

import { getAllChampionsList } from './api/dataDragonAPI';

import { siteConfig } from '@/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : siteConfig.url;

  const staticPages = [
    '',
    'news',
    'about',
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
  }));

  // Fetch dynamic pages from Data Dragon API
  const championsData = await getAllChampionsList();
  const champions = Object.keys(championsData);

  const dynamicPages = champions.map((championKey) => ({
    url: `${baseUrl}/${championKey}`,
  }));

  return [...staticPages, ...dynamicPages];
}