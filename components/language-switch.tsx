"use client";

import React from "react";
import clsx from "clsx";

export function LanguageSwitch({ className }: { className?: string }) {
  const [locale, setLocale] = React.useState<string>(() => {
    try {
      return (localStorage.getItem("locale") as string) || "es";
    } catch {
      return "es";
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "es" ? "es" : "en";
    }
  }, [locale]);

  const toggle = () => setLocale((l) => (l === "es" ? "en" : "es"));

  return (
    <button
      type="button"
      aria-label="Toggle language"
      onClick={toggle}
      className={clsx(
        "inline-flex items-center gap-2 rounded px-2 py-1 text-sm border border-default-200 bg-default-50 hover:opacity-90",
        className,
      )}
    >
      <span className="font-medium">{locale === "es" ? "ES" : "EN"}</span>
    </button>
  );
}

export default LanguageSwitch;
