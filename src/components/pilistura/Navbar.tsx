// @ts-nocheck
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { ROUTE_LINKS } from "@/data/routeLinks";

const NAV_LINKS = [
  { label: "Főoldal", href: "#hero" },
  { label: "GYIK", href: "#faq" },
  { label: "Eredmények", href: "/eredmenyek" },
  { label: "Kapcsolat", href: "#contact" },
];

const LOGO_URL = "/logo.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routeMenuOpen, setRouteMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    ["/", "/eredmenyek", "/nevezes", "/login", ...ROUTE_LINKS.map((link) => link.href)].forEach((href) => {
      router.prefetch(href);
    });
  }, [router]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    setRouteMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (!isHome) {
      router.push("/" + href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "auto" });
  };

  const goToRegistration = () => {
    setMobileOpen(false);
    router.push("/nevezes");
  };

  const navTextClass = (active = false) =>
    `text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-accent ${
      active ? "text-accent" : solid ? "text-foreground/70" : "text-white/80"
    }`;

  const routeLinkClass = (href) =>
    `block px-4 py-3 text-left text-sm transition-colors hover:bg-[#f3f0cf] hover:text-foreground ${
      pathname === href ? "bg-[#f3f0cf] text-foreground" : "text-foreground"
    }`;

  return (
    <>
      <nav
        className={`fixed -top-px left-0 right-0 z-50 overflow-visible ${
          solid ? "bg-background shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="Hunyadi Vándorfogadó"
                className="h-11 w-auto object-contain drop-shadow-sm md:h-14"
              />
            </button>

            <div className="hidden items-center gap-7 md:flex">
              <button onClick={() => scrollTo("#hero")} className={navTextClass(isHome)}>
                Főoldal
              </button>

              <div
                className="relative"
                onMouseEnter={() => setRouteMenuOpen(true)}
                onMouseLeave={() => setRouteMenuOpen(false)}
              >
                <button
                  onClick={() => setRouteMenuOpen((open) => !open)}
                  className={`flex items-center gap-1 ${navTextClass(pathname.startsWith("/utvonalak"))}`}
                  aria-expanded={routeMenuOpen}
                >
                  Útvonalak
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${routeMenuOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {routeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full mt-5 max-h-80 w-64 overflow-y-auto border border-border bg-background shadow-xl"
                    >
                      {ROUTE_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setRouteMenuOpen(false)}
                          className={routeLinkClass(link.href)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {NAV_LINKS.slice(1).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={navTextClass(pathname === link.href)}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={goToRegistration}
                className="bg-[#c38e43] px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#a87935]"
              >
                Nevezés
              </button>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className={navTextClass(pathname === "/profile")}>
                    Profil
                  </Link>
                  <button onClick={() => logout(true)} className={navTextClass()}>
                    Kilépés
                  </button>
                </>
              ) : (
                <Link href="/login" className={navTextClass(pathname === "/login")}>
                  Belépés
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors md:hidden ${solid ? "text-foreground" : "text-white"}`}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-background px-6 pb-8 pt-16"
          >
            <button
              onClick={() => scrollTo("#hero")}
              className="text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
            >
              Főoldal
            </button>
            <div className="w-full max-w-xs">
              <button
                onClick={() => setRouteMenuOpen((open) => !open)}
                className="mx-auto flex items-center justify-center gap-1 text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
              >
                Útvonalak
                <ChevronDown className={`h-4 w-4 transition-transform ${routeMenuOpen ? "rotate-180" : ""}`} />
              </button>
              {routeMenuOpen && (
                <div className="mt-4 max-h-56 overflow-y-auto border border-border bg-white text-left shadow-sm">
                  {ROUTE_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setRouteMenuOpen(false);
                      }}
                      className={routeLinkClass(link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_LINKS.slice(1).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={goToRegistration}
              className="mt-2 bg-[#c38e43] px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]"
            >
              Nevezés
            </button>
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
                >
                  Profil
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout(true);
                  }}
                  className="text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
                >
                  Kilépés
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-base font-heading font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:text-accent"
              >
                Belépés
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
