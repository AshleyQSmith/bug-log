import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import Bug from "../Pages/Bug.vue";
import { authGuard } from "@bcwdev/auth0-vue";
// import Bug from "../../../server/models/Bug";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/bugs/:bugId",
    name: "Bug",
    component: Bug,
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
