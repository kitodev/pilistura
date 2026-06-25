// @ts-nocheck
import React from "react";
import Navbar from "@/components/pilistura/Navbar";
import HeroSection from "@/components/pilistura/HeroSection";
import TrailsSection from "@/components/pilistura/TrailsSection";
import AboutSection from "@/components/pilistura/AboutSection";
import StatsSection from "@/components/pilistura/StatsSection";
import FeaturesSection from "@/components/pilistura/FeaturesSection";
import InfoSection from "@/components/pilistura/InfoSection";
import FaqSection from "@/components/pilistura/FaqSection";
import ResultsSection from "@/components/pilistura/ResultsSection";
import TestimonialsSection from "@/components/pilistura/TestimonialsSection";
import CTASection from "@/components/pilistura/CTASection";
import ContactSection from "@/components/pilistura/ContactSection";
import Footer from "@/components/pilistura/Footer";

const HERO_IMG = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85";
const FOREST_IMG = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85";
const MOSS_IMG = "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=85";
const VISTA_IMG = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=85";
const STEPS_IMG = "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1600&q=85";
const RUNNER_IMG = "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=85";
const AERIAL_IMG = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85";

const TRAILS = [
  {
    id: 1,
    name: "Zrínyi Miklós Túra",
    distance: "10 KM",
    difficulty: "easy",
    elevation: "↑ 280m",
    time: "3-4 óra",
    historicalFigure: "Zrínyi Miklós",
    sensoryTag: "Illat: vadfokhagyma & friss moha",
    image: FOREST_IMG,
    gps: { lat: 47.7006, lng: 18.9012, label: "47°42'02\"N 18°54'04\"E" },
    href: "/utvonalak/zrinyi-miklos-10",
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+Piliszentlászló",
  },
  {
    id: 2,
    name: "Attila Király Túra",
    distance: "10 KM",
    difficulty: "moderate",
    elevation: "↑ 350m",
    time: "3-5 óra",
    historicalFigure: "Attila Király",
    sensoryTag: "Hang: szélzúgás a bükkfák koronáiban",
    image: MOSS_IMG,
    gps: { lat: 47.7124, lng: 18.8954, label: "47°42'44\"N 18°53'43\"E" },
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+Dobogókő",
  },
  {
    id: 3,
    name: "Mátyás Király Expedíció",
    distance: "50 KM",
    difficulty: "extreme",
    elevation: "↑ 1650m",
    time: "12-16 óra",
    historicalFigure: "Mátyás Király",
    sensoryTag: "Látvány: 360° panoráma a Dobogókőről",
    image: VISTA_IMG,
    gps: { lat: 47.7281, lng: 18.8731, label: "47°43'41\"N 18°52'23\"E" },
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+gerinc",
  },
  {
    id: 4,
    name: "Hunyadi János Túra",
    distance: "25 KM",
    difficulty: "hard",
    elevation: "↑ 820m",
    time: "6-9 óra",
    historicalFigure: "Hunyadi János",
    sensoryTag: "Érzés: mészkőszirt a talpak alatt",
    image: RUNNER_IMG,
    gps: { lat: 47.7198, lng: 18.9083, label: "47°43'11\"N 18°54'30\"E" },
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+Piliszentlászló",
  },
  {
    id: 5,
    name: "Szent István Túra",
    distance: "20 KM",
    difficulty: "moderate",
    elevation: "↑ 580m",
    time: "5-7 óra",
    historicalFigure: "Szent István",
    sensoryTag: "Illat: fenyőgyanta & erdei menta",
    image: AERIAL_IMG,
    gps: { lat: 47.7053, lng: 18.8867, label: "47°42'19\"N 18°53'12\"E" },
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+Visegrádi",
  },
  {
    id: 6,
    name: "Rákóczi Ferenc Túra",
    distance: "30 KM",
    difficulty: "hard",
    elevation: "↑ 950m",
    time: "8-11 óra",
    historicalFigure: "II. Rákóczi Ferenc",
    sensoryTag: "Hang: patakzúgás a szurdokvölgyben",
    image: STEPS_IMG,
    gps: { lat: 47.7342, lng: 18.9201, label: "47°44'03\"N 18°55'12\"E" },
    alltrails_url: "https://www.alltrails.com/search?q=Pilis+szurdok",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection heroImage={HERO_IMG} />
      <TrailsSection trails={TRAILS} />
      <StatsSection />
      <AboutSection forestImage={FOREST_IMG} mossImage={MOSS_IMG} />
      <FeaturesSection stepsImage={STEPS_IMG} />
      <InfoSection trailImage={RUNNER_IMG} />
      <ResultsSection />
      <FaqSection />
      <TestimonialsSection />
      <CTASection vistaImage={AERIAL_IMG} />
      <ContactSection />
      <Footer />
    </div>
  );
}
