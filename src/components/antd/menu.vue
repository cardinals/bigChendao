<template>
    <div class="leftmenus">
        <div style="padding: 50px 0 10px 22px;color: #333333;">
            <span>旅游管控指挥平台</span>
        </div>
        <!--<a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed" @select="select" style="background:#2D8BF6">-->
            <!--<template v-for="item in list">-->
                <!--<a-menu-item v-if="!item.children" :key="item.key">-->
                    <!--<a-icon v-if="item.icon" :type="item.icon" />-->
                    <!--<span>{{ item.title }}</span>-->
                <!--</a-menu-item>-->
                <!--<sub-menu v-else :menu-info="item" :key="item.key" />-->
            <!--</template>-->
        <!--</a-menu>-->
        <div>

            <el-menu
                    background-color="#f1f6fc"
                    text-color="#333333"
                    active-text-color="#f1f6fc"
                    :default-active="$route.path"
                    unique-opened
                    mode="vertical"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >
                <NavMenu :navMenus="menuData"></NavMenu>
            </el-menu>

        </div>

    </div>
</template>

<script>
import subMenu from "./subMenu";
import { Menu, Icon } from "ant-design-vue";

import NavMenu from "./../menu/index.vue";
export default {
    name: "newMenu",

    components: {
        AMenu: Menu,
        ASubMenu: Menu.SubMenu,
        AMenuItemGroup: Menu.ItemGroup,
        AMenuItem: Menu.Item,
        AIcon: Icon,
        subMenu: subMenu,
        NavMenu
    },
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        },
        selectedKeys: {
            type: Array,
            default: function() {
                return [];
            }
        }
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
                        id: 6,
                        name: "userManage",
                        icon: "el-icon-news",
                        alias: "三级菜单"
                    },
                    //二级
                    childs: [
                        {
                            entity: {
                                id: 7,
                                name: "accountManage",
                                icon: "el-icon-phone-outline\r\n",
                                alias: "帐号管理",
                                value: ""
                            },
                            //三级
                            childs: [
                                {
                                    entity: {
                                        id: 14,
                                        name: "emailManage",
                                        icon: "el-icon-sold-out\r\n",
                                        alias: "邮箱管理",
                                        value: "/content/email"
                                    }
                                },
                                {
                                    entity: {
                                        id: 13,
                                        name: "passManage",
                                        icon: "el-icon-service\r\n",
                                        alias: "密码管理",
                                        value: "/content/pass"
                                    }
                                }
                            ]
                        },
                        {
                            entity: {
                                id: 8,
                                name: "integralManage",
                                icon: "el-icon-picture",
                                alias: "积分管理",

                                value: "/user/integral"
                            }
                        }
                    ]
                },
                {
                    //一级
                    entity: {
                        id: 40,

                        name: "contentManage",
                        icon: "el-icon-rank",
                        alias: "四级菜单"
                    },
                    //er级
                    childs: [
                        {
                            entity: {
                                id: 41,
                                name: "classifyManage2",
                                icon: "el-icon-printer",
                                alias: "分类管理"
                            },
                            //三级
                            childs: [
                                {
                                    entity: {
                                        id: 42,
                                        name: "classifyManage3",
                                        icon: "el-icon-printer",
                                        alias: "分类管理"
                                    },
                                    //四级
                                    childs: [
                                        {
                                            entity: {
                                                id: 43,
                                                name: "classifyManage4",
                                                icon: "el-icon-printer",
                                                alias: "分类管理",
                                                value: "/content/classify"
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],



        };
    },
    methods: {
        select({ item, key, selectedKeys }) {
            const self = this;
            if (key) {
                self.$router.push({ path: `/${key}` });
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    }
};
</script>

<style>
.ant-menu {
    font-size: 12px;
}
.ant-menu-inline .ant-menu-item,
.ant-menu-inline .ant-menu-submenu-title {
    font-size: 12px;
}
.ant-layout-sider {
    background: #f1f6fc;
    box-shadow:none;
    height: calc(100% - 64px);
    margin-top: 64px;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background:#ffffff;
    box-shadow:none;

}
.ant-layout-sider-children {
    /*border-right: 1px solid #dbdee4;*/
}
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
