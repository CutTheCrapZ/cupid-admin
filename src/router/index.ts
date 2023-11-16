import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  //   {
  //     path: "/",
  //     component: () => import("@/views/home.vue"),
  //     meta: {
  //       keepAlive: true
  //     }
  //   },
  {
    path: "/style",
    component: () => import("@/views/style/index.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/sentence/index.vue"),
  },

];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 添加统一判断是否返回
router.afterEach((to) => {  // 一定要再afterEach中判断而不是beforeEach，因为beforeEach在点击返回之后获取到的值不准确，每返回一次，会获取到延后一次的to、history
  if (window.history.state && window.history.state.forward) { // 或者判断 to.forward,window.history.state.forward是vue-router写入的，当返回或前进的时候才会有值
    to.meta.isBack = true;
  } else {
    to.meta.isBack = false;
  }
});
// 3导出路由   然后去 main.ts 注册 router.ts
export default router