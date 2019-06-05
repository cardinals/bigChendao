import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

export default new Router({
  mode: "",
  base: "/dcd",
  routes: [
    { path: "/", redirect: "/show" },
    { 
      path: "/show",
      name: "show",
      meta: { title: "大陈岛应急管控平台" },
      component: () => import("./views/show")
    },
    {
      path: "/layout",
      name: "layout",
      component: () => import("./views/layout"),
      children: [
        { path: "/console", name: "console", meta: { title: "控制台" }, component: () => import("./views/console")},
      ]
    }
  ]
})