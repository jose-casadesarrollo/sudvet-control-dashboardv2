"use client";

import React from "react";
import { RadioGroup, Radio, Button, Switch } from "@heroui/react";

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = React.useState("system");
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup label="Theme" value={theme} onValueChange={setTheme} orientation="horizontal">
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
        <Radio value="system">System</Radio>
      </RadioGroup>
      <Switch defaultSelected>Use reduced motion</Switch>
      <div>
        <Button color="primary">Save</Button>
      </div>
    </div>
  );
}
