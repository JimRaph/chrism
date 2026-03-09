import Hero from '@/components/home/Hero';
import VisionMissionValues from '@/components/home/VisionMissionValues';
import ServiceHighlights from '@/components/home/ServiceHighlights';
import Partners from '@/components/home/Partners';
import StatsBar from '@/components/home/StatsBar';

export default function HomePage() {
  return (
    <>
      <Hero />
      <VisionMissionValues />
      <ServiceHighlights />
      <StatsBar />
      <Partners />
    </>
  );
}
