import "core-js/stable";
import "regenerator-runtime/runtime";
import "./registerHook";
import "./registerServiceWorker";

import Vue from "vue";
import * as ui from "@bpui/ui";
import '@/i18n';

import App from "./app.vue";
import routers from "./router/_tmpConfig";

import '@/directives';
import '@/filters';
import '@/components';
import '@/components/font-icons/registerFontIcon';
import '@/api';
import '@/libs/keyboard';
import networkHandler from '@/libs/networkHandle';

// 拓展图标
require("@/components/font-icons/fonts/iconfont.css");

__debug = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

// setup.
// ui.forbidDebugger();
ui.setNavbarDefaultCfg({
  retainPageInPush: false,
});
ui.setNetworkHandler(new networkHandler());

// register app.
// 404 使用nginx指向 /404.html 页面.
routers.push({ name: null, path: '*', component: () => import('./pages/404.vue') });
ui.registerApp({ routePath: routers, basePath: '/' });

// create instance.
export default new Vue({
  render: h => h(App)
}).$mount("#app");
