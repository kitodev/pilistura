import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a3313a648abe8c04826b000/d7229170f_2026_HunyadiVandorfogado_logo-909x1024.png";

const FOOTER_LINKS = [
  {
    title: "Felfedezés",
    links: [
      { label: "Útvonalak", href: "#trails" },
      { label: "Rólunk", href: "#about" },
      { label: "Tudnivalók", href: "#info" },
      { label: "Kapcsolat", href: "#contact" },
    ],
  },
  {
    title: "Információ",
    links: [
      { label: "GYIK", href: "#info" },
      { label: "Szabályzat", href: "#info" },
      { label: "Adatvédelem", href: "#" },
      { label: "Felszerelés", href: "#info" },
    ],
  },
  {
    title: "Partnerek",
    links: [
      { label: "Pilis Parkerdő", href: "https://www.pilisi.hu", external: true },
      { label: "Hunyadi Vendégfogadó", href: "#contact" },
      { label: "Marathontime", href: "#" },
      { label: "Kék Kör Futás", href: "https://kekkorfutas.hu", external: true },
    ],
  },
];

export default function Footer() {
  const scrollTo = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener");
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={LOGO_URL} alt="Hunyadi Vándorfogadó" className="h-20 w-auto object-contain rounded" />
            </div>
            <p className="text-background/50 text-sm leading-relaxed max-w-sm mb-6">
              Túra- és terepfutó sorozat a Pilis szívében. A Hunyadi Vendégfogadó élmény- és programmotorja — ahol a természet és a történelem találkozik.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/pilistura"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/pilistura"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-xs tracking-[0.2em] uppercase text-background/40 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-background/60 hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 lg:px-24 py-6 flex flex-col md:flex-row items-center md:justify-between gap-3 text-center md:text-left">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} PilisTúra. Minden jog fenntartva.
          </p>
          <p className="text-xs text-background/30">
            47°42'N 18°54'E — Piliszentlászló, Magyarország
          </p>
        </div>
      </div>
    </footer>
  );
}
