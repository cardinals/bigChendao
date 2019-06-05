<template>
    <div>
        <a-input-search v-bind="$props" :style="styles" />
    </div>
</template>

<script>
import { Input } from "ant-design-vue";
export default {
    name: "newInputSearch",
    components: { AInputSearch: Input.Search },
    props: {
        ...Input.Search.props, //继承Input组件的props
        styles: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        change(e) {
            this.$emit("change", e.target.value);
        }
    }
};
</script>

<style scoped></style>
