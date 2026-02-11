// app/sitemap.ts

import { MetadataRoute } from 'next';
import { createClient } from '@/lib/server/supabase.server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('topic')
    .select("*")
    .eq('status', 'publish')
    .eq('isView', true);

  
  const dynamicRoutes = posts?.map((post) => ({
    url: `https://orange-dol.com/posts/${post.id}`,
    lastModified: new Date(post.created_at),
  })) || [];

  const staticRoutes = [
    {
      url: 'https://orange-dol.com',
      lastModified: new Date(),
    }
  ];

  return [...staticRoutes, ...dynamicRoutes];
}