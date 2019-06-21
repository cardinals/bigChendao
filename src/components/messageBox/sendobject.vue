<template>
        <el-dialog title="查看发送对像" center class="seedobject" :visible.sync="dialogTableVisible" width="40%">
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="index"
                        label="序号"
                        width="65"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系方式"
                        show-overflow-tooltip
                       >
                </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
                <el-button type="warning" @click="toggleSelection()">关闭</el-button>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 40, 80]"
                        :page-size="10"
                        style="float: right"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-dialog>
</template>

<script>
    import { addressbookList, } from "@/api/eventManagement/event.js";

export default {
    data() {
        return {
            dialogTableVisible:false,
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            page:1,
            limit:10,
            total:0,
        }
    },
    created() {

    },
    methods: {
        show (data) {
            this.dialogTableVisible = true
            this.addressbookList(data)
        },
        handleSizeChange(val) {
            this.limit = val
            this.addressbookList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.addressbookList()
        },
        handleSelectionChange() {

        },
        toggleSelection() {
            this.dialogTableVisible = false
        },
        addressbookList (sendPeopleId) {
            let data = {
                organizationId : 1,
                sendPeopleId:sendPeopleId,
                page:this.page,
                limit:this.limit,
            }
            addressbookList(data).then(res => {
                if(res.data.code == 200) {
                    this.tableData = res.data.data.records
                    this.total = res.data.data.total
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
