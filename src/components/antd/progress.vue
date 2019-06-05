<template>
    <div>
        <a-progress v-bind="$props" />
    </div>
</template>

<script>
import { Progress } from "ant-design-vue";
export default {
    name: "newProgress",
    components: { AProgress: Progress },
    props: { ...Progress.props }
};
</script>

<style>
.ant-progress-circle .ant-progress-text {
    width: 50px;
    left: calc(50% - 25px);
    padding: unset;
    color: white;
    font-size: 20px;
}
</style>
