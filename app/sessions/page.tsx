import { athleteById, coachName, sessions } from "@/lib/data";
import { Avatar, Button, Card, PageHeader } from "@/components/ui";

const days = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"];

export default function Sessions() {
  return (
    <>
      <PageHeader title="Sessions" sub="This week across every coach. Reschedule or reassign without chasing email threads.">
        <Button variant="ghost">Sync calendars</Button>
        <Button>Book session</Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((d) => {
          const list = sessions.filter((s) => s.day === d).sort((a, b) => a.time.localeCompare(b.time));
          return (
            <Card key={d} title={d} className="!bg-white">
              {list.length === 0 && <p className="text-sm text-ink-3">No sessions. Open a slot for a new athlete.</p>}
              <ul className="space-y-3">
                {list.map((s) => {
                  const a = athleteById(s.athleteId)!;
                  return (
                    <li key={s.id} className="rounded-lg bg-ice p-3">
                      <div className="flex items-center justify-between text-xs text-ink-3 tnum">
                        <span className="font-medium text-ink">{s.time}</span>
                        <span>{s.minutes} min · {s.mode}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar name={a.name} size={26} />
                        <p className="text-sm font-medium truncate">{a.name}</p>
                      </div>
                      <p className="text-xs text-ink-3 mt-1.5">{s.type}</p>
                      <p className="text-xs text-ink-3">{coachName(s.coachId)}</p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>
    </>
  );
}
