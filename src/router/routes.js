export const routes = [
  {
    path: "/homepage",
    beforeEnter() {
      location.href = "https://github.com/voidrlm";
    },
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/events.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",

    component: () => import("../views/notFoundPage.vue"),
  },
];
