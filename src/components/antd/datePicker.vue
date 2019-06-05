<template>
    <div>
        <a-date-picker v-if="type === 'datePicker'" size="small" />
        <a-range-picker v-if="type === 'rangePicker'" size="small" />
        <a-range-picker
            v-if="type === 'monthRangePicker'"
            :placeholder="['开始月份', '结束月份']"
            format="YYYY-MM"
            size="small"
            :value="monthValue"
            :mode="monthMode"
            @panelChange="handlePanelChange2"
        />
    </div>
</template>

<script>
import { DatePicker } from "ant-design-vue";
export default {
    name: "newDatePicker",
    components: { ADatePicker: DatePicker, ARangePicker: DatePicker.RangePicker },
    props: {
        ...DatePicker.props,
        type: {
            type: String,
            default: "datePicker"
        }
    },
    data() {
        return {
            monthMode: ["month", "month"],
            monthValue: []
        };
    },
    methods: {
        handlePanelChange2(value, mode) {
            this.monthValue = value;
            this.monthMode = [mode[0] === "date" ? "month" : mode[0], mode[1] === "date" ? "month" : mode[1]];
        }
    }
};
</script>

<style>
.ant-input,
.ant-calendar {
    font-size: 12px;
}
</style>
