// Demo data only. All names, teams and numbers are fictional placeholders.

export const DIMENSIONS = [
  "Focus",
  "Composure",
  "Confidence",
  "Recovery",
  "Drive",
  "Adaptability",
] as const;
export type Dimension = (typeof DIMENSIONS)[number];
export type Dims = Record<Dimension, number>;

export type Status = "active" | "at-risk" | "onboarding" | "paused";
export type Program = "1-on-1 Coaching" | "Pocket Coach" | "Team Program";

export interface Coach {
  id: string;
  name: string;
  title: string;
  city: "Toronto" | "Los Angeles" | "Remote";
  specialties: string[];
  sports: string[];
  capacity: number;
  clients: number;
  rating: number;
  sessionsMonth: number;
  retention: number;
  responseHrs: number;
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  level: string;
  teamId: string | null;
  coachId: string;
  program: Program;
  status: Status;
  score: number;
  delta: number;
  dims: Dims;
  lastSession: string;
  nextSession: string | null;
  streak: number;
  city: string;
  joined: string;
  note: string;
}

export interface Team {
  id: string;
  name: string;
  sport: string;
  league: string;
  orgId: string;
  city: string;
  avgScore: number;
  delta: number;
  contractEnd: string;
  adoption: number;
}

export interface Org {
  id: string;
  name: string;
  type: "Pro franchise" | "College program" | "Academy" | "Corporate" | "Agency";
  city: string;
  arr: number;
  renewal: string;
  health: number;
  lead: string;
}

export interface Session {
  id: string;
  time: string;
  day: string;
  athleteId: string;
  coachId: string;
  type: string;
  mode: "In person" | "Video" | "Phone";
  minutes: number;
}

export interface Lead {
  id: string;
  name: string;
  sport: string;
  source: string;
  stage: "Applied" | "Intro call" | "Profile booked" | "Proposal" | "Won";
  value: number;
  days: number;
  interest: string;
}

// ---- seeded random so the demo looks the same on every load ----
let seed = 20261115;
function rnd() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
const pick = <T,>(a: readonly T[]): T => a[Math.floor(rnd() * a.length)];
const between = (a: number, b: number) => Math.round(a + rnd() * (b - a));
const clamp = (n: number) => Math.max(18, Math.min(98, n));

export const coaches: Coach[] = [
  { id: "c1", name: "Dr. Amara Okafor", title: "Head of Performance Psychology", city: "Toronto", specialties: ["Pressure moments", "Slump recovery"], sports: ["Hockey", "Basketball"], capacity: 14, clients: 13, rating: 4.9, sessionsMonth: 52, retention: 96, responseHrs: 2 },
  { id: "c2", name: "Marcus Delacroix", title: "Senior Resilience Coach", city: "Los Angeles", specialties: ["Pre-game routines", "Confidence"], sports: ["Basketball", "Baseball"], capacity: 14, clients: 12, rating: 4.8, sessionsMonth: 47, retention: 93, responseHrs: 3 },
  { id: "c3", name: "Priya Raman", title: "Resilience Coach", city: "Toronto", specialties: ["Injury return", "Anxiety"], sports: ["Hockey", "Soccer"], capacity: 12, clients: 8, rating: 4.9, sessionsMonth: 33, retention: 95, responseHrs: 2 },
  { id: "c4", name: "Jonas Lindqvist", title: "Team Consultant", city: "Remote", specialties: ["Team culture", "Leadership"], sports: ["Hockey", "Football"], capacity: 8, clients: 6, rating: 4.7, sessionsMonth: 21, retention: 91, responseHrs: 5 },
  { id: "c5", name: "Tamika Harris", title: "Senior Resilience Coach", city: "Los Angeles", specialties: ["Rookie transition", "Identity"], sports: ["Basketball", "Football"], capacity: 14, clients: 14, rating: 4.8, sessionsMonth: 55, retention: 94, responseHrs: 4 },
  { id: "c6", name: "Elliot Banerjee", title: "Resilience Coach", city: "Toronto", specialties: ["Focus", "Contract-year stress"], sports: ["Baseball", "Hockey"], capacity: 12, clients: 7, rating: 4.6, sessionsMonth: 28, retention: 89, responseHrs: 6 },
  { id: "c7", name: "Sofia Castellanos", title: "Resilience Coach", city: "Remote", specialties: ["Youth & academy", "Parents"], sports: ["Soccer", "Tennis"], capacity: 12, clients: 9, rating: 4.8, sessionsMonth: 36, retention: 92, responseHrs: 3 },
];

const first = ["Jalen", "Noah", "Kai", "Mateo", "Darius", "Tyler", "Aiden", "Zion", "Elias", "Rowan", "Maya", "Imani", "Sienna", "Camila", "Harper", "Layla", "Nora", "Tessa", "Brooke", "Avery", "Callum", "Dmitri", "Santiago", "Owen", "Felix", "Jordan", "Riley", "Quinn", "Malik", "Theo", "Luca", "Everett"];
const last = ["Whitfield", "Okonkwo", "Brandt", "Nakamura", "Ferreira", "Lavoie", "Sutherland", "Ibarra", "Kowalski", "Mbeki", "Thorne", "Castillo", "Vasquez", "Halloran", "Petrov", "Osei", "Bergstrom", "Delgado", "Hartley", "Moreau", "Singh", "Reyes", "Calloway", "Tran", "Fontaine", "Abara", "Lindgren", "Park"];

