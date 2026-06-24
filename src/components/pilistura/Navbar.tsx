// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";

const NAV_LINKS = [
  { label: "Főoldal", href: "#hero" },
  { label: "Útvonalak", href: "#trails" },
  { label: "GYIK", href: "#faq" },
  { label: "Eredmények", href: "/eredmenyek" },
  { label: "Kapcsolat", href: "#contact" },
];

const LOGO_URL =
  "https://media.base44.com/images/public/6a3313a648abe8c04826b000/d7229170f_2026_HunyadiVandorfogado_logo-909x1024.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    if (!isHome) {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToRegistration = () => {
    setMobileOpen(false);
    navigate("/nevezes");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed -top-px left-0 right-0 z-50 overflow-hidden transition-all duration-500 ${
          solid ? "bg-background shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2.5 group">
              <img
                src={LOGO_URL}
                alt="Hunyadi Vándorfogadó"
                className="h-11 w-auto object-contain drop-shadow-sm md:h-14"
              />
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-accent ${
                    solid ? "text-foreground/70" : "text-white/80"
                  }`}
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
                  <Link
                    to="/profile"
                    className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-accent ${
                      location.pathname === "/profile" ? "text-accent" : solid ? "text-foreground/70" : "text-white/80"
                    }`}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => logout(true)}
                    className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-accent ${
                      solid ? "text-foreground/70" : "text-white/80"
                    }`}
                  >
                    Kilépés
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 hover:text-accent ${
                    solid ? "text-foreground/70" : "text-white/80"
                  }`}
                >
                  Belépés
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors md:hidden ${solid ? "text-foreground" : "text-white"}`}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-background pb-8 pt-16"
          >
            {NAV_LINKS.map((link) => (
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
                  to="/profile"
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
                to="/login"
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
