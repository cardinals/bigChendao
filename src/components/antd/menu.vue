<template>
    <div>
        <a-menu mode="inline" theme="dark" :inlineCollapsed="collapsed" @select="select">
            <template v-for="item in list">
                <a-menu-item v-if="!item.children" :key="item.key">
                    <a-icon v-if="item.icon" :type="item.icon" />
                    <span>{{ item.title }}</span>
                </a-menu-item>
                <sub-menu v-else :menu-info="item" :key="item.key" />
            </template>
        </a-menu>
    </div>
</template>

<script>
import subMenu from "./subMenu";
import { Menu, Icon } from "ant-design-vue";
export default {
    name: "newMenu",
    components: {
        AMenu: Menu,
        ASubMenu: Menu.SubMenu,
        AMenuItemGroup: Menu.ItemGroup,
        AMenuItem: Menu.Item,
        AIcon: Icon,
        subMenu: subMenu
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
            collapsed: false
        };
    },
    methods: {
        select({ item, key, selectedKeys }) {
            const self = this;
            if (key) {
                self.$router.push({ path: `/${key}` });
            }
        }
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
</style>
