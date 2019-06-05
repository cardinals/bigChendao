<template>
    <a-tree :treeData="treeData" @select="select"/>
</template>

<script>
import { Tree } from "ant-design-vue";
export default {
    name: "tree",
    components: { ATree: Tree },
    props: {
        treeData: { type: Array, default: () => [] }
    },
    data() {
        return {};
    },
    methods: {
        select(selectedKeys,e) {
            const self = this;
            if (e.node.value) {
                self.$router.push({ path: `/${e.node.value}` });
            }
        }
    }
};
</script>

<style>
    .ant-tree{
        font-size: 12px;
    }
</style>
