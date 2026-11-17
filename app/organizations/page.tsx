import { coachName, fmtDate, money, orgs, teams } from "@/lib/data";
import { Button, Card, PageHeader, ScoreBar, Stat, Table, td, th } from "@/components/ui";

export default function Organizations() {
  const arr = orgs.reduce((s, o) => s + o.arr, 0);
  const atRiskArr = orgs.filter((o) => o.health < 70).reduce((s, o) => s + o.arr, 0);

  return (
    <>
      <PageHeader
        title="Organizations"
        sub="Franchises, colleges, academies and agencies. One view of contracts, renewals and account health."
      >
        <Button>Add organization</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3 mb-4">
        <Stat label="Contract value" value={money(arr)} delta={12} hint="Annual" />
        <Stat label="Revenue at risk" value={money(atRiskArr)} hint="Accounts with health under 70" />
        <Stat label="Organizations" value={String(orgs.length)} hint={`${teams.length} teams`} />
      </div>

      <Card className="!p-0">
        <Table>
          <thead>
            <tr>
              <th className={th}>Organization</th>
              <th className={th}>Type</th>
              <th className={th}>Lead coach</th>
              <th className={th}>Annual value</th>
              <th className={th}>Renewal</th>
              <th className={th}>Account health</th>
            </tr>
          </thead>
          <tbody>
            {orgs
              .slice()
              .sort((a, b) => a.renewal.localeCompare(b.renewal))
              .map((o) => (
                <tr key={o.id} className="hover:bg-ice/60">
                  <td className={td}>
                    <p className="font-medium">{o.name}</p>
                    <p className="text-xs text-ink-3">{o.city}</p>
                  </td>
                  <td className={td}>{o.type}</td>
                  <td className={td}>{coachName(o.lead)}</td>
                  <td className={`${td} tnum`}>{money(o.arr)}</td>
                  <td className={`${td} tnum`}>{fmtDate(o.renewal)}, {o.renewal.slice(0, 4)}</td>
                  <td className={td}><ScoreBar value={o.health} /></td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
