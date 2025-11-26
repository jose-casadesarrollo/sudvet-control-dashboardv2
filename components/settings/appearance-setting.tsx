"use client";

import * as React from "react";
import {Select, SelectItem, Spacer, Button} from "@heroui/react";
import {cn} from "@heroui/react";

import SwitchCell from "./switch-cell";
import ThemeCustomRadio from "./pro/ThemeCustomRadio";
import { getUserSettings, updateUserSettings } from "../../lib/settings";

interface AppearanceSettingCardProps {
  className?: string;
}

const fontSizeOptions = [
  {label: "Small", value: "small", description: "font size 14px"},
  {label: "Medium", value: "medium", description: "font size 16px"},
  {label: "Large", value: "large", description: "font size 18px"},
];

const AppearanceSetting = React.forwardRef<HTMLDivElement, AppearanceSettingCardProps>(
  ({className, ...props}, ref) => {
    const [theme, setTheme] = React.useState<"light" | "dark">("light");
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
      let mounted = true;
      getUserSettings().then((s) => {
        if (!mounted) return;
        setTheme(s.theme);
      });
      return () => {
        mounted = false;
      };
    }, []);

    const onSave = async () => {
      setSaving(true);
      await updateUserSettings({ theme });
      setSaving(false);
    };

    return (
    <div ref={ref} className={cn("p-2", className)} {...props}>
      {/* Theme */}
      <div>
        <p className="text-default-700 text-base font-medium">Theme</p>
        <p className="text-default-400 mt-1 text-sm font-normal">
          Change the appearance of the web.
        </p>
        {/* Theme selector (Pro) */}
        <div className="mt-4 flex gap-4">
          <div onClick={() => setTheme("light")}
               className="[&>*]:w-full">
            <ThemeCustomRadio selected={theme === "light"}>Light</ThemeCustomRadio>
          </div>
          <div onClick={() => setTheme("dark")} className="[&>*]:w-full">
            <ThemeCustomRadio selected={theme === "dark"}>Dark</ThemeCustomRadio>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button className="bg-default-foreground text-background" size="sm" onPress={onSave} isDisabled={saving}>
          {saving ? "Saving..." : "Save Theme"}
        </Button>
      </div>
      <Spacer y={4} />
      {/* Font size */}
      <div className="flex items-start justify-between gap-2 py-2">
        <div>
          <p className="text-default-700 text-base font-medium">Font size</p>
          <p className="text-default-400 mt-1 text-sm font-normal">Adjust the web font size.</p>
        </div>
        <Select className="max-w-[200px]" defaultSelectedKeys={["large"]}>
          {fontSizeOptions.map((fontSizeOption) => (
            <SelectItem key={fontSizeOption.value}>{fontSizeOption.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Spacer y={4} />
      {/* Translucent UI */}
      <SwitchCell
        classNames={{
          base: "bg-transparent p-0",
        }}
        color="foreground"
        description="Use transparency in UI elements like the sidebar and modal dialogs."
        label="Translucent UI"
      />
      <Spacer y={6} />
      {/* Use pointer cursor */}
      <SwitchCell
        classNames={{
          base: "bg-transparent p-0",
        }}
        color="foreground"
        description="Change the cursor to a pointer when hovering"
        label="Use pointer cursor"
      />
    </div>
    );
  },
);

AppearanceSetting.displayName = "AppearanceSetting";

export default AppearanceSetting;
