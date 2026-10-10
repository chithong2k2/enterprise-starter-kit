import { getSettings, getServices, getPosts } from '@/lib/db';
import HomePageClient from '@/components/HomePageClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [settings, services, posts] = await Promise.all([
    getSettings(),
    getServices(),
    getPosts()
  ]);

  return <HomePageClient settings={settings} services={services} posts={posts} />;
}
