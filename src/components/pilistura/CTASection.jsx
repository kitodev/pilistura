import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection({ vistaImage }) {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={vistaImage}
          alt="Pilis hegység panoráma"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-white/50 text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Csatlakozz a közösséghez
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-none mb-6">
            Készen állsz
            <br />
            <span className="text-accent">a kihívásra?</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Regisztrálj, válaszd ki az útvonaladat, és indulj el felfedezni a Pilis
            legszebb ösvényeit. A hegyek várnak.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.querySelector("#trails");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-3"
            >
              Nevezek
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-white/30 text-white/90 px-10 py-4 font-medium tracking-widest uppercase text-sm hover:bg-white/10 transition-all duration-300"
            >
              Kapcsolat
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
