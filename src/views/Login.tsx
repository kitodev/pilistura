// @ts-nocheck
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseApi } from "@/api/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

const LOGO_URL = "/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inactivityNotice, setInactivityNotice] = useState(false);

  useEffect(() => {
    setInactivityNotice(new URLSearchParams(window.location.search).get("reason") === "inactivity");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await supabaseApi.auth.loginViaEmailPassword(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Hibás email cím vagy jelszó");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await supabaseApi.auth.loginWithProvider("google", "/");
    } catch (err) {
      setError(err.message || "Google bejelentkezés sikertelen");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="Hunyadi Vándorfogadó" className="h-24 w-auto mx-auto mb-5 object-contain" />
          <h1 className="font-heading text-2xl font-bold text-foreground tracking-[0.2em] uppercase">Belépés</h1>
          <p className="text-muted-foreground text-sm mt-1.5">Lépj be a fiókodba a túrák nyomon követéséhez</p>
        </div>

        <div className="bg-card border border-border p-5 sm:p-8 shadow-sm">
          {inactivityNotice && (
            <div role="status" className="mb-5 border border-accent/30 bg-accent/10 p-3 text-sm text-foreground">
              10 perc inaktivitás miatt kijelentkeztettünk. A folytatáshoz lépj be újra.
            </div>
          )}

          <button
            onClick={handleGoogle}
            className="w-full h-11 border border-border flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors mb-6"
          >
            <GoogleIcon className="w-5 h-5" />
            Belépés Google fiókkal
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-heading tracking-wider">vagy</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm border border-destructive/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
                Email cím
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="pelda@email.hu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
                  Jelszó
                </Label>
                <Link href="/forgot-password" className="text-xs text-accent hover:underline">
                  Elfelejtett jelszó?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Bejelentkezés...
                </>
              ) : (
                "Belépés"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Még nincs fiókod?{" "}
            <Link href="/register" className="text-accent font-medium hover:underline">
              Regisztrálj
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
