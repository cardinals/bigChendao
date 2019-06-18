<template>
    <div class="leftmenus">
        <div style="padding: 50px 0 10px 22px;color: #333333;">
            <span>旅游管控指挥平台</span>
        </div>
        <div>
            <el-menu
                    background-color="#f1f6fc"
                    text-color="#333333"
                    active-text-color="#f1f6fc"
                    :default-active="$route.path"
                    unique-opened
                    mode="vertical"
                    class="el-menu-vertical-demo"

                    router
            >
                <NavMenu :navMenus="menuData"></NavMenu>
            </el-menu>
        </div>

    </div>
</template>

<script>
    import NavMenu from "@/components/menu/index.vue";
    export default {
        name: "newMenu",
        components: {
            NavMenu
        },
        props: {

        },
        data() {
            return {
                isCollapse:true,
                menuData: [
                    {
                        //一级
                        entity: {
                            id: 0,
                            name: "/console",
                            icon: "el-icon-message",
                            alias: "控制台"
                        }
                    },
                    {
                        //一级
                        entity: {
                            id: 1,
                            name: "/mapManagementList",
                            icon: "el-icon-message",
                            alias: "地图管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 3,
                                    name: "/mapManagement/mapManagementLower",
                                    icon: "el-icon-loading",
                                    alias: "底图管理",
                                    value: { path: "/mapManagement/mapManagementLower" }
                                },
                            },
                            {
                                entity: {
                                    id: 4,
                                    name: "/mapManagement/mapManagementLayer",
                                    icon: "el-icon-bell",
                                    alias: "图层管理",
                                    value: "/mapManagement/mapManagementLayer"
                                }
                            },

                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 23,
                            name: "/areaManagement",
                            icon: "el-icon-message",
                            alias: "区域管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 24,
                                    name: "/areaManagement/areagroupManagement",
                                    icon: "el-icon-loading",
                                    alias: "区域分组管理",
                                    value: { path: "/areaManagement/areagroupManagement" }
                                },
                            },


                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 21,
                            name: "/resourceEquipmentManagement",
                            icon: "el-icon-message",
                            alias: "资源设备管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 22,
                                    name: "/resourceEquipmentManagement/resourceManagement",
                                    icon: "el-icon-loading",
                                    alias: "设备管理",
                                    value: { path: "/resourceEquipmentManagement/resourceManagement" }
                                },
                            },
                            {
                                entity: {
                                    id: 25,
                                    name: "/resourceEquipmentManagement/equipmentManagement",
                                    icon: "el-icon-loading",
                                    alias: "资源管理",
                                    value: { path: "/resourceEquipmentManagement/equipmentManagement" }
                                },
                            },

                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 26,
                            name: "/alllandscape",
                            icon: "el-icon-message",
                            alias: "全景管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 27,
                                    name: "/alllandscape/alllandscapeManagement",
                                    icon: "el-icon-loading",
                                    alias: "全景",
                                    value: { path: "/alllandscape/alllandscapeManagement" }
                                },
                            },


                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 28,
                            name: "/locationManagement",
                            icon: "el-icon-message",
                            alias: "定位管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 29,
                                    name: "/locationManagement/personnelManagement",
                                    icon: "el-icon-loading",
                                    alias: "人员管理",
                                    value: { path: "/locationManagement/personnelManagement" }
                                },
                            },
                            {
                                entity: {
                                    id: 30,
                                    name: "/locationManagement/carManagement",
                                    icon: "el-icon-loading",
                                    alias: "车辆管理",
                                    value: { path: "/locationManagement/carManagement" }
                                },
                            },

                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 50,
                            name: "/warningplanManagement",
                            icon: "el-icon-message",
                            alias: "预警预案管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 51,
                                    name: "/warningplanManagement/planManagement",
                                    icon: "el-icon-loading",
                                    alias: "预案管理",
                                    value: { path: "/warningplanManagement/planManagement" }
                                },
                            },
                            {
                                entity: {
                                    id: 52,
                                    name: "/warningplanManagement/warningManagement",
                                    icon: "el-icon-loading",
                                    alias: "预警管理",
                                    value: { path: "/warningplanManagement/warningManagement" }
                                },
                            },

                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 53,
                            name: "/maillistManagement",
                            icon: "el-icon-message",
                            alias: "通讯录管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 54,
                                    name: "/maillistManagement/maillist",
                                    icon: "el-icon-loading",
                                    alias: "通讯录分组",
                                    value: { path: "/maillistManagement/maillist" }
                                },
                            },


                        ]
                    },
                    {
                        //一级
                        entity: {
                            id: 55,
                            name: "/eventManagement",
                            icon: "el-icon-message",
                            alias: "事件管理"
                        },
                        //二级
                        childs: [
                            {
                                entity: {
                                    id: 56,
                                    name: "/eventManagement/event",
                                    icon: "el-icon-loading",
                                    alias: "事件列表管理",
                                    value: { path: "/eventManagement/event" }
                                },
                            },
                            {
                                entity: {
                                    id: 57,
                                    name: "/eventManagement/statisticalAnalysis",
                                    icon: "el-icon-loading",
                                    alias: "事件统计分析",
                                    value: { path: "/eventManagement/statisticalAnalysis" }
                                },
                            },

                        ]
                    },

                ],



            };
        },
        methods: {

        }
    };
</script>

<style>
    .el-menu-vertical-demo {
        width: 200px;
    }
    .el-menu-vertical-demo .el-submenu__title i {
        /*color: #ffffff;*/
    }

    .el-menu-vertical-demo .el-menu-item.is-active {
        background-color: #b6d9f7 !important;
        color: #333333 !important;
    }
    .el-menu-vertical-demo li:hover,.el-menu-vertical-demo .el-submenu__title:hover {
        background-color: #b6d9f7 !important;
        color: #333333 !important;
    }
    .el-menu-vertical-demo .el-submenu__title{
        border-right: none !important;
    }
    .leftmenus .el-menu{
        border-right: none;
    }
    .menu {
        overflow-y: initial;
    }
</style>
