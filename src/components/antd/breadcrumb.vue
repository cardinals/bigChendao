<template>
    <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in list" :key="index">{{ item }}</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from "ant-design-vue";
export default {
    name: "newBreadcrumb",
    components: { ABreadcrumb: Breadcrumb, ABreadcrumbItem: Breadcrumb.Item },
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
};
</script>

<style>
    .ant-breadcrumb{
        font-size: 12px;
        height: 15px;
        line-height: 15px;
    }
</style>
