import { getHomePageData } from '../lib/supabase';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

// Revalidate every hour for ISR
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch all home page data from Supabase
  const data = await getHomePageData();

  return (
    <>
      <Hero data={data?.hero} />
      <Features data={data?.features} />
      <HowItWorks data={data?.steps} />
      <Testimonials data={data?.testimonials} />
    </>
  );
}