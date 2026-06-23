import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/pilistura/Navbar";
import Alapadatok from "@/components/pilistura/profile/Alapadatok";
import Dicsosegfal from "@/components/pilistura/profile/Dicsosegfal";
import Eredmenyeim from "@/components/pilistura/profile/Eredmenyeim";

const TABS = [
  { id: "alapadatok", label: "Alapadatok" },
  { id: "dicsosegfal", label: "Dicsőségfal" },
  { id: "eredmenyeim", label: "Eredményeim" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("alapadatok");
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-52 flex-shrink-0">
            <nav className="border border-border bg-card">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3.5 text-sm border-b border-border last:border-b-0 transition-colors ${
                    activeTab === tab.id
                      ? "text-accent font-semibold bg-muted/40"
                      : "text-foreground hover:bg-muted/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {activeTab === "alapadatok" && <Alapadatok user={user} />}
            {activeTab === "dicsosegfal" && <Dicsosegfal user={user} />}
            {activeTab === "eredmenyeim" && <Eredmenyeim user={user} />}
          </main>
        </div>
      </div>
    </div>
  );
}
