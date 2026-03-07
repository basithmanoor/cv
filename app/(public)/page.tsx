import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/sections/FeaturedWorks";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedWorks />
    </div>
  );
}