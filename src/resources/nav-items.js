import store from "@/store";
export function getNavItems() {
  const permissions = store.getters.permissions.roles || [];
  return navItems.filter(
    (item) =>
      item.permission.length === 0 ||
      item.permission.some((permission) => permissions.includes(permission))
  );
}
const navItems = [
  {
    title: "Feed",
    icon: "mdi-home",
    permission: [],
  },
  {
    title: "Trending",
    icon: "mdi-fire",
    permission: [],
  },
  {
    title: "Jobs",
    icon: "mdi-briefcase",
    permission: [],
  },
  {
    title: "Events",
    icon: "mdi-calendar-multiple",
    permission: [],
  },
];
