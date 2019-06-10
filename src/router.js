import Vue from "vue"
import Router from "vue-router"

//首页
const show = ()=>import('@/views/show') //
const layout = ()=>import('@/views/layout') //

const console = ()=>import('@/views/console/index.vue') //控制台

const mapManagement = ()=>import('@/views/mapManagement/index') //地图管理
const mapManagementLower = ()=>import('@/views/mapManagement/lower.vue') //地图管理 -- 底图管理
const mapManagementLayer = ()=>import('@/views/mapManagement/layer.vue') //地图管理 -- 图层管理


Vue.use(Router)
export default new Router({
  mode: "",
  base: "/dcd",
  routes: [
    { path: "/", redirect: "/show" },
    {
      path: "/show",
      name: "show",
      meta: { title: "大陈岛应急管控平台" },
      component: show
    },
    {
      path: "/layout",
      name: "layout",
      component: layout,
      children: [
        {
          path: "/console",
          name: "console",
          meta: { title: "控制台" },
          component: console
        },
        {
          path: "/mapManagement",
          name: "mapManagement",
          meta: { title: "地图管理" },
          component: mapManagement,
          children: [
            {
              path: "/mapManagement/mapManagementLower",
              name: "mapManagementLower",
              meta: { title: "底层管理" },
              component:mapManagementLower,
            },
            {
              path: "/mapManagement/mapManagementLayer",
              name: "mapManagementLayer",
              meta: { title: "图层管理" },
              component: mapManagementLayer,
            },
          ]
        },
      ]
    }
  ]
})