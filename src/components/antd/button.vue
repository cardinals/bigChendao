<template>
    <div>
        <a-button v-bind="$props" :style="styles" @click="click">{{ text }}</a-button>
    </div>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
    name: "newButton",
    components: { AButton: Button },
    props: {
        ...Button.props,
        text: { type: String, default: "按钮" },
        styles: {
            type: Object,
            default: () => {}
        }
    },
    methods:{
        click(){
            this.$emit("click")
        }
    }
};
</script>

<style>
.ant-btn-sm {
    font-size: 1.2rem;
}
.ant-btn {
    min-width: 6rem;
    font-size: 1.2rem;
}
</style>
