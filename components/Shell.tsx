"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  User,
  Shield,
  Building2,
  CalendarDays,
  Inbox,
  Smartphone,
  Wallet,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";
import clsx from "clsx";

const nav = [
  { group: "Overview", items: [{ href: "/", label: "Command centre", icon: LayoutDashboard }] },
  {
    group: "People",
    items: [
      { href: "/athletes", label: "Athletes", icon: User },
      { href: "/coaches", label: "Coaches", icon: Users },
      { href: "/teams", label: "Teams", icon: Shield },
      { href: "/organizations", label: "Organizations", icon: Building2 },
    ],
  },
  {
    group: "Work",
    items: [
      { href: "/sessions", label: "Sessions", icon: CalendarDays },
      { href: "/matching", label: "Coach matching", icon: Sparkles },
      { href: "/pipeline", label: "Applications", icon: Inbox },
    ],
  },
  {
    group: "Business",
    items: [
      { href: "/pocket-coach", label: "Pocket Coach", icon: Smartphone },
      { href: "/revenue", label: "Revenue", icon: Wallet },
    ],
  },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="hidden lg:flex flex-col bg-ink text-white sticky top-0 h-screen px-4 py-6">
        <Link href="/" className="flex items-center gap-2.5 px-2 mb-8">
          <span className="grid place-items-center size-8 rounded-lg bg-white text-ink font-bold text-lg">M</span>
          <span>
            <span className="block font-semibold leading-none">Molliteum</span>
            <span className="block text-xs text-white/60 mt-1">Command centre</span>
          </span>
        </Link>
        <nav className="flex-1 overflow-y-auto space-y-6" aria-label="Main">
          {nav.map((g) => (
            <div key={g.group}>
              <p className="px-2 mb-1.5 text-xs text-white/50">{g.group}</p>
              <ul className="space-y-0.5">
                {g.items.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active(href) ? "page" : undefined}
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active(href) ? "bg-white/12 text-white font-medium" : "text-white/70 hover:bg-white/8 hover:text-white",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mt-4 rounded-xl bg-white/8 p-3 text-sm">
          <p className="font-medium">Toronto · Los Angeles</p>
          <p className="text-white/60 text-xs mt-0.5">Demo workspace with sample data</p>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 bg-ice/90 backdrop-blur border-b border-line">
          <div className="flex items-center gap-3 px-4 lg:px-8 h-14">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-3" aria-hidden />
              <input
                aria-label="Search"
                placeholder="Search athletes, coaches, teams"
                className="w-full h-9 rounded-lg bg-white border border-line pl-9 pr-3 text-sm placeholder:text-ink-3"
              />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button aria-label="Notifications" className="relative grid place-items-center size-9 rounded-lg bg-white border border-line">
                <Bell className="size-4" aria-hidden />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-risk" />
              </button>
              <span className="grid place-items-center size-9 rounded-full bg-ink text-white text-sm font-medium">AD</span>
            </div>
          </div>
          <nav className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-2" aria-label="Main mobile">
            {nav.flatMap((g) => g.items).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "shrink-0 rounded-full px-3 py-1 text-sm",
                  active(href) ? "bg-ink text-white" : "bg-white border border-line text-ink-2",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 lg:px-8 py-6 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}
