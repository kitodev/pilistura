import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import TopoLines from "./TopoLines";

const TESTIMONIALS = [
  {
    name: "Kovács Petra",
    role: "Terepfutó",
    trail: "Mátyás Király 50K",
    text: "Életem egyik legjobb futóélménye volt. A táj fenomenális, a szervezés precíz, és a Vendégfogadóban a célba érkezés után érzett meleg fogadtatás feledhetetlen.",
  },
  {
    name: "Szabó Gergő",
    role: "Természetjáró családapa",
    text: "A gyerekekkel a Zrínyi 10K-t teljesítettük. A QR kódos ellenőrzőpontok igazi kalanddá tették számukra a túrát. Alig várják, hogy visszajöjjünk!",
    trail: "Zrínyi Miklós 10K",
  },
  {
    name: "Tóth Réka",
    role: "Sportoló & blogger",
    text: "A Pilis szintemelkedései komoly kihívást nyújtanak, de a kilátások megérik. A rendszer tökéletesen nyomon követi az eredményeidet — motiváló érzés a fejlődést látni.",
    trail: "Attila Király 10K",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-36 bg-muted overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Közösség
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight uppercase leading-none">
            Expedíciós
            <br />
            krónikák
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-background border border-border p-8 group hover:border-accent/30 transition-colors duration-500"
            >
              <Quote className="w-8 h-8 text-accent/20 mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                „{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-accent fill-accent" />
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role} — {t.trail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
