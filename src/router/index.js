import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("../pages/dashboard.vue"),
      },
          {
        path: "/drivers",
        component: () => import("../pages/driver/driversList.vue"),
      },
      {
        path: "/driver-detail/:id",
        name: "driver-details",
        component: () => import("../pages/driver/driver-details.vue"),
      },
      {
        path: "/create-driver",
        name: "create-driver",
        component: () => import("../pages/driver/create-driver.vue"),
      },
      {
        path: "/update-driver/:id",
        name: "update-driver",
        component: () => import("../pages/driver/update-driver.vue"),
      },
      {
        path: "/orders",
        component: () => import("../pages/order/orderList.vue"),
      },
      {
        path: "/order-truck/:id",
        name:'/order-truck-details',
        component: () => import("../pages/order/order-truck-details.vue"),
      },
      {
        path: "/users",
        component: () => import("../pages/users/userLists.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../layouts/auth.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../pages/auth/login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("adminData");
  if (to.name !== "login" && !token) next({ name: "login" });
  else next();
});

export default router;
