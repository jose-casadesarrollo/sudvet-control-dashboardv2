"use client";

import React from "react";
import { Input, Textarea, Button, User } from "@heroui/react";

// Placeholder implementation. Replace with your HeroUI Pro Profile Setting component.
export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-medium border border-default-200 p-4">
        <User
          name="John Doe"
          description="Customer Support"
          avatarProps={{ src: "https://i.pravatar.cc/150?u=profile" }}
        />
      </div>
      <div className="grid gap-4">
        <Input label="Title" placeholder="e.g Customer Support" variant="bordered" />
        <Input label="Location" placeholder="e.g Buenos Aires, Argentina" variant="bordered" />
        <Textarea label="Biography" placeholder="Short bio" variant="bordered" minRows={4} />
        <div>
          <Button color="primary">Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
