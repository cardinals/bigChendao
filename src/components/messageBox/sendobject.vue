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
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系方式"

                       >
                </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
                <el-button type="warning" @click="toggleSelection()">关闭</el-button>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        style="float: right"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </el-dialog>
</template>

<script>
export default {

    data() {
        return {
            dialogTableVisible:false,
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                phone: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: [],
            currentPage4: 1
        }
    },
    created() {

    },
    methods: {
        show (data) {
            console.log(data)
            this.dialogTableVisible = true
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSelectionChange() {

        },
        toggleSelection() {
            this.dialogTableVisible = false
        }
    }
}
</script>

<style scoped>

</style>
