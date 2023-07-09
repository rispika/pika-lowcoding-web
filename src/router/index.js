import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";
import NotFound from "@/views/404";
import LoginPage from "@/views/login";
import HomePage from "@/views/home";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登录界面",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "首页",
    component: HomePage,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export function resetRouter() {
  const newRouter = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
  router.matcher = newRouter.matcher; //新路由的实例matcher，赋值给旧路由实例的matcher，(相当于replaceRouter)
}

//解决重复路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
