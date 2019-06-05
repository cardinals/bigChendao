<template>
    <a-table v-bind="$props">

    </a-table>
</template>

<script>
import { Table } from "ant-design-vue";
export default {
    name: "newTable",
    components: { ATable: Table },
    props: { ...Table.props },
    mounted() {
        console.log(this);
    }
};
</script>

<style>
.ant-table,
.ant-pagination {
    font-size: 12px;
}
.ant-table {
    background-color: white;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
    padding: 10px 16px;
}
</style>
