import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import TopoLines from "./TopoLines";

const RESULTS = [
  { rank: 1, name: "Kovács Bálint", trail: "Mátyás Király Expedíció", time: "11:42:08", points: 980 },
  { rank: 2, name: "Nagy Eszter", trail: "Rákóczi Ferenc Túra", time: "08:14:55", points: 910 },
  { rank: 3, name: "Tóth Gergő", trail: "Hunyadi János Túra", time: "06:02:31", points: 845 },
  { rank: 4, name: "Szabó Réka", trail: "Szent István Túra", time: "05:28:19", points: 720 },
  { rank: 5, name: "Varga Dániel", trail: "Attila Király Túra", time: "03:51:44", points: 640 },
  { rank: 6, name: "Horváth Anna", trail: "Zrínyi Miklós Túra", time: "03:09:12", points: 580 },
  { rank: 7, name: "Kiss Márton", trail: "Hunyadi János Túra", time: "07:33:50", points: 540 },
  { rank: 8, name: "Balogh Júlia", trail: "Szent István Túra", time: "06:18:27", points: 495 },
];

const RANK_ICON = {
  1: { Icon: Trophy, color: "text-amber-500" },
  2: { Icon: Medal, color: "text-slate-400" },
  3: { Icon: Award, color: "text-orange-600" },
};

export default function ResultsSection() {
  return (
    <section id="results" className="relative py-24 md:py-36 bg-muted overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Eredmények
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight uppercase leading-none">
            A gerinc
            <br />
            hódítói
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mt-6">
            A legjobb teljesítmények a QR-ellenőrzött útvonalakon. Te is felkerülhetsz a ranglistára.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-border bg-background"
        >
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Név</div>
            <div className="col-span-4">Útvonal</div>
            <div className="col-span-2">Idő</div>
            <div className="col-span-1 text-right">Pont</div>
          </div>

          {RESULTS.map((r) => {
            const badge = RANK_ICON[r.rank];
            return (
              <div
                key={r.rank}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-b-0 items-center hover:bg-muted/40 transition-colors"
              >
                <div className="col-span-2 md:col-span-1 flex items-center">
                  {badge ? (
                    <badge.Icon className={`w-5 h-5 ${badge.color}`} />
                  ) : (
                    <span className="font-mono text-sm text-muted-foreground">{r.rank}</span>
                  )}
                </div>
                <div className="col-span-10 md:col-span-4 font-heading font-semibold text-foreground">
                  {r.name}
                </div>
                <div className="col-span-7 md:col-span-4 text-sm text-muted-foreground">
                  {r.trail}
                </div>
                <div className="col-span-3 md:col-span-2 font-mono text-sm text-foreground">
                  {r.time}
                </div>
                <div className="col-span-2 md:col-span-1 text-right font-bold text-accent">
                  {r.points}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
