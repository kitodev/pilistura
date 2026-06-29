// @ts-nocheck
import React from "react";
import { useRouter } from "next/navigation";
import { Facebook, Instagram, Youtube } from "lucide-react";

const LOGO_URL = "/logo.svg";

const FOOTER_LINKS = [
  {
    title: "Felfedezés",
    links: [
      { label: "Útvonalak", href: "/#trails" },
      { label: "Rólunk", href: "/#about" },
      { label: "Tudnivalók", href: "/#info" },
      { label: "Kapcsolat", href: "/#contact" },
    ],
  },
  {
    title: "Információ",
    links: [
      { label: "GYIK", href: "/#faq" },
      { label: "Szabályzat", href: "/#info" },
      { label: "Adatvédelem", href: "/adatvedelmi-szabalyzat" },
      { label: "Felszerelés", href: "/#info" },
    ],
  },
  {
    title: "Partnerek",
    links: [
      { label: "Pilis Parkerdő", href: "https://www.pilisi.hu" },
      { label: "Hunyadi Vendégfogadó", href: "/#contact" },
      { label: "Marathontime", href: "#" },
      { label: "Kék Kör Futás", href: "https://kekkorfutas.hu" },
    ],
  },
];

export default function Footer() {
  const router = useRouter();

  const goTo = (href) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener");
      return;
    }
    router.push(href);
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20 lg:px-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <img src={LOGO_URL} alt="Hunyadi Vándorfogadó" className="h-20 w-auto rounded object-contain" />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-background/50">
              Túra- és terepfutó sorozat a Pilis szívében. A Hunyadi Vendégfogadó élmény- és programmotorja, ahol a természet és a történelem találkozik.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/pilistura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-background/20 transition-colors hover:bg-background/10"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/pilistura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-background/20 transition-colors hover:bg-background/10"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-background/20 transition-colors hover:bg-background/10"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-background/40">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => goTo(link.href)}
                      className="text-sm text-background/60 transition-colors duration-300 hover:text-accent"
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

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center md:flex-row md:justify-between md:px-16 md:text-left lg:px-24">
          <p className="text-xs text-background/30">© {new Date().getFullYear()} PilisTúra. Minden jog fenntartva.</p>
          <p className="text-xs text-background/30">47°42'N 18°54'E, Pilisszentlászló, Magyarország</p>
        </div>
      </div>
    </footer>
  );
}
