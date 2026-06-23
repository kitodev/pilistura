import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "12", label: "Útvonal", suffix: "+" },
  { value: "1100", label: "Kilométer terep", suffix: "+" },
  { value: "7", label: "Történelmi hős", suffix: "" },
  { value: "500", label: "Teljesítés", suffix: "+" },
];

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-foreground text-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm md:text-base text-background/60 tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
