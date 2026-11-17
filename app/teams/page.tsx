import { DIMENSIONS, fmtDate, orgName, teams } from "@/lib/data";
import { Button, Card, Delta, PageHeader, ScoreRing, Table, td, th } from "@/components/ui";

const roster: Record<string, number> = { t1: 26, t2: 22, t3: 15, t4: 24, t5: 20 };
const offsets = [4, -3, 6, -8, 2, -1, 5, -6, 3, 0, -4, 7, -2, 1, -5, 4, -7, 6, 2, -3, 5, -1, 0, 3, -4, 2, 6, -5, 1, -2];

function teamDims(avg: number, idx: number) {
  return DIMENSIONS.map((d, i) => Math.max(25, Math.min(95, avg + offsets[(idx * 6 + i) % offsets.length])));
}

function heat(v: number) {
  if (v >= 72) return { bg: "var(--color-good-soft)", fg: "var(--color-good)" };
  if (v >= 58) return { bg: "var(--color-warn-soft)", fg: "#8a5a0a" };
  return { bg: "var(--color-risk-soft)", fg: "var(--color-risk)" };
}

export default function Teams() {
  return (
    <>
      <PageHeader
        title="Teams"
        sub="See where each team is strong and where it cracks under pressure, using real scores instead of gut feel."
      >
        <Button variant="ghost">Download team report</Button>
        <Button>Add team</Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-2 mb-4">
        {teams.map((t, i) => {
          const dims = teamDims(t.avgScore, i);
          return (
            <Card key={t.id}>
              <div className="flex items-start gap-4">
                <ScoreRing score={t.avgScore} size={64} stroke={6} />
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold truncate">{t.name}</h2>
                  <p className="text-sm text-ink-3">{t.sport} · {t.league} · {t.city}</p>
                  <div className="mt-1"><Delta value={t.delta} suffix=" this season" /></div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold tnum">{roster[t.id]} athletes</p>
                  <p className="text-ink-3 tnum">{t.adoption}% active weekly</p>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-1.5 mt-5">
                {DIMENSIONS.map((d, j) => {
                  const c = heat(dims[j]);
                  return (
                    <div key={d} className="rounded-lg px-1 py-2 text-center" style={{ background: c.bg, color: c.fg }}>
                      <p className="text-lg font-semibold tnum leading-none">{dims[j]}</p>
                      <p className="text-[11px] mt-1 text-ink-2">{d}</p>
                    </div>
                  );
                })}
              </div>
              {t.adoption < 55 && (
                <p className="text-sm text-risk mt-4">Low usage. Schedule a team check-in before the contract ends on {fmtDate(t.contractEnd)}.</p>
              )}
            </Card>
          );
        })}
      </div>

      <Card title="Contracts" className="!p-0">
        <Table>
          <thead>
            <tr>
              <th className={th}>Team</th>
              <th className={th}>Organization</th>
              <th className={th}>Contract ends</th>
              <th className={th}>Weekly usage</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.id}>
                <td className={`${td} font-medium`}>{t.name}</td>
                <td className={td}>{orgName(t.orgId)}</td>
                <td className={`${td} tnum`}>{fmtDate(t.contractEnd)}, {t.contractEnd.slice(0, 4)}</td>
                <td className={`${td} tnum`}>{t.adoption}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
