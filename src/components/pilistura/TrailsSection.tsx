// @ts-nocheck
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrailCard from "./TrailCard";
import TopoLines from "./TopoLines";

export default function TrailsSection({ trails }) {
  const [hoveredId, setHoveredId] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.querySelector("[data-trail-card]");
    const gap = 24;
    const amount = firstCard ? firstCard.getBoundingClientRect().width + gap : scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="trails" className="relative py-16 sm:py-20 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.04} />

      <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-24 mb-10 md:mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
              Expedíciók
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground uppercase leading-none">
                  Útvonalak
                </h2>
                <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
                  Válassz a túra- és futóútvonalak közül — mindegyik a piliszentlászlói Hunyadi Vendégfogadótól indul és oda tér vissza.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  aria-label="Előző útvonal"
                  className="w-11 h-11 sm:w-12 sm:h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  aria-label="Következő útvonal"
                  className="w-11 h-11 sm:w-12 sm:h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scrolling trail cards */}
      <div
        ref={scrollRef}
        className="relative z-10 flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 md:px-16 lg:px-24 pb-6 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "auto", msOverflowStyle: "auto", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
      >
        {trails.map((trail, i) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            index={i}
            onHover={setHoveredId}
            isActive={hoveredId === null ? null : hoveredId === trail.id}
          />
        ))}
      </div>
    </section>
  );
}
