# Molliteum Command Centre (demo)

A Next.js demo dashboard for managing coaches, athletes, teams and organizations.
All data is fictional and lives in `lib/data.ts`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- `/` Command centre: who needs attention today, renewals to protect, sessions, open applications
- `/athletes` and `/athletes/[id]`: filterable roster and six-dimension Resilience Profile radar
- `/coaches`: capacity, ratings, retention, specialties
- `/teams`: team resilience heatmap and contract usage
- `/organizations`: contract value, renewals, account health
- `/sessions`: weekly schedule across coaches
- `/matching`: ranks coaches for a new athlete
- `/pipeline`: applications by stage
- `/pocket-coach`: app usage, streaks, athletes who went quiet
- `/revenue`: revenue by product

## Next steps to make it real

Replace `lib/data.ts` with a database (Postgres + Prisma) and add auth (role-based: admin, coach, team staff, athlete).
The six profile dimensions are placeholders; swap in Molliteum's real Resilience Profile model.
