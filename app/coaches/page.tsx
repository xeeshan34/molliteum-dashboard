import { Star } from "lucide-react";
import { athletes, coaches } from "@/lib/data";
import { Avatar, Button, Card, PageHeader, Stat } from "@/components/ui";

export default function Coaches() {
  const sessions = coaches.reduce((s, c) => s + c.sessionsMonth, 0);
  const free = coaches.reduce((s, c) => s + (c.capacity - c.clients), 0);
  const rating = (coaches.reduce((s, c) => s + c.rating, 0) / coaches.length).toFixed(1);

  return (
    <>
      <PageHeader title="Coaches" sub="Capacity, quality and workload for every coach, so you know who can take the next athlete.">
        <Button>Invite coach</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <Stat label="Open client spots" value={String(free)} hint="Across all coaches" />
        <Stat label="Sessions this month" value={String(sessions)} delta={9} />
        <Stat label="Average client rating" value={rating} hint="Out of 5" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coaches.map((c) => {
          const pct = Math.round((c.clients / c.capacity) * 100);
          const mine = athletes.filter((a) => a.coachId === c.id);
          const risk = mine.filter((a) => a.status === "at-risk").length;
          return (
            <Card key={c.id}>
              <div className="flex items-center gap-3">
                <Avatar name={c.name} size={44} />
                <div className="min-w-0">
                  <h2 className="font-semibold truncate">{c.name}</h2>
                  <p className="text-sm text-ink-3">{c.title} · {c.city}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span>Capacity</span>
                  <span className="tnum text-ink-3">{c.clients} of {c.capacity} clients</span>
                </div>
                <div className="h-2 rounded-full bg-ice-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: pct >= 100 ? "var(--color-risk)" : pct >= 85 ? "var(--color-warn)" : "var(--color-blue)" }}
                  />
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-2 mt-4 text-sm">
                <div>
                  <dt className="text-ink-3 text-xs">Rating</dt>
                  <dd className="font-semibold flex items-center gap-1 tnum"><Star className="size-3.5 fill-warn text-warn" aria-hidden />{c.rating}</dd>
                </div>
                <div>
                  <dt className="text-ink-3 text-xs">Retention</dt>
                  <dd className="font-semibold tnum">{c.retention}%</dd>
                </div>
                <div>
                  <dt className="text-ink-3 text-xs">Replies in</dt>
                  <dd className="font-semibold tnum">{c.responseHrs}h</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {[...c.specialties, ...c.sports].map((s) => (
                  <span key={s} className="rounded-full bg-blue-soft text-blue px-2.5 py-0.5 text-xs">{s}</span>
                ))}
              </div>
              {risk > 0 && (
                <p className="text-sm text-risk mt-4">{risk} athlete{risk > 1 ? "s" : ""} need attention</p>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
