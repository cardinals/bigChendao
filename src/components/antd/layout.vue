<template>
    <a-layout class="layout">
        <a-layout-sider
            class="layoutSider"
            :class="collapsed ? 'layoutSider2' : 'layoutSider1'"
            :trigger="null"
            collapsible
            v-model="collapsed"
        >
            <div class="menu">
                <slot name="menu"></slot>
            </div>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layoutHeader">
                <div class="headLeft">
                    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
                </div>
                <div class="headCenter">
                    <slot name="headCenter"></slot>
                </div>
                <div class="headRight">
                    <slot name="headRight"></slot>
                </div>
                <!--<div class="layoutHeaderContent">-->
                <!--<slot name="header"></slot>-->
                <!--</div>-->
            </a-layout-header>
            <a-layout-content class="layoutContent">
                <slot name="content"></slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import { Layout, Icon } from "ant-design-vue";
export default {
    name: "newLayout",
    components: {
        AIcon: Icon,
        ALayout: Layout,
        ALayoutHeader: Layout.Header,
        ALayoutSider: Layout.Sider,
        ALayoutContent: Layout.Content
    },
    data() {
        return {
            collapsed: false
        };
    }
};
</script>

<style>
.logo {
    height: 64px;
    background: rgba(255, 255, 255, 0.2);
}
.menu {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.layout {
    width: 100%;
    height: 100%;
}
.layoutSider {
    box-shadow: 0 0 10px #3f4043;
}
.layoutSider1 {
    height: 100%;
    width: 200px !important;
    max-width: 200px !important;
    min-width: 200px !important;
    flex: 0 0 200px !important;
}
.layoutSider2 {
    height: 100%;
    width: 80px !important;
    max-width: 80px !important;
    min-width: 80px !important;
    flex: 0 0 80px !important;
}
.layoutHeader {
    width: 100%;
    height: 64px;
    display: flex;
    line-height: 64px;
    background-color: #fff;
    padding: 0;
    justify-content: space-between;
}
.headLeft {
    width: 30%;
    text-align: left;
    height: 100%;
    line-height: 64px;
}
.headCenter {
    width: 40%;
    text-align: center;
    line-height: 64px;
}
.headRight {
    width: 30%;
    text-align: right;
    line-height: 64px;
}
.trigger {
    font-size: 24px;
    cursor: pointer;
    padding: 20px;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}
.layoutHeaderContent {
    width: calc(100% - 64px);
}
.layoutContent {
    width: 100%;
    height: 100%;
}
</style>
