import type { ReactNode } from "react";
import SettingsTabs from "@/components/settings/SettingsTabs";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-small text-default-500">
          Customize settings, email preferences, and web appearance.
        </p>
      </div>
      <div className="mb-4">
        <SettingsTabs />
      </div>
      {children}
    </div>
  );
}