export const orgs: Org[] = [
  { id: "o1", name: "Lakeshore Hockey Club", type: "Pro franchise", city: "Toronto", arr: 148000, renewal: "2027-03-01", health: 91, lead: "c4" },
  { id: "o2", name: "Pacific Coast Basketball", type: "Pro franchise", city: "Los Angeles", arr: 186000, renewal: "2027-06-30", health: 84, lead: "c2" },
  { id: "o3", name: "Northgate University Athletics", type: "College program", city: "Toronto", arr: 62000, renewal: "2026-12-15", health: 58, lead: "c6" },
  { id: "o4", name: "Summit Youth Academy", type: "Academy", city: "Los Angeles", arr: 38000, renewal: "2027-02-10", health: 76, lead: "c7" },
  { id: "o5", name: "Harbour Capital Partners", type: "Corporate", city: "Toronto", arr: 54000, renewal: "2027-01-20", health: 88, lead: "c1" },
  { id: "o6", name: "Apex Sports Management", type: "Agency", city: "Los Angeles", arr: 72000, renewal: "2026-12-31", health: 63, lead: "c5" },
];

export const teams: Team[] = [
  { id: "t1", name: "Lakeshore Hockey Club", sport: "Hockey", league: "Pro", orgId: "o1", city: "Toronto", avgScore: 74, delta: 6, contractEnd: "2027-03-01", adoption: 88 },
  { id: "t2", name: "Lakeshore Juniors", sport: "Hockey", league: "Junior", orgId: "o1", city: "Toronto", avgScore: 66, delta: 9, contractEnd: "2027-03-01", adoption: 94 },
  { id: "t3", name: "Pacific Coast Basketball", sport: "Basketball", league: "Pro", orgId: "o2", city: "Los Angeles", avgScore: 71, delta: 3, contractEnd: "2027-06-30", adoption: 79 },
  { id: "t4", name: "Northgate Varsity Hockey", sport: "Hockey", league: "College", orgId: "o3", city: "Toronto", avgScore: 58, delta: -4, contractEnd: "2026-12-15", adoption: 41 },
  { id: "t5", name: "Summit U18 Soccer", sport: "Soccer", league: "Academy", orgId: "o4", city: "Los Angeles", avgScore: 63, delta: 5, contractEnd: "2027-02-10", adoption: 72 },
];

const programs: Program[] = ["1-on-1 Coaching", "1-on-1 Coaching", "Pocket Coach", "Team Program", "Team Program"];
const sports = ["Hockey", "Basketball", "Hockey", "Basketball", "Baseball", "Soccer", "Football", "Tennis"];
const levels = ["Pro", "Pro", "Pro", "College", "Junior", "Academy"];

const notes = [
  "Pre-game routine holding; second-half composure dips.",
  "Contract-year pressure rising. Check in before road trip.",
  "Back from injury. Confidence rebuilding week by week.",
  "Strong streak in Pocket Coach. Ready for advanced track.",
  "Skipped last two sessions. Reach out today.",
  "New to the program. Resilience Profile booked.",
  "Slump over 6 games. Focus score down sharply.",
  "Leading by example in the locker room.",
];

export const athletes: Athlete[] = Array.from({ length: 44 }).map((_, i) => {
  const base = between(42, 90);
  const dims = Object.fromEntries(
    DIMENSIONS.map((d) => [d, clamp(base + between(-18, 16))]),
  ) as Dims;
  const score = Math.round(DIMENSIONS.reduce((s, d) => s + dims[d], 0) / DIMENSIONS.length);
  const delta = between(-9, 14);
  const roll = rnd();
  const status: Status =
    score < 52 || delta < -5 ? "at-risk" : roll > 0.9 ? "onboarding" : roll > 0.84 ? "paused" : "active";
  const program = pick(programs);
  const sport = pick(sports);
  const team = teams.filter((t) => t.sport === sport);
  const coachPool = coaches.filter((c) => c.sports.includes(sport));
  const day = between(1, 28);
  return {
    id: `a${i + 1}`,
    name: `${first[i % first.length]} ${last[(i * 5 + 3) % last.length]}`,
    sport,
    level: pick(levels),
    teamId: program === "Team Program" && team.length ? pick(team).id : null,
    coachId: (coachPool.length ? pick(coachPool) : coaches[0]).id,
    program,
    status,
    score,
    delta,
    dims,
    lastSession: `2026-11-${String(Math.min(14, day)).padStart(2, "0")}`,
    nextSession: status === "paused" ? null : `2026-11-${String(between(16, 27)).padStart(2, "0")}`,
    streak: status === "paused" ? 0 : between(0, 41),
    city: pick(["Toronto", "Los Angeles", "Vancouver", "Chicago", "Montreal"]),
    joined: `202${between(3, 6)}-${String(between(1, 12)).padStart(2, "0")}-${String(between(1, 28)).padStart(2, "0")}`,
    note: status === "at-risk" ? pick([notes[1], notes[4], notes[6]]) : pick(notes),
  };
});

