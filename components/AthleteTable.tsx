"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { athletes, coachName, fmtDate, teamName, type Status } from "@/lib/data";
import { Avatar, Card, Delta, ScoreBar, StatusBadge, Table, td, th } from "@/components/ui";
import clsx from "clsx";

const filters: { key: "all" | Status; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "at-risk", label: "Needs attention" },
  { key: "active", label: "On track" },
  { key: "onboarding", label: "Onboarding" },
  { key: "paused", label: "Paused" },
];

export default function AthleteTable() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<"all" | Status>("all");
  const [sport, setSport] = useState("All sports");
  const sports = ["All sports", ...Array.from(new Set(athletes.map((a) => a.sport)))];

  const rows = useMemo(
    () =>
      athletes
        .filter((a) => (f === "all" ? true : a.status === f))
        .filter((a) => (sport === "All sports" ? true : a.sport === sport))
        .filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => a.score - b.score),
    [q, f, sport],
  );

  return (
    <Card className="!p-0">
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-line">
        <input
          aria-label="Filter athletes by name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by name"
          className="h-9 w-56 rounded-lg border border-line px-3 text-sm"
        />
        <select
          aria-label="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="h-9 rounded-lg border border-line px-2 text-sm bg-white"
        >
          {sports.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((x) => (
            <button
              key={x.key}
              onClick={() => setF(x.key)}
              aria-pressed={f === x.key}
              className={clsx(
                "h-8 rounded-full px-3 text-sm",
                f === x.key ? "bg-ink text-white" : "bg-ice-2 text-ink-2 hover:bg-line",
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-ink-3 tnum">{rows.length} athletes</span>
      </div>
      <Table>
        <thead>
          <tr>
            <th className={th}>Athlete</th>
            <th className={th}>Program</th>
            <th className={th}>Coach</th>
            <th className={th}>Resilience</th>
            <th className={th}>30-day</th>
            <th className={th}>Status</th>
            <th className={th}>Next session</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id} className="hover:bg-ice/60">
              <td className={td}>
                <Link href={`/athletes/${a.id}`} className="flex items-center gap-3">
                  <Avatar name={a.name} />
                  <span>
                    <span className="block font-medium">{a.name}</span>
                    <span className="block text-xs text-ink-3">
                      {a.sport} · {a.level}
                      {a.teamId ? ` · ${teamName(a.teamId)}` : ""}
                    </span>
                  </span>
                </Link>
              </td>
              <td className={td}>{a.program}</td>
              <td className={td}>{coachName(a.coachId)}</td>
              <td className={td}><ScoreBar value={a.score} /></td>
              <td className={td}><Delta value={a.delta} /></td>
              <td className={td}><StatusBadge status={a.status} /></td>
              <td className={clsx(td, "tnum")}>{a.nextSession ? fmtDate(a.nextSession) : "Not booked"}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-ink-3">
                No athletes match these filters. Clear a filter to see everyone.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}
