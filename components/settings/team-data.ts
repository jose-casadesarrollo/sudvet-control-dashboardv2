// Removed lodash dependency: build unique options with Sets

const columns = [
  {name: "NAME", uid: "name", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "Owner",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@acme.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Member",
    team: "Development",
    status: "pending",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@acme.com",
  },
];

/**
 * To use this function you need to install lodash in your project
 * ```bash
 * npm install lodash
 * ```
 */
const rolesOptions = (() => {
  const seen = new Set<string>();
  const result: { name: string; uid: string }[] = [];
  for (const user of users) {
    const uid = user.role.toLowerCase();
    if (!seen.has(uid)) {
      seen.add(uid);
      result.push({ name: user.role, uid });
    }
  }
  return result;
})();

/**
 * To use this function you need to install lodash in your project
 * ```bash
 * npm install lodash
 * ```
 */
const statusOptions = (() => {
  const seen = new Set<string>();
  const result: { name: string; uid: string }[] = [];
  for (const user of users) {
    const uid = user.status.toLowerCase();
    if (!seen.has(uid)) {
      seen.add(uid);
      result.push({ name: user.status, uid });
    }
  }
  return result;
})();

export {columns, users, rolesOptions, statusOptions};
