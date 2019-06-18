<template>
    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px">
                <el-tab-pane label="监控" name="监控">监控</el-tab-pane>
                <el-tab-pane label="传感器" name="传感器">传感器</el-tab-pane>
                <el-tab-pane label="报警柱" name="报警柱">报警柱</el-tab-pane>
                <el-tab-pane label="路灯" name="路灯">路灯</el-tab-pane>
                <el-tab-pane label="wifi" name="wifi">wifi</el-tab-pane>
                <el-tab-pane label="广播" name="广播">广播</el-tab-pane>
            </el-tabs>

            分组名称：
            <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" type="primary">查询</el-button>
            <el-button size="medium" @click="addactiveName" style="float: right" type="warning">添加{{activeName}}</el-button>
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
                        prop="name"
                        label="设备名称"
                        width="120"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="所属分组"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="状态"
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
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit-outline" style="color: #E79524"></i>编辑</el-button>
                        <el-button @click="handleClickdeleta(scope.row)" type="text" size="small"><i class="el-icon-delete" style="color: #C30E29"></i>删除</el-button>
                    </template>
                </el-table-column/>
            </el-table>
            <div style="margin-top: 20px">
                <el-button type="warning" @click="toggleSelection()">批量删除</el-button>
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
        </div>

    </div>

</template>

<script>
    import { baseinfoList } from "@/api/resourceEquipmentManagement/resourceEquipment.js";

    export default {
    data() {
        return {
            input:"",
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            activeName:'监控'

        }
    },
    created () {
        this.baseinfoList()
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addactiveName () {
            this.$router.push({
                path: "/resourceEquipmentManagement/resourceManagement/addresource",
                query:{
                    name:this.activeName,
                    type:1
                },

            })

        },
        //批量删除
        toggleSelection() {

        },
        //选中的
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //编辑
        handleClick () {
            this.$router.push({
                path: "/resourceEquipmentManagement/resourceManagement/addresource",
                query:{
                    name:this.activeName,
                },

            })
        },
        //
        handleClicktab(tab, event) {
                // console.log(tab, event);
                console.log(this.activeName)
        },
        //删除
        handleClickdeleta () {

                this.$confirm(' ', '确认要删除吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    customClass:"massagebox"
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

        },
        baseinfoList () {
            let data = {
                organizationId:1,
                moduleType:1,
                layerTypeId:6,
                groupId:'',
                keyword:'',
                page:1,
                limit:10,
            }
            baseinfoList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records

                }
            })

        }
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
