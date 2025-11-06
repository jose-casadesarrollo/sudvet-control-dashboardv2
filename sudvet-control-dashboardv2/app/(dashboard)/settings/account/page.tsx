"use client";

import React from "react";
import { Input, Button } from "@heroui/react";

export default function AccountSettingsPage() {
  return (
    <div className="grid gap-4 max-w-2xl">
      <Input type="email" label="Email" placeholder="name@domain.com" variant="bordered" />
      <Input type="password" label="Current password" variant="bordered" />
      <Input type="password" label="New password" variant="bordered" />
      <div className="flex gap-2">
        <Button color="primary">Update Account</Button>
        <Button color="danger" variant="bordered">Delete Account</Button>
      </div>
    </div>
  );
}
