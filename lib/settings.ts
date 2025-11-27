// Temporary settings data layer — returns hardcoded mock data for now.
// Later this file will be replaced or extended to call Supabase.

export type UserSettings = {
  userId: string;
  theme: "light" | "dark";
  fontSize: "small" | "medium" | "large";
  billingPlan: "pro-monthly" | "pro-yearly" | string;
};

export type TeamMember = { id: string; name: string; email: string; role: string };

let mockSettings: UserSettings = {
  userId: "user_1",
  theme: "dark",
  fontSize: "large",
  billingPlan: "pro-monthly",
};

const mockMembers: TeamMember[] = [
  { id: "1", name: "Tony Reichert", email: "tony.reichert@acme.com", role: "Owner" },
  { id: "2", name: "Zoey Lang", email: "zoey.lang@acme.com", role: "Member" },
  { id: "3", name: "Jane Fisher", email: "jane.fisher@acme.com", role: "Admin" },
];

export async function getUserSettings(userId?: string): Promise<UserSettings> {
  // simulate network
  await new Promise((r) => setTimeout(r, 50));
  return mockSettings;
}

export async function updateUserSettings(partial: Partial<UserSettings>): Promise<UserSettings> {
  mockSettings = { ...mockSettings, ...partial };
  await new Promise((r) => setTimeout(r, 50));
  return mockSettings;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  await new Promise((r) => setTimeout(r, 50));
  return mockMembers;
}

export async function addTeamMember(member: TeamMember): Promise<TeamMember> {
  mockMembers.push(member);
  await new Promise((r) => setTimeout(r, 50));
  return member;
}
