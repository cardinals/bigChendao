import Vue from "vue"
import Router from "vue-router"

//首页
const show = ()=>import('@/views/show') //
const layout = ()=>import('@/views/layout') //

const console = ()=>import('@/views/console/index.vue') //控制台

const mapManagement = ()=>import('@/views/mapManagement/index') //地图管理
const mapManagementLower = ()=>import('@/views/mapManagement/lower.vue') //地图管理 -- 底图管理


const mapManagementindex = ()=>import('@/views/mapManagement/components/index.vue') //地图管理
const mapManagementLayer = ()=>import('@/views/mapManagement/components/layer.vue') //地图管理 -- 底图管理
const addmap = ()=>import('@/views/mapManagement/components/addmap.vue') //地图管理 -- 图层管理 -- 添加图层

const areaManagement = ()=>import('@/views/areaManagement/index.vue') //区域管理
const areaManagementindex = ()=>import('@/views/areaManagement/components/index.vue') //区域管理 -- 区域分组管理
const areaManagementgroup = ()=>import('@/views/areaManagement/components/group.vue') //区域管理 -- 区域分组管理
const addgroup = ()=>import('@/views/areaManagement/components/addgroup.vue') //区域管理 -- 区域分组管理 -- 添加分组

const resourceEquipmentManagement = ()=>import('@/views/resourceEquipmentManagement/index.vue') //资源设备管理
const resourceManagementindex = ()=>import('@/views/resourceEquipmentManagement/components/index.vue') ///资源设备管理 -- 设备管理
const resourceManagementgroup = ()=>import('@/views/resourceEquipmentManagement/components/resource.vue') //资源设备管理 -- 设备管理
const addresource = ()=>import('@/views/resourceEquipmentManagement/components/addresource.vue') //资源设备管理 -- 设备分组管理 -- 添加

const equipmentManagementindex = ()=>import('@/views/resourceEquipmentManagement/equipment/index.vue') ///资源设备管理 -- 资源管理
const equipmentManagementgroup = ()=>import('@/views/resourceEquipmentManagement/equipment/equipment.vue') //资源设备管理 -- 资源管理
const addequipment = ()=>import('@/views/resourceEquipmentManagement/equipment/addequipment.vue') //资源设备管理 -- 资源管理 -- 添加

Vue.use(Router)

const router =  new Router({
  mode: "",
  base: "/dcd",
  routes: [
    { path: "/", redirect: "/console" },
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
              meta: { title: "底图管理" },
              component:mapManagementLower,
            },
            {
              path: "/mapManagement/mapManagementLayer",
              name: "mapManagementLayer",
              meta: { title: "图层管理" },
              redirect: '/mapManagement/mapManagementLayer',
              component: mapManagementindex,
                children: [{
                    path: '',
                    component: mapManagementLayer,
                },{
                    path: "addmap",
                    name: "addmap",
                    meta: { title: "图层添加" },
                    component:addmap,
                }]
            },
          ]
        },
        {
            path: "/areaManagement",
            name: "areaManagement",
            meta: { title: "区域管理" },
            component: areaManagement,
            children: [
                {
                    path: "/areaManagement/areagroupManagement",
                    name: "areagroupManagement",
                    meta: { title: "区域分组管理" },
                    redirect: '/areaManagement/areagroupManagement',
                    component: areaManagementindex,
                    children: [{
                        path: '',
                        component: areaManagementgroup,
                    },{
                        path: "addgroup",
                        name: "addgroup",
                        meta: { title: "添加分组" },
                        component:addgroup,
                    }]
                },

            ]
        },
          {
              path: "/resourceEquipmentManagement",
              name: "resourceEquipmentManagement",
              meta: { title: "资源设备管理" },
              component: resourceEquipmentManagement,
              children: [
                  {
                      path: "/resourceEquipmentManagement/resourceManagement",
                      name: "resourceManagement",
                      meta: { title: "设备管理" },
                      redirect: '/resourceEquipmentManagement/resourceManagement',
                      component: resourceManagementindex,
                      children: [{
                          path: '',
                          component: resourceManagementgroup,
                      },{
                          path: "addresource",
                          name: "addresource",
                          meta: { title: "添加监控" },
                          component:addresource,
                      }]
                  },
                  {
                      path: "/resourceEquipmentManagement/equipmentManagement",
                      name: "equipmentManagement",
                      meta: { title: "资源管理" },
                      redirect: '/resourceEquipmentManagement/equipmentManagement',
                      component: equipmentManagementindex,
                      children: [{
                          path: '',
                          component: equipmentManagementgroup,
                      },{
                          path: "addequipment",
                          name: "addequipment",
                          meta: { title: "添加监控" },
                          component:addequipment,
                      }]
                  },
              ]
          },
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {

  next()
})

export default router