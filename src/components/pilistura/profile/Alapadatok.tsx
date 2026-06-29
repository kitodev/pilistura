// @ts-nocheck
import React, { useState, useEffect } from "react";
import { supabaseApi } from "@/api/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const emptyForm = {
  name: "",
  phone: "",
  gender: "Férfi",
  birth_date: "",
  zip_code: "",
  city: "",
  address: "",
  comment: "",
};

const profileToForm = (profile, user) => ({
  name: profile?.name || user?.full_name || "",
  phone: profile?.phone || "",
  gender: profile?.gender || "Férfi",
  birth_date: profile?.birth_date ? String(profile.birth_date).slice(0, 10) : "",
  zip_code: profile?.zip_code || "",
  city: profile?.city || "",
  address: profile?.address || "",
  comment: profile?.comment || "",
});

export default function Alapadatok({ user }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;
    setLoadingProfile(true);
    setSaveError("");

    supabaseApi.entities.UserProfile.filter({ created_by_id: user.id }, "-updated_at", 1)
      .then((results) => {
        if (cancelled) return;
        const loadedProfile = results[0] || null;
        setProfile(loadedProfile);
        setForm(profileToForm(loadedProfile, user));
      })
      .catch((error) => {
        if (!cancelled) setSaveError(error?.message || "A profiladatok betöltése nem sikerült.");
      })
      .finally(() => {
        if (!cancelled) setLoadingProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      const payload = {
        ...form,
        birth_date: form.birth_date || null,
        updated_at: new Date().toISOString(),
      };

      const savedProfile = profile
        ? await supabaseApi.entities.UserProfile.update(profile.id, payload)
        : await supabaseApi.entities.UserProfile.create(payload);

      setProfile(savedProfile);
      setForm(profileToForm(savedProfile, user));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setSaveError(error?.message || "Az adatok mentése nem sikerült.");
    } finally {
      setSaving(false);
    }
  };

  const fieldClass = "mt-1 h-10 border border-input bg-background px-3 text-sm w-full rounded-md focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "text-xs text-muted-foreground";

  if (loadingProfile) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div>
        <Label className={labelClass}>Név</Label>
        <Input name="name" value={form.name} onChange={handleChange} className="mt-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className={labelClass}>Email cím</Label>
          <Input value={user?.email || ""} disabled className="mt-1 bg-muted/50 text-muted-foreground" />
        </div>
        <div>
          <Label className={labelClass}>Telefonszám</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefonszám" className="mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className={labelClass}>Nem</Label>
          <select name="gender" value={form.gender} onChange={handleChange} className={fieldClass}>
            <option>Férfi</option>
            <option>Nő</option>
            <option>Egyéb</option>
          </select>
        </div>
        <div>
          <Label className={labelClass}>Születési idő</Label>
          <Input name="birth_date" type="date" value={form.birth_date} onChange={handleChange} placeholder="Születési idő" className="mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className={labelClass}>Irányítószám</Label>
          <Input name="zip_code" value={form.zip_code} onChange={handleChange} placeholder="Irányítószám" className="mt-1" />
        </div>
        <div>
          <Label className={labelClass}>Város</Label>
          <Input name="city" value={form.city} onChange={handleChange} placeholder="Város" className="mt-1" />
        </div>
      </div>

      <div>
        <Label className={labelClass}>Cím</Label>
        <Input name="address" value={form.address} onChange={handleChange} placeholder="Cím" className="mt-1" />
      </div>

      <div>
        <Label className={labelClass}>Közlemény</Label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Közlemény"
          rows={4}
          className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full sm:w-auto justify-center px-8 sm:px-10 py-2.5 bg-accent text-accent-foreground font-heading font-semibold text-sm tracking-[0.16em] sm:tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors disabled:opacity-60 flex items-center gap-2"
      >
        {saving ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Mentés...</>
        ) : saved ? (
          "Mentve ✓"
        ) : (
          "Mentés"
        )}
      </button>

      {saveError && (
        <p role="alert" className="text-sm text-destructive">
          {saveError}
        </p>
      )}

      {saved && !saveError && (
        <p role="status" className="text-sm text-green-700">
          A profiladatok mentése sikerült.
        </p>
      )}
    </form>
  );
}
