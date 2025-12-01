"use client";

import React from "react";
import type { ReactNode } from "react";
import { ScrollShadow, Spacer, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { updateUserSettings } from "@/lib/settings";

import ProSidebar from "@/components/dashboard/pro-sidebar/sidebar";
import { sectionItems } from "@/components/dashboard/pro-sidebar/sidebar-items";
import { supabase } from "@/lib/supabase/client";
// Inline icon switches per request

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [user, setUser] = React.useState<any | null>(null);
  const pathname = usePathname();
  const [locale, setLocale] = React.useState<string>(() => {
    try {
      return (localStorage.getItem("locale") as string) || "es";
    } catch {
      return "es";
    }
  });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const onToggle = React.useCallback(() => setIsCollapsed((p) => !p), []);

  const currentKey = React.useMemo(() => {
    const p = pathname || "";
    if (p.startsWith("/settings")) return "settings";
    if (p.startsWith("/team")) return "team";
    return "home";
  }, [pathname]);

  const headerTitle = React.useMemo(() => {
    switch (currentKey) {
      case "team":
        return "Team";
      case "settings":
        return "Settings";
      case "home":
      default:
        return "Overview";
    }
  }, [currentKey]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (mounted) setUser(data?.user ?? null);
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "es" ? "es" : "en";
    }
  }, [locale]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className={cn(
          // Increase top padding so the Sudvet logo center aligns
          // with the header and avatar vertical centerline
          "border-r-small! border-divider transition-width relative flex h-full w-72 flex-col px-6 pb-6 pt-8",
          {
            // Compact: lower the icon stack slightly (top padding up)
            "w-16 items-center px-2 pb-4 pt-6": isCompact,
          },
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center px-3",
            { "gap-0": isCompact }
          )}
        >
          {isCompact ? (
            <Image src="/icono_sudvet.png" alt="Sedvet" width={32} height={32} priority />
          ) : (
            <Image src="/logo_sudvet.png" alt="Sedvet" width={120} height={24} priority />
          )}
        </div>
        {/* Tighten up vertical spacing and hide the profile row on compact */}
        <Spacer y={isCompact ? 2 : 4} />
        <div className={cn("flex items-center gap-3 px-3", { hidden: isCompact })}>
          <Avatar isBordered className="flex-none" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
            <p className="text-small text-default-600 truncate font-medium">John Doe</p>
            <p className="text-tiny text-default-400 truncate">Product Designer</p>
          </div>
        </div>
        {/* Sidebar content should be static (no internal scroll) */}
        <div className={cn("flex-1 max-h-full pr-6 py-6") }>
          <ProSidebar
            key={`${isCompact ? "c" : "e"}-${currentKey}`}
            defaultSelectedKey={currentKey}
            isCompact={isCompact}
            items={sectionItems}
            classNames={{ list: isCompact ? "pt-6 pb-2" : undefined }}
            onNavSelect={(key: string) => {
              if (key === "home") router.push("/dashboard");
              if (key === "team") router.push("/team");
              if (key === "profile") router.push("/settings/profile");
            }}
          />
        </div>

        {/* Bottom actions (stick to bottom of the sidebar column) */}
        <div className="mt-auto px-3">
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => router.push("/settings")}
              className="flex items-center gap-2 px-3 min-h-11 rounded-large h-[44px] hover:bg-default-100 text-default-700 w-full"
            >
              <Icon className="text-default-500" icon="solar:settings-outline" width={20} />
              <span className="text-small font-medium">Settings</span>
            </button>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="flex items-center gap-2 px-3 min-h-11 rounded-large h-[44px] hover:bg-default-100 text-default-700 w-full"
            >
              <Icon className="text-default-500" icon="solar:logout-2-outline" width={20} />
              <span className="text-small font-medium">Sign out</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col p-4 min-h-0">
        <header className="rounded-medium border-small border-divider flex items-center gap-3 p-4 justify-between">
          <div className="flex items-center gap-3">
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon className="text-default-500" height={24} icon="solar:sidebar-minimalistic-outline" width={24} />
            </Button>
            <h2 className="text-medium text-default-700 font-medium">{headerTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={
                    user?.user_metadata?.avatar_url || user?.user_metadata?.avatar || (user ? `https://i.pravatar.cc/150?u=${user.id}` : "https://i.pravatar.cc/150?u=a04258114e29026708c")
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat" onAction={async (key) => {
                if (key === "profile") router.push("/settings/profile");
                if (key === "settings") router.push("/settings");
                if (key === "logout") {
                  await supabase.auth.signOut();
                  router.push("/login");
                }
              }}>
                <DropdownItem key="toggles" className="gap-3" isReadOnly>
                  <div className="flex w-full flex-col gap-4">
                    <div className="flex w-full items-center justify-between">
                      <Switch
                        size="sm"
                        color="primary"
                        startContent={<SunIcon />}
                        endContent={<MoonIcon />}
                        isSelected={theme === "dark"}
                        onValueChange={async (selected) => {
                          const newTheme = selected ? "dark" : "light";
                          setTheme(newTheme);
                          try { await updateUserSettings({ theme: newTheme }); } catch {}
                        }}
                      >
                        Dark mode
                      </Switch>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <Switch
                        color="primary"
                        size="sm"
                        isSelected={locale === "en"}
                        onValueChange={(selected) => setLocale(selected ? "en" : "es")}
                      >
                        {locale === "en" ? "English" : "Español"}
                      </Switch>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem key="profile-info" className="h-14 gap-2" isReadOnly>
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold truncate">{user?.user_metadata?.full_name ?? user?.email ?? "Unknown"}</p>
                </DropdownItem>
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">Sign out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>
        <main className="mt-4 flex-1 min-h-0 w-full overflow-hidden">
          <ScrollShadow hideScrollBar className="rounded-medium border-small border-divider h-full w-full">
            <div className="flex min-h-full w-full flex-col gap-4">
              {children}
            </div>
          </ScrollShadow>
        </main>
      </div>
    </div>
  );
}
