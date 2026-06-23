import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import TopoLines from "./TopoLines";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-36 bg-background overflow-hidden">
      <TopoLines className="text-foreground" opacity={0.03} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4">
              Kapcsolat
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-none mb-8">
              Találkozzunk
              <br />
              a hegyek között
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-10 max-w-md">
              Kérdésed van? Írj nekünk, vagy gyere el személyesen a Hunyadi Vendégfogadóba — szívesen fogadunk!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Helyszín</p>
                  <p className="text-muted-foreground text-sm">Hunyadi Vendégfogadó, Piliszentlászló</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Email</p>
                  <a href="mailto:info@pilistura.hu" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                    info@pilistura.hu
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Telefon</p>
                  <a href="tel:+36301234567" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                    +36 30 123 4567
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-muted flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Nyitvatartás</p>
                  <p className="text-muted-foreground text-sm">Egész évben — napkeltétől napnyugtáig</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center bg-muted p-6 sm:p-12 text-center">
                <div>
                  <div className="w-16 h-16 bg-accent/10 mx-auto flex items-center justify-center mb-6">
                    <Send className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Üzenet elküldve!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Hamarosan felvesszük veled a kapcsolatot.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
                    Név
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-muted border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                    placeholder="A neved"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-muted border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                    placeholder="email@pelda.hu"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">
                    Üzenet
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-muted border border-border px-4 py-3.5 text-foreground text-sm focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-muted-foreground/50"
                    placeholder="Írd ide az üzeneted..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground py-4 font-semibold tracking-widest uppercase text-sm hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Üzenet küldése
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
