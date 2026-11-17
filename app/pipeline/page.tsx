import { leads, money, type Lead } from "@/lib/data";
import { Button, Card, PageHeader } from "@/components/ui";

const stages: Lead["stage"][] = ["Applied", "Intro call", "Profile booked", "Proposal", "Won"];

export default function Pipeline() {
  return (
    <>
      <PageHeader
        title="Applications"
        sub="Everyone who applied for coaching or asked about team solutions, and what happens next."
      >
        <Button>Add lead</Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stages.map((s) => {
          const list = leads.filter((l) => l.stage === s);
          const total = list.reduce((n, l) => n + l.value, 0);
          return (
            <section key={s} aria-label={s}>
              <div className="flex items-baseline justify-between mb-2 px-1">
                <h2 className="font-semibold">{s}</h2>
                <span className="text-sm text-ink-3 tnum">{list.length} · {money(total)}</span>
              </div>
              <div className="space-y-3">
                {list.map((l) => (
                  <Card key={l.id} className="!rounded-lg">
                    <p className="font-medium">{l.name}</p>
                    <p className="text-sm text-ink-3">{l.sport} · {l.interest}</p>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="font-semibold tnum">{money(l.value)}</span>
                      <span className={l.days > 10 && s !== "Won" ? "text-warn tnum" : "text-ink-3 tnum"}>
                        {s === "Won" ? `Won ${l.days}d ago` : `${l.days}d in stage`}
                      </span>
                    </div>
                    <p className="text-xs text-ink-3 mt-1">Source: {l.source}</p>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
