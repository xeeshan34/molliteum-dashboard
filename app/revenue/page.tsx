import { revenue } from "@/lib/data";
import { Card, PageHeader, Stat } from "@/components/ui";
import { RevenueStack } from "@/components/charts";

export default function Revenue() {
  const cur = revenue[revenue.length - 1];
  const prev = revenue[revenue.length - 2];
  const tot = (r: (typeof revenue)[number]) => r.coaching + r.teams + r.pocket + r.profiles;
  const ytd = revenue.reduce((s, r) => s + tot(r), 0);

  const streams = [
    { name: "Teams & orgs", v: cur.teams },
    { name: "1-on-1 coaching", v: cur.coaching },
    { name: "Pocket Coach", v: cur.pocket },
    { name: "Resilience Profiles", v: cur.profiles },
  ];

  return (
    <>
      <PageHeader title="Revenue" sub="Monthly revenue by product, so you can see which line is growing and which is flat." />

      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <Stat label="November revenue" value={`$${tot(cur)}k`} delta={Math.round(((tot(cur) - tot(prev)) / tot(prev)) * 100)} hint="Change vs October, %" />
        <Stat label="Year to date" value={`$${ytd}k`} />
        <Stat label="Pocket Coach growth" value={`$${cur.pocket}k`} delta={Math.round(((cur.pocket - revenue[0].pocket) / revenue[0].pocket) * 100)} hint="Change since January, %" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Revenue by product, 2026 ($k)" className="lg:col-span-2">
          <RevenueStack data={revenue} />
        </Card>
        <Card title="November mix">
          <ul className="space-y-4">
            {streams.map((s) => (
              <li key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{s.name}</span>
                  <span className="tnum text-ink-3">${s.v}k · {Math.round((s.v / tot(cur)) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-ice-2 overflow-hidden">
                  <div className="h-full bg-blue rounded-full" style={{ width: `${(s.v / tot(cur)) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
