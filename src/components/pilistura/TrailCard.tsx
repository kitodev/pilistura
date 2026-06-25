// @ts-nocheck
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, TrendingUp, ArrowRight, Navigation } from "lucide-react";
import ElevationProfile from "./ElevationProfile";

const DIFFICULTY_COLORS = {
  easy: "text-green-600",
  moderate: "text-amber-600",
  hard: "text-orange-600",
  extreme: "text-red-600",
};

const DIFFICULTY_LABELS = {
  easy: "Könnyű",
  moderate: "Közepes",
  hard: "Nehéz",
  extreme: "Extrém",
};

export default function TrailCard({ trail, index, onHover, isActive }) {
  const router = useRouter();

  return (
    <motion.div
      data-trail-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => onHover && onHover(trail.id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`group relative flex-shrink-0 w-[min(84vw,320px)] sm:w-[320px] md:w-[360px] snap-start transition-all duration-500 ${
        isActive === false ? "opacity-30 scale-[0.98]" : ""
      }`}
    >
      <div className="relative overflow-hidden bg-card border border-border">
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={trail.image}
            alt={trail.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Distance badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-bold tracking-wider uppercase">
            {trail.distance}
          </div>

          {/* Elevation profile overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-2">
            <ElevationProfile difficulty={trail.difficulty} className="w-full h-10 text-white/60" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
            <span className={`text-xs font-bold tracking-wider uppercase ${DIFFICULTY_COLORS[trail.difficulty]}`}>
              {DIFFICULTY_LABELS[trail.difficulty]}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="text-muted-foreground text-xs">{trail.historicalFigure}</span>
          </div>

          <h3 className="font-heading font-bold text-lg text-foreground tracking-tight leading-tight mb-3">
            {trail.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1 min-w-0">
              <TrendingUp className="w-3.5 h-3.5" />
              {trail.elevation}
            </span>
            <span className="flex items-center gap-1 min-w-0">
              <Clock className="w-3.5 h-3.5" />
              {trail.time}
            </span>
            <span className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3.5 h-3.5" />
              Piliszentlászló
            </span>
          </div>

          {/* Sensory tag */}
          <div className="text-xs italic text-muted-foreground/70 mb-4 border-l-2 border-accent/30 pl-3">
            {trail.sensoryTag}
          </div>

          {/* GPS Coordinate */}
          {trail.gps && (
            <a
              href={`geo:${trail.gps.lat},${trail.gps.lng}?q=${trail.gps.lat},${trail.gps.lng}(${encodeURIComponent(trail.name)})`}
              onClick={(e) => {
                // On non-mobile or if geo: not supported, fall back to Google Maps
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (!isMobile) {
                  e.preventDefault();
                  window.open(`https://www.google.com/maps?q=${trail.gps.lat},${trail.gps.lng}`, "_blank");
                }
              }}
              className="flex items-center gap-2 w-full mb-4 bg-muted hover:bg-accent/10 border border-border hover:border-accent/40 px-3 py-2.5 transition-colors duration-200 group/gps"
              title="Megnyitás térképen"
            >
              <Navigation className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="min-w-0 truncate font-mono text-[11px] sm:text-xs text-muted-foreground group-hover/gps:text-foreground transition-colors">
                {trail.gps.label}
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-wider text-accent font-semibold opacity-0 group-hover/gps:opacity-100 transition-opacity">
                Megnyitás
              </span>
            </a>
          )}

          <button
            onClick={() => router.push(trail.href || "/nevezes")}
            className="w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 text-sm font-semibold tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 group/btn"
          >
            Részletek
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          {trail.alltrails_url && (
            <a
              href={trail.alltrails_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 bg-foreground text-background py-3 text-sm font-semibold tracking-wider uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 group/alltrails"
            >
              AllTrails
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/alltrails:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
