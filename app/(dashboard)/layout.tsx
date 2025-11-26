"use client";

import React from "react";
import type { ReactNode } from "react";
import { Button, ScrollShadow, Spacer, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ProSidebar from "@/components/dashboard/pro-sidebar/sidebar";
import { sectionItems } from "@/components/dashboard/pro-sidebar/sidebar-items";
import { supabase } from "@/lib/supabase/client";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitch from "@/components/language-switch";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [user, setUser] = React.useState<any | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;
  const router = useRouter();

  const onToggle = React.useCallback(() => setIsCollapsed((p) => !p), []);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className={cn(
          "border-r-small! border-divider transition-width relative flex h-full w-72 flex-col p-6",
          { "w-16 items-center px-2 py-6": isCompact },
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
        <Spacer y={8} />
        <div className="flex items-center gap-3 px-3">
          <Avatar isBordered className="flex-none" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          <div className={cn("flex max-w-full flex-col", { hidden: isCompact })}>
            <p className="text-small text-default-600 truncate font-medium">John Doe</p>
            <p className="text-tiny text-default-400 truncate">Product Designer</p>
          </div>
        </div>
        <ScrollShadow hideScrollBar className="-mr-6 h-full max-h-full py-6 pr-6">
          <ProSidebar
            defaultSelectedKey="home"
            isCompact={isCompact}
            items={sectionItems}
            onNavSelect={(key: string) => {
              if (key === "settings") router.push("/settings");
              if (key === "home") router.push("/dashboard");
              if (key === "signout") {
                supabase.auth.signOut().finally(() => router.push("/login"));
              }
            }}
          />
        </ScrollShadow>
      </div>

      <div className="w-full flex-1 flex flex-col p-4 min-h-0">
        <header className="rounded-medium border-small border-divider flex items-center gap-3 p-4 justify-between">
          <div className="flex items-center gap-3">
            <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
              <Icon className="text-default-500" height={24} icon="solar:sidebar-minimalistic-outline" width={24} />
            </Button>
            <h2 className="text-medium text-default-700 font-medium">Overview</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" color="primary" variant="flat" onPress={() => router.refresh()}>
              Refresh
            </Button>

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
                <DropdownItem key="theme" className="gap-3" isReadOnly>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-default-500">Theme</span>
                      <ThemeSwitch />
                    </div>
                    <div>
                      <LanguageSwitch />
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
