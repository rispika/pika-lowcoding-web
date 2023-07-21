import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/stylesheet/global.scss";
import "@/assets/iconfont/iconfont.css";
import PikaComponent from "./components";
import util from "@/utils/util";
Vue.use(PikaComponent);
Vue.prototype.$util = util;
Vue.use(ElementUI);
Vue.config.productionTip = false;
import "@/router/dynamic-routing";
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
