// @ts-nocheck
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function Alapadatok({ user }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "", phone: "", gender: "Férfi", birth_date: "",
    zip_code: "", city: "", address: "", comment: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    base44.entities.UserProfile.filter({ created_by_id: user.id }).then((results) => {
      if (results.length > 0) {
        const p = results[0];
        setProfile(p);
        setForm({
          name: p.name || user.full_name || "",
          phone: p.phone || "",
          gender: p.gender || "Férfi",
          birth_date: p.birth_date || "",
          zip_code: p.zip_code || "",
          city: p.city || "",
          address: p.address || "",
          comment: p.comment || "",
        });
      } else {
        setForm((f) => ({ ...f, name: user.full_name || "" }));
      }
    });
  }, [user]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (profile) {
        await base44.entities.UserProfile.update(profile.id, form);
      } else {
        const p = await base44.entities.UserProfile.create(form);
        setProfile(p);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const fieldClass = "mt-1 h-10 border border-input bg-background px-3 text-sm w-full rounded-md focus:outline-none focus:ring-2 focus:ring-ring";
  const labelClass = "text-xs text-muted-foreground";

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
    </form>
  );
}
