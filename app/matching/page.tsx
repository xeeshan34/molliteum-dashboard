import Matcher from "@/components/Matcher";
import { PageHeader } from "@/components/ui";

export default function Matching() {
  return (
    <>
      <PageHeader
        title="Coach matching"
        sub="Pick the right coach for a new athlete in seconds, based on sport, challenge, location and who actually has room."
      />
      <Matcher />
    </>
  );
}
