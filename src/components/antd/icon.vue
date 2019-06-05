<template>
    <a-icon v-bind="$props" />
</template>

<script>
import { Icon } from "ant-design-vue";
export default {
    name: "newIcon",
    components: { AIcon: Icon },
    props: { ...Icon.props }
};
</script>

<style scoped></style>
