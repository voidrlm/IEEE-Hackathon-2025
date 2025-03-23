import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
// import Cookies from 'js-cookie'
// import { logout } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check for the token cookie and change page title
//router.beforeEach((to, from, next) => {
// const authToken = Cookies.get('token')
// const organizationId = Cookies.get('organizationId')

// Change page title based on route
//document.title = to.name || "PAGE TITLE";

// // If the authToken is present, prevent navigation to the root path
// if (authToken && organizationId && to.path === '/') {
//   next({ path: '/TODO' })
// } else if (to.path !== '/' && (!authToken || !organizationId)) {
//   // If the token is not present, check for other routes
//   logout('error')
//   next({ path: '/' }) // Redirect to the home page or login page
// } else {
//   next()
// }
//});

export default router;
