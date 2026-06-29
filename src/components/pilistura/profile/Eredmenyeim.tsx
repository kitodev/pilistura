// @ts-nocheck
import React, { useState, useEffect } from "react";
import { supabaseApi } from "@/api/supabaseClient";
import moment from "moment";

export default function Eredmenyeim({ user }) {
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabaseApi.entities.TrailCompletion.filter({ created_by_id: user.id })
      .then(setCompletions)
      .finally(() => setLoading(false));
  }, [user]);

  // Compute stats
  const done = completions.filter((c) => c.status === "Teljesítve");
  const trailCounts = {};
  done.forEach((c) => {
    trailCounts[c.trail_name] = (trailCounts[c.trail_name] || 0) + 1;
  });
  const counts = Object.values(trailCounts);

  const stats = [
    { label: "Egyszeres teljesítés", value: counts.filter((n) => n === 1).length },
    { label: "Kétszeres teljesítés", value: counts.filter((n) => n === 2).length },
    { label: "Háromszoros teljesítés", value: counts.filter((n) => n === 3).length },
    { label: "Több mint háromszoros teljesítés", value: counts.filter((n) => n > 3).length },
    { label: "Összes teljesített KM", value: done.reduce((s, c) => s + (c.distance_km || 0), 0) },
    { label: "Összes szintemelkedés", value: done.reduce((s, c) => s + (c.elevation_m || 0), 0) },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-7 h-7 border-4 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Stats table */}
      <div className="border border-border mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center px-4 py-3 text-sm border-b border-border last:border-b-0 ${
              i % 2 === 0 ? "bg-muted/30" : ""
            }`}
          >
            <span className="text-foreground">{s.label}:</span>
            <span className="font-semibold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Results table */}
      <div className="md:hidden space-y-3">
        {completions.length === 0 ? (
          <div className="border border-border px-4 py-10 text-center text-sm text-muted-foreground">
            Még nincs nevezésed. Válassz egy útvonalat és kezdd el!
          </div>
        ) : (
          completions.map((c, i) => (
            <div key={c.id} className="border border-border bg-card p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">#{i + 1}</p>
                  <p className="font-medium text-foreground">{c.trail_name}</p>
                </div>
                <span
                  className={`shrink-0 text-xs px-2 py-0.5 rounded-sm font-medium ${
                    c.status === "Teljesítve"
                      ? "bg-green-100 text-green-800"
                      : c.status === "Nevezve"
                      ? "bg-accent/20 text-accent"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-1 text-muted-foreground">
                <p>Nevezés: {c.registration_date ? moment(c.registration_date).format("YYYY.MM.DD") : "–"}</p>
                <p>Teljesítés: {c.completion_date ? moment(c.completion_date).format("YYYY.MM.DD") : "–"}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block border border-border overflow-x-auto">
        <div className="min-w-[580px]">
          <div className="grid grid-cols-12 px-4 py-3 bg-primary text-primary-foreground text-xs font-heading font-semibold tracking-wider uppercase">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Útvonal</div>
            <div className="col-span-3">Nevezés ideje</div>
            <div className="col-span-3">Teljesítés dátuma</div>
            <div className="col-span-1">Státusz</div>
          </div>

          {completions.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              Még nincs nevezésed. Válassz egy útvonalat és kezdd el!
            </div>
          ) : (
            completions.map((c, i) => (
              <div
                key={c.id}
                className={`grid grid-cols-12 px-4 py-3 text-sm border-t border-border items-center ${
                  i % 2 === 0 ? "bg-muted/20" : ""
                }`}
              >
                <div className="col-span-1 text-muted-foreground">{i + 1}</div>
                <div className="col-span-4 font-medium text-foreground">{c.trail_name}</div>
                <div className="col-span-3 text-muted-foreground">
                  {c.registration_date ? moment(c.registration_date).format("YYYY.MM.DD") : "–"}
                </div>
                <div className="col-span-3 text-muted-foreground">
                  {c.completion_date ? moment(c.completion_date).format("YYYY.MM.DD") : "–"}
                </div>
                <div className="col-span-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
                      c.status === "Teljesítve"
                        ? "bg-green-100 text-green-800"
                        : c.status === "Nevezve"
                        ? "bg-accent/20 text-accent"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
