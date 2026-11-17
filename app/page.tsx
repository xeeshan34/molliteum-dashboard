import Link from "next/link";
import { AlertTriangle, CalendarClock } from "lucide-react";
import {
  athletes,
  coaches,
  orgs,
  leads,
  sessions,
  scoreTrend,
  coachName,
  athleteById,
  fmtDate,
  money,
} from "@/lib/data";
import { Avatar, Button, Card, Delta, PageHeader, ScoreRing, Stat, StatusBadge } from "@/components/ui";
import { ScoreTrend } from "@/components/charts";

export default function Overview() {
  const active = athletes.filter((a) => a.status !== "paused");
  const atRisk = athletes.filter((a) => a.status === "at-risk").sort((a, b) => a.score - b.score);
  const avg = Math.round(active.reduce((s, a) => s + a.score, 0) / active.length);
  const arr = orgs.reduce((s, o) => s + o.arr, 0);
  const openLeads = leads.filter((l) => l.stage !== "Won");
  const pipelineValue = openLeads.reduce((s, l) => s + l.value, 0);
  const capacityUsed = Math.round(
    (coaches.reduce((s, c) => s + c.clients, 0) / coaches.reduce((s, c) => s + c.capacity, 0)) * 100,
  );
  const renewals = orgs
    .filter((o) => o.health < 70)
    .sort((a, b) => a.renewal.localeCompare(b.renewal));
  const upcoming = sessions.slice(0, 5);

  return (
    <>
      <PageHeader
        title="Good afternoon, Alex"
        sub="Here is who needs you today across every coach, team and organization."
      >
        <Button variant="ghost">Export weekly report</Button>
        <Button>Add athlete</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-4">
        <Stat label="Average resilience score" value={String(avg)} delta={4} hint="Across all active athletes" />
        <Stat label="Athletes needing attention" value={String(atRisk.length)} hint="Score under 52 or falling fast" />
        <Stat label="Annual contract value" value={money(arr)} delta={12} hint="Organizations and teams" />
        <Stat label="Coach capacity used" value={`${capacityUsed}%`} hint={`${coaches.length} coaches, 2 cities`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card
          title="Needs attention today"
          className="xl:col-span-2"
          action={<Link href="/athletes" className="text-sm text-blue hover:underline">All athletes</Link>}
        >
          <ul className="divide-y divide-line/70">
            {atRisk.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center gap-4 py-3">
                <ScoreRing score={a.score} size={48} stroke={5} />
                <div className="min-w-0 flex-1">
                  <Link href={`/athletes/${a.id}`} className="font-medium hover:underline">
                    {a.name}
                  </Link>
                  <p className="text-sm text-ink-3 truncate">
                    {a.sport} · Coach {coachName(a.coachId).replace("Dr. ", "").split(" ")[0]} · {a.note}
                  </p>
                </div>
                <Delta value={a.delta} />
                <Button variant="ghost" className="hidden sm:inline-flex">Message coach</Button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Roster resilience, 2026">
          <ScoreTrend data={scoreTrend} />
          <p className="text-sm text-ink-3 mt-2">Up 13 points since January. Team Program athletes gained the most.</p>
        </Card>

        <Card title="Sessions this week" action={<Link href="/sessions" className="text-sm text-blue hover:underline">Schedule</Link>}>
          <ul className="space-y-3">
            {upcoming.map((s) => {
              const a = athleteById(s.athleteId)!;
              return (
                <li key={s.id} className="flex items-center gap-3">
                  <div className="w-14 text-sm tnum text-ink-3 leading-tight">
                    <p className="font-medium text-ink">{s.time}</p>
                    <p>{s.day}</p>
                  </div>
                  <Avatar name={a.name} size={32} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.name}</p>
                    <p className="text-xs text-ink-3 truncate">{s.type} · {coachName(s.coachId).replace("Dr. ", "")}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title="Renewals to protect">
          <ul className="space-y-3">
            {renewals.map((o) => (
              <li key={o.id} className="flex items-start gap-3">
                <AlertTriangle className="size-4 mt-1 text-warn shrink-0" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{o.name}</p>
                  <p className="text-xs text-ink-3">
                    {money(o.arr)} · renews {fmtDate(o.renewal)} · health {o.health}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-3 mt-4">Low health means falling usage or scores. Reach out before the renewal call.</p>
        </Card>

        <Card title="Open applications" action={<Link href="/pipeline" className="text-sm text-blue hover:underline">Pipeline</Link>}>
          <p className="text-3xl font-semibold tnum">{money(pipelineValue)}</p>
          <p className="text-sm text-ink-3 mb-4">{openLeads.length} open opportunities</p>
          <ul className="space-y-2.5">
            {openLeads
              .filter((l) => l.days <= 3)
              .map((l) => (
                <li key={l.id} className="flex items-center gap-2 text-sm">
                  <CalendarClock className="size-4 text-ink-3" aria-hidden />
                  <span className="font-medium">{l.name}</span>
                  <span className="text-ink-3">applied {l.days}d ago</span>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <p className="text-xs text-ink-3 mt-6">
        <StatusBadge status="active" /> All figures on this demo are sample data.
      </p>
    </>
  );
}
