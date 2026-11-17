import AthleteTable from "@/components/AthleteTable";
import { Button, PageHeader } from "@/components/ui";

export default function Athletes() {
  return (
    <>
      <PageHeader
        title="Athletes"
        sub="Every individual in 1-on-1 coaching, Pocket Coach or a team program. Lowest scores come first so nobody slips through."
      >
        <Button variant="ghost">Import roster</Button>
        <Button>Add athlete</Button>
      </PageHeader>
      <AthleteTable />
    </>
  );
}
