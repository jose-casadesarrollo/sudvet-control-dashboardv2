"use client";

import React from "react";
import { Button } from "@heroui/react";
import TeamManageTable from "@/components/settings/pro/TeamManageTable";

const demoMembers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member" },
];

export default function TeamSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button color="primary">Invite member</Button>
      </div>
      <TeamManageTable members={demoMembers} />
    </div>
  );
}
