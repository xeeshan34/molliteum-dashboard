import { athletes, pocketWeekly } from "@/lib/data";
import { Avatar, Card, PageHeader, Stat } from "@/components/ui";
import { PocketLines } from "@/components/charts";

export default function PocketCoach() {
  const withApp = athletes.filter((a) => a.status !== "paused");
  const top = [...withApp].sort((a, b) => b.streak - a.streak).slice(0, 5);
  const quiet = withApp.filter((a) => a.streak === 0).slice(0, 5);
  const last = pocketWeekly[pocketWeekly.length - 1];

  return (
    <>
      <PageHeader
        title="Pocket Coach"
        sub="Usage of the self-serve app. Daily training is the earliest sign that an athlete is slipping or surging."
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <Stat label="Weekly active athletes" value={String(last.active)} delta={26} hint="Up from 410 last week" />
        <Stat label="Training sessions this week" value={last.sessions.toLocaleString()} delta={120} />
        <Stat label="Average streak" value={`${Math.round(withApp.reduce((s, a) => s + a.streak, 0) / withApp.length)} days`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Last 8 weeks" className="lg:col-span-2">
          <PocketLines data={pocketWeekly} />
        </Card>

        <div className="space-y-4">
          <Card title="Longest streaks">
            <ul className="space-y-3">
              {top.map((a) => (
                <li key={a.id} className="flex items-center gap-3">
                  <Avatar name={a.name} size={30} />
                  <span className="flex-1 text-sm font-medium">{a.name}</span>
                  <span className="text-sm tnum text-good font-medium">{a.streak} days</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Gone quiet">
            {quiet.length === 0 ? (
              <p className="text-sm text-ink-3">Everyone trained this week.</p>
            ) : (
              <ul className="space-y-3">
                {quiet.map((a) => (
                  <li key={a.id} className="flex items-center gap-3">
                    <Avatar name={a.name} size={30} />
                    <span className="flex-1 text-sm font-medium">{a.name}</span>
                    <span className="text-xs text-risk">No training</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
