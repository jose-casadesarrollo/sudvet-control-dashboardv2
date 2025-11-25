import type { ReactNode } from "react";
import SettingsTabs from "@/components/settings/SettingsTabs";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-small text-default-500">
          Customize settings, email preferences, and web appearance.
        </p>
      </div>
      <div className="mb-4">
        <SettingsTabs />
      </div>
      <div className="rounded-large border border-default-200 bg-content1 p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}
