"use client";

import { ROUTE_HIGHLIGHTS, type RoutePageData } from "@/data/routePages";
import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";
import { Download } from "lucide-react";

function CheckpointTable({ route }: { route: RoutePageData }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse border border-[#24210f] text-left text-[15px]">
        <thead>
          <tr>
            <th colSpan={4} className="border border-[#24210f] bg-[#9b9258] px-4 py-4 text-center font-heading text-base font-bold text-white">
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
          {route.checkpoints.map((point) => (
            <tr key={`${point.id}-${point.distance}`} className="bg-[#dedac3] text-black">
              <th className="w-20 border border-[#24210f] px-3 py-4 text-left font-bold">{point.id}</th>
              <td className="border border-[#24210f] px-3 py-4">{point.name}</td>
              <td className="w-24 border border-[#24210f] px-3 py-4">{point.distance}</td>
              <td className="w-24 border border-[#24210f] px-3 py-4">{point.elevation || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RouteDetailPage({ route }: { route: RoutePageData }) {
  const highlights = route.highlights.map((key) => ROUTE_HIGHLIGHTS[key]).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#fbfaf1] text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="border-b border-border bg-[#f6f0e4]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="sr-only">{route.title}</h1>
            {route.sourceNotice ? (
              <div className="border border-[#9b9258] bg-[#dedac3] px-6 py-16 text-center sm:px-10">
                <p className="font-heading text-3xl font-bold sm:text-4xl">{route.title}</p>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#3f412f]">{route.sourceNotice}</p>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
                <div className="w-full md:w-[48%]">
                  <img src={route.parchmentUrl} alt={`${route.title} pergamen útvonal-információ`} className="w-full object-contain" />
                </div>
                <div className="w-full md:w-[52%]">
                  <CheckpointTable route={route} />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {route.gpxUrl && (
              <a href={route.gpxUrl} className="inline-flex items-center gap-2 bg-[#c38e43] px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white hover:bg-[#a87935]">
                <Download className="h-4 w-4" />
                GPS track letöltése
              </a>
            )}
          </div>
        </section>

        {highlights.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <h2 className="border-b border-border pb-5 font-heading text-2xl font-bold">Kiemelt helyszínek</h2>
            <div className="divide-y divide-border">
              {highlights.map((highlight, index) => (
                <article key={highlight.title} className="grid items-center gap-7 py-10 lg:grid-cols-2 lg:gap-12">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <img
                      src={highlight.imageUrl}
                      alt={highlight.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full border border-border object-cover"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="font-heading text-sm font-bold text-accent">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">{highlight.title}</h3>
                    <p className="mt-4 text-base leading-8 text-muted-foreground">{highlight.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
