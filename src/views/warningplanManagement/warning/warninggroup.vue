<template>
    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;overflow: hidden">
            <el-button size="medium" @click="addactiveName" style="float: right" type="warning">添加预警</el-button>
        </div>

        <div style="box-sizing: border-box;padding: 0 0 0 20px;">

            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        type="index"
                        label="序号"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        label="景点名称"
                        prop="scenicName"
                        show-overflow-tooltip>
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="warningValue"
                        label="预警值"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="planName"
                        label="推荐预案"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="添加时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="160">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit-outline" style="color: #E79524"></i>编辑</el-button>
                        <el-button @click="handleClickdeleta(scope.row)" type="text" size="small"><i class="el-icon-delete" style="color: #C30E29"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button type="warning" :disabled="disabledDelete" @click="toggleSelection()">批量删除</el-button>
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
        </div>

    </div>

</template>

<script>
    import { earlywarningList,earlywarningDelete,earlywarningDeletebatch } from "@/api/warningplanManagement/warningplan.js";
export default {
    data() {
        return {
            input:'',
            options:'',
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            page:1,
            limit:10,
            total:0,
            disabledDelete:true
        }
    },
    created () {
        this.earlywarningList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.earlywarningList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.earlywarningList()
        },
        findkeyword () {
            this.earlywarningList()
        },
        //添加
        addactiveName () {
            this.$router.push({
                path: "/warningplanManagement/warningManagement/addwarning",
                query:{
                    type:1
                },
            })
        },
        //选中的
        handleSelectionChange(val) {
            if(val.length>0) {
                this.disabledDelete = false
            }else {
                this.disabledDelete = true
            }
            this.multipleSelection = val;
        },
        //批量删除
        toggleSelection() {
            let ids = []
            this.multipleSelection.map(item => {
                ids.push(item.id)
            })
            let dataids = ids.join(',')
            let data = {
                ids :dataids
            }
            this.$confirm(' ', '确认要删除吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                customClass:"massagebox"
            }).then(() => {
                earlywarningDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.earlywarningList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //删除
        handleClickdeleta (row) {
            this.$confirm(' ', '确认要删除吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                customClass:"massagebox"
            }).then(() => {
                earlywarningDelete(row.id).then(res => {
                    if(res.data.code == 200) {
                        this.earlywarningList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //编辑
        handleClick (row) {
            this.$router.push({
                path: "/warningplanManagement/warningManagement/addwarning",
                query:{
                    id:row.id
                }
            })
        },
        earlywarningList () {
            let data = {
                organizationId:1,
                page:this.page,
                limit:this.limit,
            }
            earlywarningList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
                    this.total = data.total

                }
            })
        },

    }
}
</script>

<style scoped>
.resource {
    box-sizing: border-box;
    padding:0 23px 0 0;
}
.resource .el-tab-pane{
    display: none;
}
</style>
