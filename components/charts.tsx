"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DIMENSIONS, type Dims } from "@/lib/data";

const axis = { fontSize: 12, fill: "#5b6b82" };
const tip = { borderRadius: 8, border: "1px solid #d5dfeb", fontSize: 13 };

export function ScoreTrend({ data }: { data: { m: string; score: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f6fb3" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#2f6fb3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e1e9f2" vertical={false} />
        <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={false} />
        <YAxis domain={[50, 80]} tick={axis} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tip} />
        <Area type="monotone" dataKey="score" name="Avg resilience" stroke="#2f6fb3" strokeWidth={2.5} fill="url(#sg)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RevenueStack({
  data,
}: {
  data: { m: string; coaching: number; teams: number; pocket: number; profiles: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid stroke="#e1e9f2" vertical={false} />
        <XAxis dataKey="m" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
        <Tooltip contentStyle={tip} formatter={(v) => `$${v}k`} cursor={{ fill: "#eef3f8" }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
        <Bar dataKey="teams" name="Teams & orgs" stackId="a" fill="#0b1f3a" />
        <Bar dataKey="coaching" name="1-on-1 coaching" stackId="a" fill="#2f6fb3" />
        <Bar dataKey="pocket" name="Pocket Coach" stackId="a" fill="#7fb0df" />
        <Bar dataKey="profiles" name="Resilience Profiles" stackId="a" fill="#bcd5ee" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PocketLines({ data }: { data: { w: string; active: number; sessions: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <CartesianGrid stroke="#e1e9f2" vertical={false} />
        <XAxis dataKey="w" tick={axis} tickLine={false} axisLine={false} />
        <YAxis tick={axis} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tip} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
        <Line type="monotone" dataKey="sessions" name="Training sessions" stroke="#2f6fb3" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="active" name="Weekly active athletes" stroke="#0b1f3a" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ProfileRadar({ dims, compare, height = 280 }: { dims: Dims; compare?: Dims; height?: number }) {
  const data = DIMENSIONS.map((d) => ({ d, v: dims[d], c: compare?.[d] }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#d5dfeb" />
        <PolarAngleAxis dataKey="d" tick={{ fontSize: 12, fill: "#1a3355" }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        {compare && (
          <Radar name="Team average" dataKey="c" stroke="#7fb0df" fill="#7fb0df" fillOpacity={0.15} strokeDasharray="4 3" />
        )}
        <Radar name="Athlete" dataKey="v" stroke="#0b1f3a" fill="#2f6fb3" fillOpacity={0.35} strokeWidth={2} />
        <Tooltip contentStyle={tip} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
