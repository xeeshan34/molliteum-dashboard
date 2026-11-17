import Link from "next/link";
import { notFound } from "next/navigation";
import { Flame, Lightbulb } from "lucide-react";
import {
  athletes,
  coaches,
  DIMENSIONS,
  fmtDate,
  teamName,
  type Dims,
} from "@/lib/data";
import { Avatar, Button, Card, Delta, PageHeader, ScoreBar, ScoreRing, StatusBadge } from "@/components/ui";
import { ProfileRadar } from "@/components/charts";

export function generateStaticParams() {
  return athletes.map((a) => ({ id: a.id }));
}

const advice: Record<string, string> = {
  Focus: "Add a two-minute breathing reset to the pre-game routine and review it in the next session.",
  Composure: "Practice late-game pressure scenarios in Pocket Coach before the next road trip.",
  Confidence: "Build a short highlight reel and a daily win log to anchor confidence between games.",
  Recovery: "Review sleep and travel routines with the coach. Recovery is dragging every other score.",
  Drive: "Reconnect goals to the athlete's own why. Schedule a goal-setting session this week.",
  Adaptability: "Rehearse plan B routines for lineup and role changes before the next game.",
};

export default async function AthletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = athletes.find((x) => x.id === id);
  if (!a) notFound();

  const coach = coaches.find((c) => c.id === a.coachId)!;
  const peers = athletes.filter((x) => x.sport === a.sport && x.id !== a.id);
  const avg = Object.fromEntries(
    DIMENSIONS.map((d) => [d, Math.round(peers.reduce((s, p) => s + p.dims[d], 0) / Math.max(1, peers.length))]),
  ) as Dims;
  const weakest = [...DIMENSIONS].sort((x, y) => a.dims[x] - a.dims[y])[0];

  return (
    <>
      <p className="text-sm mb-3">
        <Link href="/athletes" className="text-blue hover:underline">Athletes</Link>
      </p>
      <PageHeader title={a.name} sub={`${a.sport} · ${a.level} · ${a.city} · Joined ${fmtDate(a.joined)}, ${a.joined.slice(0, 4)}`}>
        <Button variant="ghost">Book session</Button>
        <Button>Send message</Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Resilience Profile" className="lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <ProfileRadar dims={a.dims} compare={avg} />
              <p className="text-xs text-ink-3 text-center">Dashed line is the average for other {a.sport.toLowerCase()} athletes.</p>
            </div>
            <ul className="space-y-3">
              {DIMENSIONS.map((d) => (
                <li key={d}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{d}</span>
                    <span className="text-ink-3 tnum">team avg {avg[d]}</span>
                  </div>
                  <ScoreBar value={a.dims[d]} />
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-4">
              <ScoreRing score={a.score} size={72} stroke={7} />
              <div>
                <p className="text-sm text-ink-3">Overall resilience</p>
                <div className="flex items-center gap-2 mt-1">
                  <Delta value={a.delta} suffix=" in 30 days" />
                </div>
                <div className="mt-2"><StatusBadge status={a.status} /></div>
              </div>
            </div>
          </Card>

          <Card title="Suggested next step">
            <div className="flex gap-3">
              <Lightbulb className="size-5 text-warn shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="text-sm font-medium">Strengthen {weakest.toLowerCase()}</p>
                <p className="text-sm text-ink-3 mt-1">{advice[weakest]}</p>
              </div>
            </div>
          </Card>

          <Card title="Coach">
            <div className="flex items-center gap-3">
              <Avatar name={coach.name} size={40} />
              <div>
                <p className="font-medium">{coach.name}</p>
                <p className="text-sm text-ink-3">{coach.title}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Program">
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-ink-3">Program</dt><dd>{a.program}</dd>
            <dt className="text-ink-3">Team</dt><dd>{a.teamId ? teamName(a.teamId) : "Individual"}</dd>
            <dt className="text-ink-3">Last session</dt><dd>{fmtDate(a.lastSession)}</dd>
            <dt className="text-ink-3">Next session</dt><dd>{a.nextSession ? fmtDate(a.nextSession) : "Not booked"}</dd>
          </dl>
        </Card>

        <Card title="Pocket Coach streak">
          <div className="flex items-center gap-3">
            <Flame className="size-8 text-warn" aria-hidden />
            <div>
              <p className="text-2xl font-semibold tnum">{a.streak} days</p>
              <p className="text-sm text-ink-3">Daily training in a row</p>
            </div>
          </div>
        </Card>

        <Card title="Coach notes">
          <p className="text-sm">{a.note}</p>
          <p className="text-xs text-ink-3 mt-3">Updated {fmtDate(a.lastSession)} by {coach.name}</p>
        </Card>
      </div>
    </>
  );
}
