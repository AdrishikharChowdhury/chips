import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HIW from "@/components/landing/HIW";
import HomeButton from "@/components/landing/HomeButton";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <HIW />
      <Contact />
      <LandingFooter />
      <HomeButton />
    </div>
  )
}