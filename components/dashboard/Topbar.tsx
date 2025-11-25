"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { supabase } from "@/lib/supabase/client";

export function Topbar() {
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-14 border-b border-default-200 bg-background flex items-center justify-between px-4">
      <div className="font-medium">Dashboard</div>
      <div className="flex items-center gap-2">
        <Button size="sm" color="primary" variant="flat" onPress={() => router.refresh()}>
          Refresh
        </Button>
        <Button size="sm" variant="bordered" onPress={signOut}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
