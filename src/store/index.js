import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pikaRouter: [],
    menuRouteLoaded: false,
    collapse: true,
    routerHistory: [],
    navTree: [],
  },
  getters: {},
  mutations: {
    setNavTree(state, newVal) {
      state.navTree = newVal;
    },
    setCollapse(state, newVal) {
      state.collapse = newVal;
    },
    setPikaRouter(state, newVal) {
      state.pikaRouter = newVal;
    },
    setMenuRouteLoaded(state, newVal) {
      state.menuRouteLoaded = newVal;
    },
    pushRouterHistory(state, val) {
      if (
        JSON.stringify(state.routerHistory).indexOf(JSON.stringify(val)) > 0 ||
        !val.name
      ) {
        return;
      }
      state.routerHistory.push(val);
    },
    removeRouterHistory(state, val) {
      state.routerHistory = state.routerHistory.filter(
        (router) => router.name !== val
      );
    },
  },
  actions: {},
  modules: {},
});
