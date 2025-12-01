"use client";

import KpiIndicators from "@/components/dashboard/KpiIndicators";

export default function DashboardOverviewPage() {
  return (
    <div className="min-h-[60vh] p-[15px]">
      <KpiIndicators />
      <div className="mt-6 grid place-items-center text-default-500">
        {/* Placeholder for additional overview metrics/cards to be added later */}
        <p>Overview metrics coming soon...</p>
      </div>
    </div>
  );
}
