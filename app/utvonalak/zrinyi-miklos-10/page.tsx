"use client";

import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";
import { Download, MapPin, Mountain, Route, Timer } from "lucide-react";

const CHECKPOINTS = [
  { id: "START", name: "Csobánka, Ötterem kávézó (rajt)", distance: "0 km", elevation: "0 m" },
  { id: "1", name: "A római út és Nemoratta sírköve", distance: "3,3 km", elevation: "" },
  { id: "2", name: "Macska-barlang", distance: "4,8 km", elevation: "" },
  { id: "3", name: "Szent-Kút (Csobánka)", distance: "9,2 km", elevation: "" },
  { id: "CÉL", name: "Csobánka, Ötterem kávézó (cél)", distance: "10 km", elevation: "" },
];

const ALLTRAILS_WIDGET_URL =
  process.env.NEXT_PUBLIC_ALLTRAILS_ZRINYI_MIKLOS_10_WIDGET_URL ||
  "https://www.alltrails.com/widget/map/map-0465a18--4?u=m";

const STATS = [
  { icon: Route, label: "Táv", value: "10 km" },
  { icon: Mountain, label: "Szintemelkedés", value: "300 m" },
  { icon: Timer, label: "Nehézség", value: "2/10" },
  { icon: MapPin, label: "Rajt/cél", value: "Csobánka" },
];

function CheckpointTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[540px] border-collapse border border-[#24210f] text-left text-[15px]">
        <thead>
          <tr>
            <th
              colSpan={4}
              className="border border-[#24210f] bg-[#9b9258] px-4 py-4 text-center font-heading text-base font-bold text-white"
            >
              Távolság és szintemelkedés adatok
            </th>
          </tr>
          <tr className="bg-[#9b9258] text-white">
            <th className="border border-[#24210f] px-4 py-4 text-center font-bold">SRSZ.</th>
            <th className="border border-[#24210f] px-4 py-4 text-center font-bold">Pont neve</th>
            <th className="border border-[#24210f] px-4 py-4 text-center font-bold">Résztáv</th>
            <th className="border border-[#24210f] px-4 py-4 text-center font-bold">Szinte.</th>
          </tr>
        </thead>
        <tbody>
          {CHECKPOINTS.map((point) => (
            <tr key={point.id} className="bg-[#dedac3] text-black">
              <th className="w-20 border border-[#24210f] px-3 py-4 text-left font-bold">{point.id}</th>
              <td className="border border-[#24210f] px-3 py-4">{point.name}</td>
              <td className="w-24 border border-[#24210f] px-3 py-4">{point.distance}</td>
              <td className="w-24 border border-[#24210f] px-3 py-4">{point.elevation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ZrinyiMiklos10Page() {
  return (
    <div className="min-h-screen bg-[#fbfaf1] text-foreground">
      <Navbar />

      <main className="pt-24">
        <section className="border-b border-border bg-[#f6f0e4]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Útvonalak
              </p>
              <h1 className="font-heading text-4xl font-bold uppercase tracking-wide text-foreground sm:text-5xl">
                Zrínyi Miklós 10 KM
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Könnyen teljesíthető, Csobánkáról induló körtúra történelmi és természeti látnivalókkal: római út, Macska-barlang és Szent-kút.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-3xl">
                {STATS.map((item) => (
                  <div key={item.label} className="border border-border bg-background p-4">
                    <item.icon className="mb-3 h-5 w-5 text-accent" />
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-heading text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="overflow-hidden bg-transparent">
              <img
                src="https://pilistura.hu/images/routes/Zr%C3%ADnyi-10.png"
                alt="Zrínyi Miklós 10 KM pergamen útvonal információ"
                className="h-full max-h-[560px] w-full object-contain"
              />
              </div>

              <CheckpointTable />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-border bg-white">
            <iframe
              className="h-[420px] w-full"
              src={ALLTRAILS_WIDGET_URL}
              title="AllTrails Zrínyi Miklós 10 KM térkép"
              loading="lazy"
            />
          </div>
          <a
            href="https://pilistura.hu/data/gpx/Zr%C3%ADnyi%20Mikl%C3%B3s%2010.gpx"
            className="mt-5 inline-flex items-center gap-2 bg-[#c38e43] px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]"
          >
            <Download className="h-4 w-4" />
            GPS track letöltése
          </a>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <article className="border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold">1. A római út és Nemoratta sírköve</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Az első ellenőrzőpont a Csobánka környéki történelmi útszakaszhoz kapcsolódik. A rövid táv egyik különlegessége, hogy már az elején találkozik a Pilis régi útvonalainak emlékeivel.
              </p>
            </article>

            <article className="border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold">2. Macska-barlang</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Az Országos Kéktúra kék sáv jelzéséből kiágazó kék barlangjelzésű turistaúton közelíthető meg a Csobánkai-nyeregből. A Ziribár-hegy délkeleti tövében, Csobánka központjától nyugatra, a Tavasz-kunyhó mellett nyílik.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                A barlang bejárata feletti hegyoldalból lefolyó csapadékvizet nyeli el, ezért időszakosan aktív víznyelőbarlangként működik. Bejárásához engedély és barlangjáró alapfelszerelés szükséges.
              </p>
              <img
                src="https://pilistura.hu/templates/utvonalak/images/macska.jpg"
                alt="Macska-barlang"
                className="mt-6 max-h-[520px] w-full border border-border object-cover"
              />
            </article>

            <article className="border-t border-border pt-8">
              <h2 className="font-heading text-2xl font-bold">3. Szent-Kút</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                A hely legendája szerint 1842-ben a Pilis erdőségében egy nyáját legeltető pásztornak megjelent Mária egy forrás miatt mocsaras helyen. A látomás után a falusiak ivásra és mosakodásra használták a forrás vizét.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                A forrásnak már a Mária-jelenés előtt is gyógyító híre volt. A jelenés után kapta a Máriakút, Szentkút nevet, és a zarándokok ma is felkeresik.
              </p>
              <img
                src="https://pilistura.hu/templates/utvonalak/images/szent_kut.jpg"
                alt="Szent-Kút Csobánkán"
                className="mt-6 max-h-[520px] w-full border border-border object-cover"
              />
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
