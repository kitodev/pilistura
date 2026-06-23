import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TopoLines from "./TopoLines";

const FAQS = [
  {
    q: "Hogyan tudok nevezni egy túrára?",
    a: "Válaszd ki a kívánt útvonalat az Útvonalak szekcióban, kattints a Nevezés gombra, majd add meg az adataidat. A nevezés online, néhány perc alatt elvégezhető.",
  },
  {
    q: "Mi az a QR-kódos ellenőrzés?",
    a: "Az útvonalak mentén ellenőrzőpontokat helyeztünk el QR-kódokkal. Mobiloddal beolvasva igazolod, hogy teljesítetted az adott szakaszt — így rögzítjük az eredményed és jár az érem.",
  },
  {
    q: "Milyen felszerelésre van szükségem?",
    a: "Kényelmes túracipő, az időjárásnak megfelelő réteges öltözet, elegendő víz és egy feltöltött telefon a QR-kódok beolvasásához. A hosszabb túrákhoz térképet és energiapótlást is ajánlunk.",
  },
  {
    q: "Alkalmasak az útvonalak családoknak?",
    a: "Igen! A Könnyű és Közepes besorolású útvonalak gyerekekkel is teljesíthetők. Mindig az aktuális résztvevők erőnlétéhez igazítsd a választást.",
  },
  {
    q: "Mikor és meddig teljesíthetők a túrák?",
    a: "Az útvonalak egész évben, saját tempóban teljesíthetők — nincs fix rajtidő. Napkeltétől napnyugtáig bármikor nekiindulhatsz a Hunyadi Vendégfogadótól.",
  },
  {
    q: "Kapok-e valamilyen elismerést a teljesítésért?",
    a: "Minden teljesített útvonalért egyedi érem és digitális oklevél jár. A pontjaid az Eredmények ranglistán is megjelennek.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="relative py-16 sm:py-20 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
            Gyakori Kérdések
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-none">
            Amit tudnod kell
            <br />
            indulás előtt
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border bg-muted/40 px-4 sm:px-5"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground text-base md:text-lg hover:no-underline hover:text-accent">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
