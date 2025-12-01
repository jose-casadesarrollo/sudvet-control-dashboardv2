import { type SidebarItem } from "./sidebar";
import TeamAvatar from "./team-avatar";

/**
 * Please check the https://heroui.com/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  { key: "home", href: "/dashboard", icon: "solar:home-2-linear", title: "Home" },
  { key: "treatments", href: "#", icon: "mdi:first-aid-kit", title: "Treatments" },
  { key: "team", href: "/team", icon: "solar:users-group-two-rounded-outline", title: "Team" },
  { key: "profile", href: "/settings/profile", icon: "solar:user-circle-linear", title: "Profile" },
];

export const sectionItems: SidebarItem[] = [
  {
    key: "main",
    title: "Overview",
    items: [
      { key: "home", href: "/dashboard", icon: "solar:home-2-linear", title: "Home" },
      { key: "treatments", href: "#", icon: "mdi:first-aid-kit", title: "Treatments" },
      { key: "team", href: "/team", icon: "solar:users-group-two-rounded-outline", title: "Team" },
      { key: "profile", href: "/settings/profile", icon: "solar:user-circle-linear", title: "Profile" },
    ],
  },
  // Hero UI divider / section
  {
    key: "hero-ui",
    title: "Hero UI",
    // Show a separator before this section and hide the heading text
    showDivider: true,
    sectionClassNames: { heading: "hidden" },
    items: [
      { key: "aware", href: "#", title: "AWARE®", classNames: { title: "text-small font-bold text-default-700" } },
      { key: "lyptus", href: "#", title: "LYPTUS®", classNames: { title: "text-small font-bold text-default-700" } },
      { key: "rosseus", href: "#", title: "ROSSEUS®", classNames: { title: "text-small font-bold text-default-700" } },
    ],
  },
  // Settings and sign out will be rendered at the bottom of the sidebar in the layout
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
