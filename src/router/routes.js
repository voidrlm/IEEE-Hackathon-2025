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
    path: "/feed",
    name: "Feed",
    component: () => import("../views/feed.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("../views/events.vue"),
  },
  {
    path: "/trending",
    name: "Trending",
    component: () => import("../views/trending.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import("../views/jobSearch.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",

    component: () => import("../views/notFoundPage.vue"),
  },
];
