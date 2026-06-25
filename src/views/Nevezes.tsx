// @ts-nocheck
import React, { useMemo, useState } from "react";
import { Check } from "lucide-react";
import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";
import { useAuth } from "@/lib/AuthContext";

const BARION_PAYMENT_URL = "https://secure.barion.com/Pay?id=5cde26a3bf6ff1119d1bb8ca3a6352a2";

const ROUTES = [
  { id: 1, name: "Attila Király 10", sections: 6, limit: "02:00/03:30", price: "3250 HUF-tól" },
  { id: 2, name: "Hunyadi János 20", sections: 9, limit: "04:00/07:00", price: "3750 HUF-tól" },
  { id: 3, name: "Hunyadi János 55", sections: 16, limit: "10:00/19:00", price: "3750 HUF-tól" },
  { id: 4, name: "Hunyadi Mátyás 16", sections: 5, limit: "02:30/05:30", price: "3750 HUF-tól" },
  { id: 5, name: "Hunyadi Mátyás 28", sections: 9, limit: "05:00/09:30", price: "3750 HUF-tól" },
  { id: 6, name: "Kinizsi Pál 45", sections: 17, limit: "09:00/14:00", price: "3750 HUF-tól" },
  { id: 7, name: "Rákóczi Ferenc 18", sections: 9, limit: "03:30/06:00", price: "3750 HUF-tól" },
];

const PACKAGE_FEATURES = {
  base: [
    "online időmérés, eredmények",
    "pajzs alakú egyedi fa érem bőrzsinórral",
    "dicsőségfal a saját profilban egyedi grafikákkal kialakítva",
    "részeredmények szegmentálása teljesítés közben, azonnal a QR-kód leolvasásánál",
    "minden táv arany szintjének elérésekor saját névre szóló, egyedi pergamen oklevél",
    "kuponok, kedvezmények a partnerekhez",
    "a Pilis csodálatos hegyei",
  ],
  extra: [
    "online időmérés, eredmények",
    "pajzs alakú egyedi fa érem bőrzsinórral",
    "dicsőségfal a saját profilban egyedi grafikákkal kialakítva",
    "választott menü az étteremben, ha az aktuális nyitvatartást és menüt ide kattintva találod meg >>> link",
    "részeredmények szegmentálása teljesítés közben, azonnal a QR-kód leolvasásánál",
    "saját profilban az eredményeknél extra funkciók",
    "minden táv arany szintjének elérésekor saját névre szóló, egyedi Hungarian Legends márkájú hosszú ujjú technikai futófelső rendelése 70% kedvezménnyel",
    "kuponok, kedvezmények a partnerekhez",
    "a Pilis csodálatos hegyei",
  ],
};

const PACKAGES = [
  {
    id: "base",
    label: "Alap csomag",
    subtitle: "(bevezető ár)",
    oldPrice: "4995 HUF helyett",
    price: "3250",
    features: PACKAGE_FEATURES.base,
  },
  {
    id: "extra",
    label: "Extra csomag 1",
    subtitle: "(bevezető ár)",
    oldPrice: "6545 HUF helyett",
    price: "4800",
    features: PACKAGE_FEATURES.extra,
    note: "*Kedves regisztráló! Kérlek, ellenőrizd az étterem ételbár nyitvatartását a lenti linken. Az extra csomag csak a kiírt nyitvatartási időpontokban érhető el!",
  },
];

function RouteRadio({ checked, onChange }) {
  return (
    <span className="relative inline-flex h-5 w-5 items-center justify-center">
      <input
        type="radio"
        name="route"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="h-4 w-4 rounded-full border border-[#b9ae8c] bg-transparent transition-colors peer-checked:border-[#c58c36]" />
      <span className="absolute h-2 w-2 rounded-full bg-[#c58c36] opacity-0 transition-opacity peer-checked:opacity-100" />
    </span>
  );
}

