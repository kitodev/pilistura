// @ts-nocheck
import React, { useState } from "react";
import Navbar from "@/components/pilistura/Navbar";
import Alapadatok from "@/components/pilistura/profile/Alapadatok";
import Dicsosegfal from "@/components/pilistura/profile/Dicsosegfal";
import Eredmenyeim from "@/components/pilistura/profile/Eredmenyeim";
import { useAuth } from "@/lib/AuthContext";

const TABS = [
  { id: "alapadatok", label: "Alapadatok" },
  { id: "dicsosegfal", label: "Dicsőségfal" },
  { id: "eredmenyeim", label: "Eredményeim" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("alapadatok");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-24 md:pt-28 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-52 flex-shrink-0">
            <nav className="border border-border bg-card grid grid-cols-3 md:block overflow-hidden">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-center md:text-left px-2 sm:px-4 py-3.5 text-xs sm:text-sm md:border-b border-r md:border-r-0 border-border last:border-r-0 md:last:border-b-0 transition-colors ${
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
