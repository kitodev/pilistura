"use client";

import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";
import { Download } from "lucide-react";

const CHECKPOINTS = [
  { id: "START", name: "Csobánka, Ötterem kávézó (rajt)", distance: "0 km", elevation: "0 m" },
  { id: "1", name: "Oszoly-pihenő", distance: "0,7 km", elevation: "" },
  { id: "2", name: "Kevély-nyereg", distance: "2,8 km", elevation: "" },
  { id: "3", name: "Oszoly-csúcs (Csobánka)", distance: "6,4 km", elevation: "" },
  { id: "4", name: "Gyaloghíd (Csobánka)", distance: "9 km", elevation: "" },
  { id: "CÉL", name: "Csobánka, Ötterem kávézó (cél)", distance: "10 km", elevation: "426 m" },
];

const LOCATIONS = [
  {
    title: "1. Kevély-nyereg",
    description:
      "A Kevély-nyereg Üröm és Csobánka között húzódik. A piros jelzés végigvezet a gerincen, ahol az Ezüst-Kevély, a Nagy-Kevély és a Kis-Kevély vonulata kíséri az útvonalat. A Nagy-Kevély 534 méteres csúcsa körül több turistaút találkozik.",
    image: "https://pilistura.hu/templates/utvonalak/images/kevely-nyereg/Kev%C3%A9ly%20nyereg%201.jpg",
    imageAlt: "Kevély-nyereg",
  },
  {
    title: "2. Csúcs-hegy",
    description:
      "A Csúcs-hegy felhagyott kőfejtőjében vöröses, vasas homokkő és a repedésekben kialakult ásványkitöltések figyelhetők meg. A különleges kőzetfalak az útvonal egyik legérdekesebb földtani állomását adják.",
    image: "https://pilistura.hu/templates/utvonalak/images/csucs-hegy/cs%C3%BAcshegy%20k%C5%91fejt%C5%91.jpg",
    imageAlt: "A Csúcs-hegy egykori kőfejtője",
  },
  {
    title: "3. Oszoly-csúcs",
    description:
      "Az Oszoly-csúcs Csobánka fölé magasodó, látványos sziklás kilátóhely. Fehér sziklatornyai kedvelt mászóhelyek, a csúcsról pedig széles panoráma nyílik a környező pilisi hegyekre és a településre.",
    image: "https://pilistura.hu/templates/utvonalak/images/oszoly-csucs/Oszoly-cs%C3%BAcs%202.jpg",
    imageAlt: "Kilátás az Oszoly-csúcsról",
  },
];

function CheckpointTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse border border-[#24210f] text-left text-[15px]">
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

export default function AttilaKiraly10Page() {
  return (
    <div className="min-h-screen bg-[#fbfaf1] text-foreground">
      <Navbar />

      <main className="pt-24">
        <section className="border-b border-border bg-[#f6f0e4]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="sr-only">Attila Király 10 KM</h1>

            <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
              <div className="w-full md:w-[48%]">
                <img
                  src="https://pilistura.hu/images/routes/Attila%20Kir%C3%A1ly-10.png"
                  alt="Attila Király 10 KM pergamen útvonal-információ"
                  className="w-full object-contain"
                />
              </div>

              <div className="w-full md:w-[52%]">
                <CheckpointTable />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <a
            href="https://pilistura.hu/utvonalak/data/gpx/Attila%20Kir%C3%A1ly%2010.gpx"
            className="inline-flex items-center gap-2 bg-[#c38e43] px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]"
          >
            <Download className="h-4 w-4" />
            GPS track letöltése
          </a>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {LOCATIONS.map((location) => (
              <article key={location.title} className="border-t border-border pt-8">
                <h2 className="font-heading text-2xl font-bold">{location.title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{location.description}</p>
                <img
                  src={location.image}
                  alt={location.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="mt-6 max-h-[520px] w-full border border-border object-cover"
                />
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
