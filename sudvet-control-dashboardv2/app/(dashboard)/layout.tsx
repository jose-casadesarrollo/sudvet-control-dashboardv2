"use client";

import React from "react";
import type { ReactNode } from "react";
import { Button, ScrollShadow, Spacer, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ProSidebar from "@/components/dashboard/pro-sidebar/sidebar";
import { sectionItems } from "@/components/dashboard/pro-sidebar/sidebar-items";
import { supabase } from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;
  const router = useRouter();

  const onToggle = React.useCallback(() => setIsCollapsed((p) => !p), []);

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
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
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

      <div className="w-full flex-1 flex-col p-4">
        <header className="rounded-medium border-small border-divider flex items-center gap-3 p-4">
          <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
            <Icon className="text-default-500" height={24} icon="solar:sidebar-minimalistic-outline" width={24} />
          </Button>
          <h2 className="text-medium text-default-700 font-medium">Overview</h2>
        </header>
        <main className="mt-4 h-full w-full overflow-visible">
          <div className="rounded-medium border-small border-divider flex h-[90%] w-full flex-col gap-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