function PackageCard({ pack, onChoose }) {
  return (
    <div className="flex min-h-full flex-col bg-white shadow-[0_18px_45px_rgba(31,37,51,0.08)]">
      <div className="px-5 py-8 text-center">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.28em] text-foreground">
          {pack.label}
        </p>
        <p className="mt-1 font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
          {pack.subtitle}
        </p>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.24em] text-red-600">
          {pack.oldPrice}
        </p>
      </div>

      <div className="bg-[#f1f1f1] px-5 py-7 text-center">
        <span className="align-middle text-5xl font-light leading-none text-black sm:text-6xl">
          {pack.price}
        </span>
        <span className="ml-1 align-middle text-lg uppercase text-black/25">HUF</span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-7">
        <ul className="flex-1 space-y-5 text-center text-sm leading-relaxed text-muted-foreground">
          {pack.features.map((feature) => (
            <li key={feature} className="flex items-start justify-center gap-2">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {pack.note && (
          <p className="mt-6 text-center text-sm font-bold leading-relaxed text-red-600">
            {pack.note}
          </p>
        )}

        <button
          type="button"
          onClick={() => onChoose(pack)}
          className="mx-auto mt-12 w-full max-w-[280px] bg-[#c38e43] px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]"
        >
          Kiválasztás
        </button>
      </div>
    </div>
  );
}

export default function Nevezes() {
  const { isAuthenticated } = useAuth();
  const [selectedRouteId, setSelectedRouteId] = useState(1);
  const [mode, setMode] = useState("Futva");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [agreements, setAgreements] = useState({
    rules: false,
    privacy: false,
  });

  const selectedRoute = useMemo(
    () => ROUTES.find((route) => route.id === selectedRouteId) || ROUTES[0],
    [selectedRouteId]
  );

  const choosePackage = (pack) => {
    setSelectedPackage(pack);
    setAgreements({ rules: false, privacy: false });
  };

  const closeCart = () => {
    setSelectedPackage(null);
  };

  const goToPayment = () => {
    if (!agreements.rules || !agreements.privacy) return;
    window.location.href = BARION_PAYMENT_URL;
  };

  return (
    <div className="min-h-screen bg-[#e4dac3] text-foreground">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 md:pt-28">
        {!isAuthenticated ? (
          <section className="border border-[#c9be9f] bg-[#efe6d1] px-6 py-16 text-center shadow-[0_24px_80px_rgba(72,64,43,0.08)]">
            <h1 className="font-heading text-3xl font-bold text-[#283022]">
              Csak bejelentkezett felhasználóknak érhető el
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              A nevezési táblázat és a csomagválasztás megtekintéséhez kérlek, jelentkezz be a fiókodba.
            </p>
          </section>
        ) : (
        <section className="overflow-hidden border border-[#c9be9f] bg-[#efe6d1] shadow-[0_24px_80px_rgba(72,64,43,0.08)]">
          <div className="hidden border-b border-[#c9be9f] bg-[#efe6d1] font-heading text-xs font-bold uppercase tracking-[0.12em] text-[#5f6752] md:grid md:grid-cols-[70px_1.5fr_1.15fr_1fr_1fr_90px]">
            <div className="px-6 py-6">#</div>
            <div className="px-6 py-6">Útvonal</div>
            <div className="px-6 py-6">Szakaszok</div>
            <div className="px-6 py-6">Idő</div>
            <div className="px-6 py-6">Ár</div>
            <div className="px-6 py-6">Nevezés</div>
          </div>

          <div className="divide-y divide-[#c9be9f]">
            {ROUTES.map((route) => {
              const selected = route.id === selectedRouteId;
              return (
                <React.Fragment key={route.id}>
                  <label
                    className={`grid cursor-pointer gap-3 px-5 py-5 text-sm transition-colors hover:bg-[#eadfc7] md:grid-cols-[70px_1.5fr_1.15fr_1fr_1fr_90px] md:items-center md:gap-0 md:px-0 md:py-0 ${
                      selected ? "bg-[#eadfc7]" : "bg-[#efe6d1]"
                    }`}
                  >
                    <div className="flex items-center justify-between md:block md:px-6 md:py-6">
                      <span className="font-mono text-sm font-medium text-[#5f6752]">{route.id}</span>
                      <span className="md:hidden">
                        <RouteRadio checked={selected} onChange={() => setSelectedRouteId(route.id)} />
                      </span>
                    </div>
                    <div className="font-heading text-base font-semibold uppercase tracking-wide text-[#283022] md:px-6 md:py-6 md:text-lg">
                      {route.name}
                    </div>
                    <div className="text-[#6d705f] md:px-6 md:py-6">
                      <span className="font-heading font-semibold uppercase text-[#5f6752] md:hidden">Szakaszok: </span>
                      {route.sections}
                    </div>
                    <div className="font-mono text-[#1e211d] md:px-6 md:py-6">
                      <span className="font-heading font-semibold uppercase text-[#5f6752] md:hidden">Idő: </span>
                      {route.limit}
                    </div>
                    <div className="font-semibold text-[#c58c36] md:px-6 md:py-6">
                      <span className="font-heading font-semibold uppercase text-[#5f6752] md:hidden">Ár: </span>
                      {route.price}
                    </div>
                    <div className="hidden md:block md:px-6 md:py-6">
                      <RouteRadio checked={selected} onChange={() => setSelectedRouteId(route.id)} />
                    </div>
                  </label>

                  {selected && (
                    <div className="border-t border-[#c9be9f] bg-[#e8e8ee] px-3 py-10 sm:px-8 md:px-10 md:py-16">
                      <div className="mx-auto max-w-5xl text-center">
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-green-700">
                          {selectedRoute.name}
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold text-[#3a3a3a] sm:text-4xl">
                          Csomagok
                        </h1>

                        <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto]">
                          <select
                            value={mode}
                            onChange={(event) => setMode(event.target.value)}
                            className="h-12 w-full rounded border border-slate-300 bg-white px-4 text-sm text-foreground"
                          >
                            <option>Futva</option>
                            <option>Túrázva</option>
                          </select>
                          <span className="text-2xl text-[#3a3a3a]">teljesítem</span>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
                          {PACKAGES.map((pack) => (
                            <PackageCard key={pack.id} pack={pack} onChoose={choosePackage} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>
        )}
      </main>

      {isAuthenticated && selectedPackage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-4 py-8"
          role="dialog"
          aria-modal="true"
          onClick={closeCart}
        >
          <div
            className="w-full max-w-[360px] border border-black bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[#333]">Kosár</h2>
              <button
                type="button"
                onClick={closeCart}
                className="text-xl leading-none text-muted-foreground hover:text-foreground"
                aria-label="Kosár bezárása"
              >
                ×
              </button>
            </div>

            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-bold">Útvonal:</span> {selectedRoute.name}
              </p>
              <p>
                <span className="font-bold">Teljesítés módja:</span> {mode}
              </p>
              <p>
                <span className="font-bold">Kiválasztott csomag:</span> {selectedPackage.label}
              </p>
              <p>
                <span className="font-bold">Fizetendő:</span> {selectedPackage.price} HUF
              </p>
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="space-y-3 text-sm text-muted-foreground">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreements.rules}
                  onChange={(event) => setAgreements((current) => ({ ...current, rules: event.target.checked }))}
                  className="mt-1"
                />
                <span>Az ÁSZF-et elolvastam és elfogadom</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreements.privacy}
                  onChange={(event) => setAgreements((current) => ({ ...current, privacy: event.target.checked }))}
                  className="mt-1"
                />
                <span>Az adatkezelési tájékoztatót elolvastam és elfogadom</span>
              </label>
            </div>

            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] font-bold">
                <span className="rounded-sm bg-[#179bd7] px-1.5 py-1 text-white">barion</span>
                <span className="rounded-sm bg-[#1a4f9b] px-1.5 py-1 text-white">VISA</span>
                <span className="rounded-sm bg-white px-1.5 py-1 text-[#1a4f9b] ring-1 ring-border">VISA</span>
                <span className="h-5 w-5 rounded-full bg-[#eb001b]" />
                <span className="-ml-2 h-5 w-5 rounded-full bg-[#f79e1b]/90" />
                <span className="rounded-sm bg-[#1a4f9b] px-1.5 py-1 text-white">AMEX</span>
              </div>

              <button
                type="button"
                onClick={goToPayment}
                disabled={!agreements.rules || !agreements.privacy}
                className="bg-[#c38e43] px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Fizetés
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
