<template>
    <a-modal v-bind="$props" class="modal" :footer="null" :width="width" @cancel="cancel">
        <slot></slot>
    </a-modal>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
    name: "newModal",
    components: { AModal: Modal },
    props: {
        ...Modal.props,
        width: {
            type: String || Number,
            default: "40rem"
        }
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        }
    }
};
</script>

<style>
.modal {
    top: 60px;
}

.ant-modal-header {
    border: none;
    padding: 10px 20px;
}
.ant-modal-title {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
}
.ant-modal-close-x {
    width: 42px;
    height: 42px;
    line-height: 42px;
}
.ant-modal-body {
    padding: 10px 20px;
    font-size: 12px;
}
</style>
