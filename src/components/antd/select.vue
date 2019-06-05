<template>
    <div>
        <a-select defaultValue="lucy" size="small">
            <a-select-option value="jack">基站数据</a-select-option>
            <a-select-option value="lucy">个推数据</a-select-option>
        </a-select>
    </div>
</template>

<script>
import { Select } from "ant-design-vue";
export default {
    name: "newSelect",
    components: { ASelect: Select, ASelectOption: Select.Option }
};
</script>

<style>
/*.ant-select {*/
    /*font-size: 12px;*/
    /*width: 120px;*/
/*}*/
</style>
