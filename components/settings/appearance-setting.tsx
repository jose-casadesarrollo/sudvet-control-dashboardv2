"use client";

import * as React from "react";
import {Select, SelectItem, Spacer, Switch, cn} from "@heroui/react";
import { useTheme } from "next-themes";

import SwitchCell from "./switch-cell";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
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
    const { theme: currentTheme, setTheme: setNextTheme } = useTheme();

    React.useEffect(() => {
      let mounted = true;
      getUserSettings().then((s) => {
        if (!mounted) return;
        setTheme(s.theme);
        // ensure UI theme reflects saved preference on first load
        if (s.theme && s.theme !== currentTheme) {
          try { setNextTheme(s.theme); } catch {}
        }
      });
      return () => {
        mounted = false;
      };
    }, []);

    const onToggleTheme = async (selected: boolean) => {
      const newTheme: "light" | "dark" = selected ? "dark" : "light";
      setTheme(newTheme);
      try { setNextTheme(newTheme); } catch {}
      try { await updateUserSettings({ theme: newTheme }); } catch {}
    };

    return (
    <div ref={ref} className={cn("p-2", className)} {...props}>
      {/* Theme */}
      <div>
        <p className="text-default-700 text-base font-medium">Theme</p>
        <p className="text-default-400 mt-1 text-sm font-normal">Change the appearance of the web.</p>
        <div className="mt-4">
          <Switch
            color="primary"
            size="sm"
            isSelected={theme === "dark"}
            onValueChange={onToggleTheme}
            startContent={<SunFilledIcon />}
            endContent={<MoonFilledIcon />}
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary",
              ),
              wrapper: "p-0 h-3 overflow-visible",
              thumb: cn(
                "w-4 h-4 border-2 shadow-lg",
                "group-data-[hover=true]:border-primary",
                // selected
                "group-data-[selected=true]:ms-4",
                // pressed
                "group-data-[pressed=true]:w-5",
                "group-data-pressed:group-data-selected:ms-3",
              ),
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Dark mode</p>
              <p className="text-tiny text-default-400">Switch between light and dark themes.</p>
            </div>
          </Switch>
        </div>
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
