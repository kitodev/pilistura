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
    const amount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="trails" className="relative py-24 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.04} />

      <div className="relative z-10 px-6 md:px-16 lg:px-24 mb-12 md:mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Expedíciók
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight uppercase leading-none">
                  Útvonalak
                </h2>
                <p className="mt-4 text-muted-foreground text-lg max-w-lg leading-relaxed">
                  Válassz a túra- és futóútvonalak közül — mindegyik a piliszentlászlói Hunyadi Vendégfogadótól indul és oda tér vissza.
                </p>
              </div>

              {/* Desktop scroll controls */}
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  className="w-12 h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="w-12 h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
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
        className="relative z-10 flex gap-6 overflow-x-auto px-6 md:px-16 lg:px-24 pb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
