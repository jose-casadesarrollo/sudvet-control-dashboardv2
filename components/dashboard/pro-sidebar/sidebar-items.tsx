import { type SidebarItem } from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  { key: "home", href: "/dashboard", icon: "solar:home-2-linear", title: "Home" },
  { key: "team", href: "/team", icon: "solar:users-group-two-rounded-outline", title: "Team" },
  { key: "tasks", href: "#", icon: "solar:checklist-minimalistic-outline", title: "Tasks" },
  { key: "centers", href: "#", icon: "solar:buildings-2-linear", title: "Centers" },
  { key: "cages", href: "#", icon: "mdi:fish", title: "Cages" },
  { key: "treatments", href: "#", icon: "mdi:first-aid-kit", title: "Treatments" },
  { key: "settings", href: "/settings", icon: "solar:settings-outline", title: "Settings" },
];

export const sectionItems: SidebarItem[] = [
  {
    key: "overview",
    title: "Overview",
    items: [
      { key: "home", href: "/dashboard", icon: "solar:home-2-linear", title: "Home" },
      { key: "team", href: "/team", icon: "solar:users-group-two-rounded-outline", title: "Team" },
      { key: "tasks", href: "#", icon: "solar:checklist-minimalistic-outline", title: "Tasks" },
      { key: "centers", href: "#", icon: "solar:buildings-2-linear", title: "Centers" },
      { key: "cages", href: "#", icon: "mdi:fish", title: "Cages" },
      { key: "treatments", href: "#", icon: "mdi:first-aid-kit", title: "Treatments" },
    ],
  },
  // Settings is rendered below the section (after the divider)
  { key: "settings", href: "/settings", icon: "solar:settings-outline", title: "Settings" },
  { key: "signout", href: "#", icon: "solar:logout-2-outline", title: "Sign out" },
];

export const sectionItemsWithTeams: SidebarItem[] = [
  ...sectionItems,
  {
    key: "your-teams",
    title: "Your Teams",
    items: [
      { key: "heroui", href: "#", title: "HeroUI", startContent: <TeamAvatar name="Hero UI" /> },
      { key: "tailwind-variants", href: "#", title: "Tailwind Variants", startContent: <TeamAvatar name="Tailwind Variants" /> },
      { key: "heroui-pro", href: "#", title: "HeroUI Pro", startContent: <TeamAvatar name="HeroUI Pro" /> },
    ],
  },
];
