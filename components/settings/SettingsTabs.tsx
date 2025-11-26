"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  { key: "profile", title: "Profile", href: "/settings/profile" },
  { key: "appearance", title: "Appearance", href: "/settings/appearance" },
  { key: "account", title: "Account", href: "/settings/account" },
  { key: "team", title: "Team", href: "/settings/team" },
  { key: "billing", title: "Billing", href: "/settings/billing" },
];

export default function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const selected = React.useMemo(() => {
    const match = routes.find((r) => pathname?.startsWith(r.href));
    return match?.key ?? "profile";
  }, [pathname]);

  return (
    <Tabs
      selectedKey={selected}
      onSelectionChange={(key) => {
        const route = routes.find((r) => r.key === key);
        if (route) router.push(route.href);
      }}
      variant="underlined"
      className="max-w-full"
    >
      {routes.map((r) => (
        <Tab key={r.key} title={r.title} />
      ))}
    </Tabs>
  );
}