const sessionTypes = ["1-on-1 session", "Resilience Profile debrief", "Pre-game prep", "Team workshop", "Check-in call"];
const times = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00", "17:30"];
const days = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20"];
export const sessions: Session[] = Array.from({ length: 22 }).map((_, i) => {
  const a = athletes[(i * 2) % athletes.length];
  return {
    id: `s${i + 1}`,
    day: days[i % 5],
    time: times[i % times.length],
    athleteId: a.id,
    coachId: a.coachId,
    type: pick(sessionTypes),
    mode: pick(["In person", "Video", "Video", "Phone"] as const),
    minutes: pick([30, 45, 60]),
  };
});

export const leads: Lead[] = [
  { id: "l1", name: "Reid Callahan", sport: "Hockey", source: "Podcast", stage: "Applied", value: 6400, days: 1, interest: "1-on-1 Coaching" },
  { id: "l2", name: "Aaliyah Jenkins", sport: "Basketball", source: "Referral", stage: "Applied", value: 6400, days: 2, interest: "1-on-1 Coaching" },
  { id: "l3", name: "Westbrook Prep", sport: "Basketball", source: "Website", stage: "Applied", value: 18000, days: 3, interest: "Team Program" },
  { id: "l4", name: "Mikael Strand", sport: "Hockey", source: "Referral", stage: "Intro call", value: 6400, days: 4, interest: "1-on-1 Coaching" },
  { id: "l5", name: "Dani Whitmore", sport: "Soccer", source: "Newsletter", stage: "Intro call", value: 900, days: 6, interest: "Resilience Profile" },
  { id: "l6", name: "Bayview Hockey Assoc.", sport: "Hockey", source: "Conference", stage: "Intro call", value: 24000, days: 5, interest: "Team Program" },
  { id: "l7", name: "Cole Ashworth", sport: "Baseball", source: "Agent", stage: "Profile booked", value: 7200, days: 8, interest: "1-on-1 Coaching" },
  { id: "l8", name: "Redwood Athletics", sport: "Football", source: "Referral", stage: "Profile booked", value: 32000, days: 9, interest: "Team Program" },
  { id: "l9", name: "Priscilla Ng", sport: "Tennis", source: "Podcast", stage: "Proposal", value: 6400, days: 12, interest: "1-on-1 Coaching" },
  { id: "l10", name: "Metro Junior League", sport: "Hockey", source: "Conference", stage: "Proposal", value: 46000, days: 15, interest: "Team Program" },
  { id: "l11", name: "Jamal Brooks", sport: "Basketball", source: "Agent", stage: "Won", value: 7200, days: 18, interest: "1-on-1 Coaching" },
  { id: "l12", name: "Eastside Soccer Club", sport: "Soccer", source: "Website", stage: "Won", value: 21000, days: 22, interest: "Team Program" },
];

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
export const revenue = [
  { m: "Jan", coaching: 52, teams: 41, pocket: 6, profiles: 5 },
  { m: "Feb", coaching: 54, teams: 41, pocket: 7, profiles: 6 },
  { m: "Mar", coaching: 57, teams: 44, pocket: 8, profiles: 8 },
  { m: "Apr", coaching: 58, teams: 47, pocket: 9, profiles: 7 },
  { m: "May", coaching: 61, teams: 47, pocket: 11, profiles: 9 },
  { m: "Jun", coaching: 63, teams: 52, pocket: 12, profiles: 10 },
  { m: "Jul", coaching: 60, teams: 52, pocket: 14, profiles: 8 },
  { m: "Aug", coaching: 62, teams: 55, pocket: 16, profiles: 9 },
  { m: "Sep", coaching: 68, teams: 58, pocket: 19, profiles: 12 },
  { m: "Oct", coaching: 71, teams: 63, pocket: 22, profiles: 13 },
  { m: "Nov", coaching: 74, teams: 66, pocket: 25, profiles: 14 },
];

export const scoreTrend = months.map((m, i) => ({
  m,
  score: [58, 59, 60, 61, 63, 64, 64, 66, 67, 69, 71][i],
}));

export const pocketWeekly = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map((w, i) => ({
  w,
  active: [310, 325, 340, 362, 371, 398, 410, 436][i],
  sessions: [1180, 1260, 1310, 1410, 1480, 1590, 1640, 1760][i],
}));

export const coachName = (id: string) => coaches.find((c) => c.id === id)?.name ?? "Unassigned";
export const athleteById = (id: string) => athletes.find((a) => a.id === id);
export const teamName = (id: string | null) => teams.find((t) => t.id === id)?.name ?? "";
export const orgName = (id: string) => orgs.find((o) => o.id === id)?.name ?? "";
export const money = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
export const fmtDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
export const initials = (n: string) =>
  n
    .replace("Dr. ", "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
