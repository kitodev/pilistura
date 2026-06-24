// @ts-nocheck
import React, { useMemo, useState } from "react";
import Navbar from "@/components/pilistura/Navbar";
import Footer from "@/components/pilistura/Footer";

const AGE_GROUPS = ["6-8", "9-10", "11-13", "14-15", "16-17", "18-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "50-99"];
const TRAILS = ["Attila Király 10", "Hunyadi János 20", "Hunyadi János 55", "Hunyadi Mátyás 16", "Hunyadi Mátyás 28", "Kinizsi Pál 45", "Rákóczi Ferenc 18", "Rákóczi Ferenc 26", "Szent László 13", "Szent László 29", "Zrínyi Miklós 10", "Zrínyi Miklós 29"];
const STATUSES = ["Hamarosan indul", "Folyamatban", "Teljesítve", "Szintidőn túl teljesítve", "Feladva"];

const RESULTS = [
  { id: 1, name: "Sámuel Gergely", city: "Budapest", gender: "Férfi", ageGroup: "40-44", trail: "Zrínyi Miklós 10", mode: "Futva", date: "2021-03-07 08:51:21", status: "Teljesítve", time: "00:45:42" },
  { id: 2, name: "Sámuel Gergely", city: "Budapest", gender: "Férfi", ageGroup: "40-44", trail: "Attila Király 10", mode: "Futva", date: "2021-02-10 14:44:06", status: "Teljesítve", time: "01:06:46" },
  { id: 3, name: "Sámuel Gergely", city: "Budapest", gender: "Férfi", ageGroup: "40-44", trail: "Szent László 13", mode: "Futva", date: "2021-02-24 14:17:51", status: "Teljesítve", time: "01:28:15" },
  { id: 4, name: "Jandosek Alena", city: "Vác", gender: "Nő", ageGroup: "35-39", trail: "Zrínyi Miklós 10", mode: "Futva", date: "2022-05-28 11:38:23", status: "Teljesítve", time: "01:44:43" },
  { id: 5, name: "Düh László", city: "Pilis", gender: "Férfi", ageGroup: "45-49", trail: "Szent László 13", mode: "Futva", date: "2021-03-20 11:18:17", status: "Teljesítve", time: "02:04:14" },
  { id: 6, name: "Nagy Lajos", city: "Eger", gender: "Férfi", ageGroup: "45-49", trail: "Zrínyi Miklós 10", mode: "Túrázva", date: "2021-04-04 10:24:39", status: "Teljesítve", time: "02:08:41" },
  { id: 7, name: "Horváth András Zoltán", city: "Szeged", gender: "Férfi", ageGroup: "40-44", trail: "Hunyadi Mátyás 16", mode: "Futva", date: "2021-04-05 15:43:49", status: "Teljesítve", time: "02:09:48" },
  { id: 8, name: "Takács Ferenc", city: "Pécs", gender: "Férfi", ageGroup: "35-39", trail: "Hunyadi Mátyás 16", mode: "Futva", date: "2021-04-05 15:43:44", status: "Teljesítve", time: "02:10:18" },
  { id: 9, name: "Nagy Lajos", city: "Eger", gender: "Férfi", ageGroup: "45-49", trail: "Attila Király 10", mode: "Túrázva", date: "2021-04-04 13:17:57", status: "Teljesítve", time: "02:37:52" },
  { id: 10, name: "Nagy Lajos", city: "Eger", gender: "Férfi", ageGroup: "45-49", trail: "Szent László 13", mode: "Túrázva", date: "2021-04-04 16:47:11", status: "Teljesítve", time: "03:23:40" },
  { id: 11, name: "Bohner Balázs", city: "Győr", gender: "Férfi", ageGroup: "30-34", trail: "Szent László 13", mode: "Túrázva", date: "-", status: "Folyamatban", time: "-" },
  { id: 12, name: "Szabó Anna", city: "Visegrád", gender: "Nő", ageGroup: "25-29", trail: "Szent László 13", mode: "Túrázva", date: "-", status: "Hamarosan indul", time: "-" },
  { id: 13, name: "Ruják Nóra", city: "Szentendre", gender: "Nő", ageGroup: "30-34", trail: "Szent László 13", mode: "Túrázva", date: "-", status: "Folyamatban", time: "-" },
  { id: 14, name: "Fábián Miklós", city: "Piliszentlászló", gender: "Férfi", ageGroup: "50-54", trail: "Szent László 13", mode: "Túrázva", date: "-", status: "Folyamatban", time: "-" },
  { id: 15, name: "Ruják Nóra", city: "Szentendre", gender: "Nő", ageGroup: "30-34", trail: "Szent László 13", mode: "Túrázva", date: "2022-03-26 14:43:54", status: "Teljesítve", time: "03:15:43" },
  { id: 16, name: "Vörös Mindy", city: "Budapest", gender: "Nő", ageGroup: "35-39", trail: "Szent László 13", mode: "Túrázva", date: "2022-07-02 10:23:17", status: "Teljesítve", time: "03:27:09" },
  { id: 17, name: "Kardos Dóra", city: "Vác", gender: "Nő", ageGroup: "30-34", trail: "Szent László 13", mode: "Futva", date: "2021-05-08 11:51:34", status: "Teljesítve", time: "02:19:34" },
  { id: 18, name: "Kozák-Ignáth Éva", city: "Budapest", gender: "Nő", ageGroup: "40-44", trail: "Szent László 13", mode: "Futva", date: "2021-05-08 11:46:34", status: "Teljesítve", time: "02:15:27" },
  { id: 19, name: "Márton Rita", city: "Pécs", gender: "Nő", ageGroup: "45-49", trail: "Szent László 13", mode: "Futva", date: "2021-03-20 11:24:40", status: "Teljesítve", time: "02:11:11" },
  { id: 20, name: "Sebők Réka", city: "Pilis", gender: "Nő", ageGroup: "40-44", trail: "Szent László 13", mode: "Túrázva", date: "2024-03-02 12:10:09", status: "Teljesítve", time: "28:10:09" },
  { id: 21, name: "Zink Tamás", city: "Pilis", gender: "Férfi", ageGroup: "40-44", trail: "Szent László 13", mode: "Túrázva", date: "2024-03-02 12:10:09", status: "Teljesítve", time: "28:10:10" },
  { id: 22, name: "Péder Zsófia", city: "Sopron", gender: "Nő", ageGroup: "20-24", trail: "Szent László 13", mode: "Futva", date: "-", status: "Feladva", time: "-" },
];

function ResultTable({ title, rows, detailed = false }) {
  return (
    <section className="mt-10">
      {title && <h2 className="mb-4 text-3xl font-normal text-[#1f2a2a]">{title}</h2>}
      <div className="overflow-x-auto bg-white">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#e6e9ed] text-left font-bold text-slate-700">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Név</th>
              <th className="px-4 py-3">Útvonal</th>
              <th className="px-4 py-3">Teljesítés módja</th>
              <th className="px-4 py-3">Teljesítés ideje</th>
              {detailed && <th className="px-4 py-3">Állapot</th>}
              <th className="px-4 py-3">Idő</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.id}-${index}`} className={`${index % 2 === 0 ? "bg-[#ddd9c4]" : "bg-[#f1eee2]"} border-b border-black/70`}>
                <td className="px-4 py-3 font-bold">{row.id}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.trail}</td>
                <td className="px-4 py-3">{row.mode}</td>
                <td className="px-4 py-3">{row.date}</td>
                {detailed && <td className="px-4 py-3">{row.status}</td>}
                <td className="px-4 py-3">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CheckboxGroup({ items, values, onChange }) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={values.includes(item)}
            onChange={(event) => {
              onChange(event.target.checked ? [...values, item] : values.filter((value) => value !== item));
            }}
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

export default function Eredmenyek() {
  const [showDetailed, setShowDetailed] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    gender: [],
    mode: [],
    trail: [],
    ageGroup: ["40-44"],
    status: [],
  });

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const topByTime = useMemo(
    () => RESULTS.filter((row) => row.status === "Teljesítve" && row.time !== "-").sort((a, b) => a.time.localeCompare(b.time)),
    []
  );

  const filteredRows = useMemo(() => {
    return RESULTS.filter((row) => {
      const matchesText = row.name.toLowerCase().includes(filters.name.toLowerCase()) && row.city.toLowerCase().includes(filters.city.toLowerCase());
      const matchesGender = filters.gender.length === 0 || filters.gender.includes(row.gender);
      const matchesMode = filters.mode.length === 0 || filters.mode.includes(row.mode);
      const matchesTrail = filters.trail.length === 0 || filters.trail.includes(row.trail);
      const matchesAge = filters.ageGroup.length === 0 || filters.ageGroup.includes(row.ageGroup);
      const matchesStatus = filters.status.length === 0 || filters.status.includes(row.status);
      return matchesText && matchesGender && matchesMode && matchesTrail && matchesAge && matchesStatus;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-[#fffdf4] text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setShowDetailed(true);
              setTimeout(() => document.querySelector("#reszletes-eredmenyek")?.scrollIntoView({ behavior: "smooth" }), 0);
            }}
            className="bg-[#c38e43] px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]"
          >
            Részletes eredmények
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <select
            value={filters.ageGroup[0] || ""}
            onChange={(event) => setFilter("ageGroup", event.target.value ? [event.target.value] : [])}
            className="h-12 rounded border border-slate-300 bg-white px-4"
          >
            <option value="">Összes</option>
            {AGE_GROUPS.map((age) => <option key={age}>{age}</option>)}
          </select>
          <span className="text-2xl">korosztály szerint</span>
        </div>

        <ResultTable title="Abszolút toplista" rows={topByTime.slice(0, 5)} />
        <ResultTable title="Női toplista" rows={topByTime.filter((row) => row.gender === "Nő").slice(0, 5)} />
        <ResultTable title="Férfi toplista" rows={topByTime.filter((row) => row.gender === "Férfi").slice(0, 5)} />

        {showDetailed && (
          <section id="reszletes-eredmenyek" className="mt-14 border-t border-border pt-8">
            <h1 className="text-3xl font-normal">Részletes eredmények</h1>

            <div className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-[120px_1fr_120px_1fr]">
              <label className="text-sm text-muted-foreground md:text-right">Név</label>
              <input value={filters.name} onChange={(event) => setFilter("name", event.target.value)} className="h-12 rounded border border-slate-300 bg-white px-4" />
              <label className="text-sm text-muted-foreground md:text-right">Település</label>
              <input value={filters.city} onChange={(event) => setFilter("city", event.target.value)} className="h-12 rounded border border-slate-300 bg-white px-4" />

              <div className="text-sm text-muted-foreground md:text-right">Nem</div>
              <CheckboxGroup items={["Férfi", "Nő"]} values={filters.gender} onChange={(value) => setFilter("gender", value)} />
              <div className="text-sm text-muted-foreground md:text-right">Teljesítés módja</div>
              <CheckboxGroup items={["Futva", "Túrázva"]} values={filters.mode} onChange={(value) => setFilter("mode", value)} />

              <div className="text-sm text-muted-foreground md:text-right">Útvonal</div>
              <CheckboxGroup items={TRAILS} values={filters.trail} onChange={(value) => setFilter("trail", value)} />
              <div className="text-sm text-muted-foreground md:text-right">Korosztály</div>
              <CheckboxGroup items={AGE_GROUPS} values={filters.ageGroup} onChange={(value) => setFilter("ageGroup", value)} />

              <div className="text-sm text-muted-foreground md:text-right">Állapot</div>
              <CheckboxGroup items={STATUSES} values={filters.status} onChange={(value) => setFilter("status", value)} />
            </div>

            <div className="mt-8 flex justify-center">
              <button type="button" onClick={() => setPage(1)} className="bg-[#c38e43] px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#a87935]">
                Szűrés
              </button>
            </div>

            <div className="mt-8 border-t border-border pt-7">
              <label className="mb-2 inline-flex items-center gap-2 text-sm">
                <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="border border-slate-300 bg-white">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                találat oldalanként
              </label>

              <ResultTable rows={pagedRows} detailed />

              <div className="mt-3 flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
                <p>Találatok: {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredRows.length)} Összesen: {filteredRows.length}</p>
                <div className="flex items-center gap-2">
                  <button disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="px-3 py-2 disabled:opacity-40">Előző</button>
                  <span className="border border-slate-400 bg-white px-3 py-2">{currentPage}</span>
                  <button disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="px-3 py-2 disabled:opacity-40">Következő</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
