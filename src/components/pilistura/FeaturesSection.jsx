import React from "react";
import { motion } from "framer-motion";
import { Route, Trophy, Users, QrCode, Timer, Utensils } from "lucide-react";
import TopoLines from "./TopoLines";

const FEATURES = [
  {
    icon: Route,
    title: "12+ Útvonal",
    desc: "Különböző nehézségű és hosszúságú túra- és futóútvonalak a Pilis legszebb tájain.",
  },
  {
    icon: Trophy,
    title: "Jutalmak & Érmek",
    desc: "Minden teljesítés után érem, oklevél és kuponok — a legjobbaknak különdíjak.",
  },
  {
    icon: Users,
    title: "Közösség",
    desc: "Egyedül, családdal vagy barátokkal — a dicsőségfalon nyomon követheted a fejlődésed.",
  },
  {
    icon: QrCode,
    title: "QR Ellenőrzés",
    desc: "Minden ponton QR kóddal igazolod a teljesítést — precíz, digitális nyomkövetés.",
  },
  {
    icon: Timer,
    title: "Rugalmas Időzítés",
    desc: "Nincs időbeli megkötés — bármikor, a számodra legmegfelelőbb időpontban rajtolhatsz.",
  },
  {
    icon: Utensils,
    title: "Vendégfogadó",
    desc: "A célban zuhanyzás, étel-ital és pihenés vár a Hunyadi Vendégfogadóban.",
  },
];

export default function FeaturesSection({ stepsImage }) {
  return (
    <section className="relative py-24 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Miért a PilisTúra?
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight uppercase leading-none">
            Több mint túrázás
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 border border-border hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <div className="relative w-full h-48 md:h-72 overflow-hidden">
            <img
              src={stepsImage}
              alt="Lábnyomok a hegyi ösvényen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight uppercase text-center drop-shadow-lg">
                Indulj el. <span className="text-accent">Ma.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
