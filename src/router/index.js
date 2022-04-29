import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let access_token = window.localStorage.getItem("access_token");

let routes =
  access_token && process.env.VUE_APP_CLIENT_SECRET
    ? [
        {
          path: "*",
          name: "notFound",
          component: () => import("../views/not-found"),
        },
        {
          path: "/",
          name: "home",
          component: () => import("../views/home"),
        },
        {
          path: "/items",
          name: "items",
          component: () => import("../views/admin-pages/items-page"),
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("../views/admin-pages/orders-page"),
        },
        {
          path: "/canceled-orders",
          name: "canceled-orders",
          component: () => import("../views/admin-pages/canceled-orders-page"),
        },
        {
          path: "/users",
          name: "users",
          component: () => import("../views/admin-pages/users-page"),
        },
      ]
    : [
        {
          path: "/login",
          name: "login",
          component: () => import("../views/login"),
        },
      ];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
