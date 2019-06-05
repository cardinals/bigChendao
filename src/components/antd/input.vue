<template>
    <div>
        <a-input v-bind="$props" :style="styles" @change="change">
            <a-icon v-if="prefixType" slot="prefix" :type="prefixType" />
            <a-icon v-if="suffixType" slot="suffix" :type="suffixType" />
        </a-input>
    </div>
</template>

<script>
import { Input, Icon } from "ant-design-vue";
export default {
    name: "newInput",
    components: { AInput: Input, AIcon: Icon },
    props: {
        ...Input.props, //继承Input组件的props
        max: { type: Number, default: null },
        pattern: { type: RegExp, default: null },
        prefixType: { type: String, default: "" },
        suffixType: { type: String, default: "" },
        styles: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        change(e) {
            const value = e.target.value || "";
            const self = this;
            if (self.max && value.length > self.max) {
                return false;
            }
            if (self.pattern && value && !self.pattern.test(value)) {
                return false;
            }
            self.$emit("change", value);
        }
    }
};
</script>

<style scoped></style>
