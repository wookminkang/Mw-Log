// app/sitemap.ts

import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('topic')
    .select("*")
    .eq('status', 'publish')
    .eq('isView', true);

  // [자동화 구역] 2. 가져온 데이터만큼 반복문을 돌려 URL을 만듭니다.
  // 글이 100개면 자동으로 100줄이 생성됩니다.
  const dynamicRoutes = posts?.map((post) => ({
    url: `https://orange-dol.com/posts/${post.id}`,
    lastModified: new Date(post.created_at),
  })) || [];

  // [수동 구역] 3. 고정된 페이지들
  const staticRoutes = [
    {
      url: 'https://orange-dol.com',
      lastModified: new Date(),
    }
  ];

  // 4. 둘을 합쳐서 리턴! (끝)
  return [...staticRoutes, ...dynamicRoutes];
}