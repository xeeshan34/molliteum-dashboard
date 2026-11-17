"use client";

import { useMemo, useState } from "react";
import { coaches } from "@/lib/data";
import { Avatar, Button, Card } from "@/components/ui";

const sportOptions = ["Hockey", "Basketball", "Baseball", "Soccer", "Football", "Tennis"];
const needOptions = [
  "Pressure moments",
  "Slump recovery",
  "Injury return",
  "Confidence",
  "Rookie transition",
  "Contract-year stress",
  "Focus",
  "Team culture",
  "Youth & academy",
];
const cityOptions = ["No preference", "Toronto", "Los Angeles", "Remote"];

export default function Matcher() {
  const [sport, setSport] = useState("Hockey");
  const [need, setNeed] = useState("Pressure moments");
  const [city, setCity] = useState("No preference");
  const [ran, setRan] = useState(true);

  const ranked = useMemo(
    () =>
      coaches
        .map((c) => {
          const open = c.capacity - c.clients;
          const reasons: string[] = [];
          let score = 0;
          if (c.sports.includes(sport)) { score += 35; reasons.push(`Works with ${sport.toLowerCase()} athletes`); }
          if (c.specialties.includes(need)) { score += 35; reasons.push(`Specializes in ${need.toLowerCase()}`); }
          if (city === "No preference" || c.city === city || c.city === "Remote") { score += 10; reasons.push(c.city === "Remote" ? "Available remotely" : `Based in ${c.city}`); }
          if (open > 0) { score += Math.min(10, open * 3); reasons.push(`${open} open spot${open > 1 ? "s" : ""}`); }
          else reasons.push("No open spots");
          score += Math.round((c.rating - 4.5) * 20);
          return { c, score: Math.min(99, score), reasons, open };
        })
        .sort((a, b) => b.score - a.score),
    [sport, need, city],
  );

  const select = "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm";

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card title="New athlete">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setRan(true);
          }}
        >
          <label className="block text-sm">
            <span className="block mb-1.5">Sport</span>
            <select value={sport} onChange={(e) => setSport(e.target.value)} className={select}>
              {sportOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="block mb-1.5">Main challenge</span>
            <select value={need} onChange={(e) => setNeed(e.target.value)} className={select}>
              {needOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="block text-sm">
            <span className="block mb-1.5">Location</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={select}>
              {cityOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <Button type="submit" className="w-full justify-center">Find best coach</Button>
        </form>
      </Card>

      <div className="space-y-3" aria-live="polite">
        {ran &&
          ranked.slice(0, 4).map(({ c, score, reasons }, i) => (
            <Card key={c.id} className={i === 0 ? "!border-blue ring-1 ring-blue" : ""}>
              <div className="flex items-center gap-4">
                <Avatar name={c.name} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{c.name}</h2>
                    {i === 0 && <span className="rounded-full bg-blue text-white text-xs px-2 py-0.5">Best match</span>}
                  </div>
                  <p className="text-sm text-ink-3">{c.title}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-ink-2">
                    {reasons.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold tnum">{score}%</p>
                  <p className="text-xs text-ink-3">fit</p>
                </div>
              </div>
              {i === 0 && (
                <div className="mt-4 flex gap-2">
                  <Button>Assign {c.name.replace("Dr. ", "").split(" ")[0]}</Button>
                  <Button variant="ghost">Book intro call</Button>
                </div>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
}
