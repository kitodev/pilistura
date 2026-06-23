import React from "react";
import { motion } from "framer-motion";
import TopoLines from "./TopoLines";

export default function AboutSection({ forestImage, mossImage }) {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-36 bg-muted overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Images column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={forestImage}
                alt="Ősi bükkerdő a Pilis mélyén"
                className="w-full aspect-[3/4] object-cover"
              />
              {/* Offset smaller image */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 w-40 md:w-52 border-4 border-background shadow-2xl">
                <img
                  src={mossImage}
                  alt="Moha a karsztkövön"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* Coordinate badge */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 text-white text-xs tracking-[0.2em] font-mono">
              47°42'02"N
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:pl-4"
          >
            <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
              A Történetünk
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-none mb-8">
              Ahol a hegyek
              <br />
              meséket mondanak
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                A PilisTúra ötlete egy gyerekkori álomból született. Alapítónk, Fábián Miklós
                Békéscsabáról indulva, 1994-ben kezdte meg a magyar hegyek felfedezését. Öt éven át
                járta az Országos Kék Túra több mint 1100 kilométerét — csővázas hátizsákkal,
                májkrémes kenyérrel és végtelen lelkesedéssel.
              </p>
              <p>
                Az élet mindig visszahúzta a Pilis hegyei közé. Több mint egy év előkészítő munka
                után, a Pilis Parkerdő támogatásával jött létre ez a komplex túra- és terepfutó
                sorozat — ahol minden útvonal egy történelmi hős nevét viseli.
              </p>
              <p className="font-medium text-foreground">
                A célunk egyszerű: hogy minél több család, fiatal és természetszerető ember a hegyek
                között, a friss levegőn töltse a szabadidejét — nem a képernyő előtt.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-heading font-bold text-xl">FM</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">Fábián Miklós</p>
                <p className="text-sm text-muted-foreground">Alapító — „MadMike"</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
