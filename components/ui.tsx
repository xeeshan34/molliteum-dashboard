import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Status } from "@/lib/data";
import { initials } from "@/lib/data";

export function PageHeader({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {sub && <p className="text-ink-3 mt-1 max-w-2xl">{sub}</p>}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

export function Card({
  title,
  action,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={clsx("bg-surface rounded-xl border border-line", className)}>
      {title && (
        <div className="flex items-center justify-between px-5 pt-4 pb-1">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5 pt-3">{children}</div>
    </section>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      {...rest}
      className={clsx(
        "inline-flex items-center gap-2 h-9 rounded-lg px-3.5 text-sm font-medium transition-colors",
        variant === "primary" ? "bg-ink text-white hover:bg-ink-2" : "bg-white border border-line hover:bg-ice-2",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Delta({ value, suffix = "" }: { value: number; suffix?: string }) {
  const up = value >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={clsx("inline-flex items-center gap-0.5 text-sm font-medium tnum", up ? "text-good" : "text-risk")}>
      <Icon className="size-3.5" aria-hidden />
      {Math.abs(value)}
      {suffix}
    </span>
  );
}

const statusStyle: Record<Status, string> = {
  active: "bg-good-soft text-good",
  "at-risk": "bg-risk-soft text-risk",
  onboarding: "bg-blue-soft text-blue",
  paused: "bg-ice-2 text-ink-3",
};
const statusLabel: Record<Status, string> = {
  active: "On track",
  "at-risk": "Needs attention",
  onboarding: "Onboarding",
  paused: "Paused",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={clsx("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[status])}>
      {statusLabel[status]}
    </span>
  );
}

export function scoreColor(n: number) {
  return n >= 70 ? "var(--color-good)" : n >= 55 ? "var(--color-warn)" : "var(--color-risk)";
}

export function ScoreRing({ score, size = 56, stroke = 6 }: { score: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Resilience score ${score}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-ice-2)" strokeWidth={stroke} />
        <circle
          className="ring-anim"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={scoreColor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          style={{ ["--ring-full" as string]: c }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-semibold tnum" style={{ fontSize: size * 0.3 }}>
        {score}
      </span>
    </div>
  );
}

export function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <div className="h-1.5 flex-1 rounded-full bg-ice-2 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: scoreColor(value) }} />
      </div>
      <span className="text-sm tnum w-6 text-right">{value}</span>
    </div>
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return (
    <span
      className="grid place-items-center rounded-full font-medium shrink-0 text-ink"
      style={{ width: size, height: size, fontSize: size * 0.36, background: `hsl(${h} 45% 88%)` }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}) {
  return (
    <div className="bg-surface rounded-xl border border-line p-4">
      <p className="text-sm text-ink-3">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-2xl font-semibold tnum">{value}</p>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      {hint && <p className="text-xs text-ink-3 mt-1">{hint}</p>}
    </div>
  );
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
export const th = "text-left font-medium text-ink-3 px-4 py-2.5 whitespace-nowrap border-b border-line";
export const td = "px-4 py-3 border-b border-line/70 align-middle";
