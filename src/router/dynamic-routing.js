import router from "@/router";
import store from "@/store";
import routerApi from "@/api/routerApi";
router.beforeEach((to, from, next) => {
  // console.log(router.getRoutes());
  if (to.fullPath === "/") {
    router.push("/login");
  } else if (to.fullPath === "/login") {
    next();
  } else {
    // 动态加载菜单路由
    addDynamicMenuAndRoutes(to, from, next);
    // 保存历史
    store.commit("pushRouterHistory", {
      path: to.fullPath,
      name: to.name,
    });
  }
  next();
});
/**
 * 加载动态菜单和路由
 */
// eslint-disable-next-line no-unused-vars
function addDynamicMenuAndRoutes(to, from, next) {
  //使用vuex记录是否已经加载过路由表
  if (store.state.menuRouteLoaded) {
    return;
  }
  //ajax查询路由
  routerApi
    .pikaRouter()
    .then((res) => {
      if (store.state.menuRouteLoaded) {
        return;
      }
      // 添加动态路由
      addDynamicRoutes(res.routers);
      router.addRoute({
        path: "/:pathMatch(.*)",
        redirect: "/404",
      });
      // 保存加载状态
      store.commit("setMenuRouteLoaded", true);
      // 保存菜单树
      store.commit("setNavTree", res.routers);
      // console.log("路由加载完成", router.getRoutes());
    })
    .catch(() => {});
}
// 添加动态路由
function addDynamicRoutes(menuListAll = []) {
  let menuList = [...menuListAll];
  menuList = menuList.map((menu) => {
    let page = "";
    page = menu.component;
    menu.component = () => import(`@/views${page}`);
    router.addRoute("首页", menu);
    return menu;
  });
  return menuList;
}
// 获取组件地址
// function getComponent(component) {
//   return (resolve) => require([component], resolve);
// }
