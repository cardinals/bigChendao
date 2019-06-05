<template>
    <a-checkbox v-bind="$props" @change="change">{{ text }}</a-checkbox>
</template>

<script>
import { Checkbox } from "ant-design-vue";
export default {
    name: "newCheckbox",
    components: { ACheckbox: Checkbox },
    props: {
        ...Checkbox.props,
        text: {
            type: String,
            default: ""
        }
    },
    methods: {
        change(e) {
            const checked = e.target.checked;
            this.$emit("change", checked);
        }
    }
};
</script>

<style scoped></style>
