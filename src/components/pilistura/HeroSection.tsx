// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TopoLines from "./TopoLines";

export default function HeroSection({ heroImage }) {
  const scrollToTrails = () => {
    const el = document.querySelector("#trails");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[640px] h-[100svh] sm:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A Pilis hegység gerince napkeltekor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Topo overlay */}
      <TopoLines className="text-white" opacity={0.06} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-28 px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-white/60 text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 md:mb-6">
              47°42'N 18°54'E — Pilis hegység
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="font-heading font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[110px] leading-[0.9] uppercase"
          >
            A Gerinc
            <br />
            <span className="text-accent">Hív.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            className="mt-6 md:mt-8 text-white/70 text-base sm:text-lg md:text-xl max-w-xl font-light leading-relaxed"
          >
            Túra- és terepfutó sorozat a Pilis szívében. Teljesítsd az
            útvonalakat, fedezd fel a természetet, és légy része a közösségnek.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              onClick={scrollToTrails}
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground px-6 sm:px-8 py-4 font-semibold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 hover:translate-y-[-2px]"
            >
              Fedezd fel az útvonalakat
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto border border-white/30 text-white/90 px-6 sm:px-8 py-4 font-medium tracking-widest uppercase text-xs sm:text-sm hover:bg-white/10 transition-all duration-300"
            >
              Történetünk
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
