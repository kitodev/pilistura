import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Compass, Shield, Smartphone, Award, Footprints, MapPin } from "lucide-react";
import TopoLines from "./TopoLines";

const INFO_ITEMS = [
  {
    id: "how",
    icon: Compass,
    title: "Hogyan működik?",
    content: "Regisztrálj, válassz távot, és indulj el a Hunyadi Vendégfogadótól. Az ellenőrzőpontokon QR kóddal igazolod a megtett távodat. A rajt és a cél mindig ugyanott van — így nem tudsz eltévedni.",
  },
  {
    id: "safety",
    icon: Shield,
    title: "Biztonság és szabályok",
    content: "A túrákon mindenki a saját felelősségére indul el. Tájékozódj a szintidőkről, ellenőrizd az útvonalakat, és mindig a kijelölt útvonalon haladj. A QR kód kihagyása vagy a szintidő túllépése esetén a teljesítés nem érvényes.",
  },
  {
    id: "tech",
    icon: Smartphone,
    title: "Technikai tudnivalók",
    content: "A teljesítéshez mobil internet előfizetéssel rendelkező telefon szükséges a QR kódok olvasásához. A szervezők bekérhetik az első 10 helyezett GPS trackjét az ellenőrzés céljából.",
  },
  {
    id: "rewards",
    icon: Award,
    title: "Jutalmak és ajándékok",
    content: "A teljesítés végén érmeket, okleveleket és kuponokat kapsz. A legjobban teljesítők egyéb ajándékokat is kapnak. Minden adatod látod a saját profilodban — versenyezhetsz magaddal és másokkal.",
  },
  {
    id: "steps",
    icon: Footprints,
    title: "A teljesítés lépései",
    content: "1. Regisztráció · 2. Nevezés · 3. Start QR kód leolvasása a Vendégfogadónál · 4. Útvonal teljesítése az összes ellenőrzőponton áthaladva · 5. Cél QR kód leolvasása. Ennyi az egész!",
  },
  {
    id: "gear",
    icon: MapPin,
    title: "Ajánlott felszerelés",
    content: "Mobiltelefon (QR olvasó + internet), Pilis turistatérkép, esőkabát, elegendő víz, étel (szendvics, energiaszelet), fejlámpa, személyi iratok. Visszafelé nálunk is feltölthetsz!",
  },
];

export default function InfoSection({ trailImage }) {
  const [openId, setOpenId] = useState("how");

  return (
    <section id="info" className="relative py-24 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info accordion */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Tudnivalók
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight uppercase leading-none mb-10">
                Minden, amit
                <br />
                tudnod kell
              </h2>
            </motion.div>

            <div className="space-y-1">
              {INFO_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-b border-border"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full flex items-center gap-4 py-5 text-left group"
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-accent" : "text-muted-foreground"}`} />
                      <span className={`flex-1 font-heading font-semibold text-base tracking-tight transition-colors duration-300 ${isOpen ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.title}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pl-9 pb-5 text-muted-foreground leading-relaxed text-sm md:text-base">
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="hidden lg:block"
          >
            <div className="relative sticky top-32">
              <img
                src={trailImage}
                alt="Terepfutó a Pilis ösvényein"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              {/* Floating stat */}
              <div className="absolute bottom-8 left-8 right-8 bg-background/90 backdrop-blur-sm p-6 border border-border">
                <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mb-1">
                  Piliszentlászló — Kiindulópont
                </p>
                <p className="font-heading font-bold text-xl text-foreground">
                  Hunyadi Vendégfogadó
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Minden útvonal innen indul és ide tér vissza
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
