"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../utils";
import { Listbox } from "@heroui/react";

export function Sidebar() {
  const pathname = usePathname();
  // Placeholder nav; you'll provide config later
  const items = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/jobs", label: "Jobs" },
    { href: "/dashboard/workers", label: "Workers" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-default-200 bg-content1 h-full p-4 hidden md:block">
      <div className="text-small text-default-500 mb-3">Dashboard</div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 rounded-medium hover:bg-default-100 text-default-700",
              pathname === item.href && "bg-default-100 text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
