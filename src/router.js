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

const alllandscape = ()=>import('@/views/alllandscapeManagement/index.vue') //全景管理
const alllandscapeindex = ()=>import('@/views/alllandscapeManagement/components/index.vue') //全景管理 -- 全景
const alllandscapegroup = ()=>import('@/views/alllandscapeManagement/components/alllandscape.vue') //全景管理 -- 全景
const addalllandscape = ()=>import('@/views/alllandscapeManagement/components/addalllandscape.vue') //全景管理 -- 全景 -- 添加全景

const locationManagement = ()=>import('@/views/locationManagement/index.vue') //定位管理
const locationpersonnelindex = ()=>import('@/views/locationManagement/personnel/index.vue') //定位管理 -- 人员
const locationpersonnelgroup = ()=>import('@/views/locationManagement/personnel/personnelgroup.vue') //定位管理 -- 人员
const addpersonnel = ()=>import('@/views/locationManagement/personnel/addpersonnel.vue') //定位管理 -- 人员 -- 添加人员
const personneltrajectory = ()=>import('@/views/locationManagement/personnel/trajectory.vue') //定位管理 -- 人员 -- 人员轨迹

const locationcarindex = ()=>import('@/views/locationManagement/car/index.vue') //定位管理 -- 车辆
const locationcargroup = ()=>import('@/views/locationManagement/car/cargroup.vue') //定位管理 -- 车辆
const addcar = ()=>import('@/views/locationManagement/car/addcar.vue') //定位管理 -- 车辆 -- 添加车辆
const cartrajectory = ()=>import('@/views/locationManagement/car/trajectory.vue') //定位管理 -- 车辆 -- 车辆轨迹

const warningplanManagement = ()=>import('@/views/warningplanManagement/index.vue') //预警预案管理
const planindex = ()=>import('@/views/warningplanManagement/plan/index.vue') //预警预案管理 -- 预案管理
const plangroup = ()=>import('@/views/warningplanManagement/plan/plangroup.vue') //预警预案管理 -- 预案管理
const addplan = ()=>import('@/views/warningplanManagement/plan/addplan.vue') //预警预案管理 -- 预案管理 -- 添加预案
const addeventlist = ()=>import('@/views/warningplanManagement/plan/addeventlist.vue') //预警预案管理 -- 预案管理 -- 添加事件类型

const warninglindex = ()=>import('@/views/warningplanManagement/warning/index.vue') //预警预案管理 -- 预警管理
const warninggroup = ()=>import('@/views/warningplanManagement/warning/warninggroup.vue') //预警预案管理 -- 预警管理
const addwarning = ()=>import('@/views/warningplanManagement/warning/addwarninggroup.vue') //预警预案管理 -- 预警管理 -- 添加预警

const maillistManagement = ()=>import('@/views/maillistManagement/index.vue') //通讯录管理
const maillistindex = ()=>import('@/views/maillistManagement/components/index.vue') //通讯录管理 -- 通讯录分组
const maillistgroup = ()=>import('@/views/maillistManagement/components/maillistgroup.vue') //通讯录管理 -- 通讯录分组
const addmaillist = ()=>import('@/views/maillistManagement/components/addmaillist.vue') //通讯录管理 -- 通讯录分组 -- 添加组
const addmaillistpop = ()=>import('@/views/maillistManagement/components/addmaillistpop.vue') //通讯录管理 -- 通讯录分组 -- 添加人




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
          {
              path: "/alllandscape",
              name: "alllandscape",
              meta: { title: "全景管理" },
              component: alllandscape,
              children: [
                  {
                      path: "/alllandscape/alllandscapeManagement",
                      name: "alllandscapeManagement",
                      meta: { title: "全景" },
                      redirect: '/alllandscape/alllandscapeManagement',
                      component: alllandscapeindex,
                      children: [{
                          path: '',
                          component: alllandscapegroup,
                      },{
                          path: "addalllandscape",
                          name: "addalllandscape",
                          meta: { title: "添加全景" },
                          component:addalllandscape,
                      }]
                  },
              ]
          },
          {
              path: "/locationManagement",
              name: "locationManagement",
              meta: { title: "定位管理" },
              component: locationManagement,
              children: [
                  {
                      path: "/locationManagement/personnelManagement",
                      name: "locationpersonnelindex",
                      meta: { title: "人员管理" },
                      redirect: '/locationManagement/personnelManagement',
                      component: locationpersonnelindex,
                      children: [{
                          path: '',
                          component: locationpersonnelgroup,
                      },{
                          path: "addpersonnel",
                          name: "addpersonnel",
                          meta: { title: "添加人员" },
                          component:addpersonnel,
                      },{
                          path: "personneltrajectory",
                          name: "personneltrajectory",
                          meta: { title: "人员轨迹" },
                          component:personneltrajectory,
                      }]
                  },
                  {
                      path: "/locationManagement/carManagement",
                      name: "locationcarindex",
                      meta: { title: "车辆管理" },
                      redirect: '/locationManagement/carManagement',
                      component: locationcarindex,
                      children: [{
                          path: '',
                          component: locationcargroup,
                      },{
                          path: "addcar",
                          name: "addcar",
                          meta: { title: "添加车辆" },
                          component:addcar,
                      },{
                          path: "cartrajectory",
                          name: "cartrajectory",
                          meta: { title: "车辆轨迹" },
                          component:cartrajectory,
                      }]
                  },
              ]
          },
          {
              path: "/warningplanManagement",
              name: "warningplanManagement",
              meta: { title: "预警预案管理" },
              component: warningplanManagement,
              children: [
                  {
                      path: "/warningplanManagement/planManagement",
                      name: "planindex",
                      meta: { title: "预案管理" },
                      redirect: '/warningplanManagement/planManagement',
                      component: planindex,
                      children: [{
                          path: '',
                          component: plangroup,
                      },{
                          path: "addeventlist",
                          name: "addeventlist",
                          meta: { title: "添加事件分组" },
                          component:addeventlist,
                      },{
                          path: "addplan",
                          name: "addplan",
                          meta: { title: "添加预案" },
                          component:addplan,
                      }]
                  },
                  {
                      path: "/warningplanManagement/warningManagement",
                      name: "warninglindex",
                      meta: { title: "预警管理" },
                      redirect: '/warningplanManagement/warningManagement',
                      component: warninglindex,
                      children: [{
                          path: '',
                          component: warninggroup,
                      },{
                          path: "addwarning",
                          name: "addwarning",
                          meta: { title: "添加预警" },
                          component:addwarning,
                      }]
                  },
              ]
          },
          {
              path: "/maillistManagement",
              name: "maillistManagement",
              meta: { title: "通讯录管理" },
              component: maillistManagement,
              children: [
                  {
                      path: "/maillistManagement/maillist",
                      name: "maillist",
                      meta: { title: "通讯录分组" },
                      redirect: '/maillistManagement/maillist',
                      component: maillistindex,
                      children: [{
                          path: '',
                          component: maillistgroup,
                      },{
                          path: "addmaillist",
                          name: "addmaillist",
                          meta: { title: "添加人员" },
                          component:addmaillist,
                      },{
                          path: "addmaillistpop",
                          name: "addmaillistpop",
                          meta: { title: "添加人员" },
                          component:addmaillistpop,
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