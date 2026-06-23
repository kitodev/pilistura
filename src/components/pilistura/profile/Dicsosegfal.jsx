import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

const LOGO_URL = "https://media.base44.com/images/public/6a3313a648abe8c04826b000/d7229170f_2026_HunyadiVandorfogado_logo-909x1024.png";

export default function Dicsosegfal() {
  const [filter, setFilter] = useState("Futva");
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.TrailCompletion.filter({ trail_type: filter, status: "Teljesítve" })
      .then(setCompletions)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-input bg-background px-3 py-2 text-sm rounded-md min-w-[140px]"
        >
          <option>Futva</option>
          <option>Túrázva</option>
        </select>
      </div>

      {/* Parchment scroll */}
      <div
        className="relative min-h-[500px] p-8 rounded-sm overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(42, 55%, 80%) 0%, hsl(35, 45%, 64%) 70%, hsl(30, 40%, 55%) 100%)",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.15)",
          border: "2px solid hsl(35 35% 52%)",
        }}
      >
        {/* Inner vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)" }}
        />

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-border border-t-accent rounded-full animate-spin" />
          </div>
        ) : completions.length === 0 ? (
          <div className="relative flex flex-col items-center justify-center min-h-[400px] text-center">
            <img src={LOGO_URL} alt="" className="h-20 w-auto opacity-25 mb-4" />
            <p className="font-heading text-sm tracking-[0.2em] uppercase" style={{ color: "hsl(35 30% 35%)" }}>
              Még nincs teljesítés ebben a kategóriában
            </p>
          </div>
        ) : (
          <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {completions.map((c, i) => (
              <div key={c.id || i} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-lg"
                  style={{ borderColor: "hsl(35 35% 42%)", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
                >
                  <img src={LOGO_URL} alt={c.user_name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-center font-semibold leading-tight" style={{ color: "hsl(35 30% 22%)" }}>
                  {c.user_name || "Névtelen"}
                </span>
                <span className="text-xs text-center leading-tight opacity-70" style={{ color: "hsl(35 25% 28%)" }}>
                  {c.trail_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
