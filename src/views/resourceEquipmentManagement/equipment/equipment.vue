<template>

    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px">
                <el-tab-pane label="景点" name="景点">景点</el-tab-pane>
                <el-tab-pane label="游客中心" name="游客中心">游客中心</el-tab-pane>
                <el-tab-pane label="停车场" name="停车场">停车场</el-tab-pane>
                <el-tab-pane label="卫生间" name="卫生间">卫生间</el-tab-pane>
                <el-tab-pane label="商店" name="商店">商店</el-tab-pane>
                <el-tab-pane label="售票点" name="售票点">售票点</el-tab-pane>
                <el-tab-pane label="应急物资" name="应急物资">应急物资</el-tab-pane>
                <el-tab-pane label="住宿" name="住宿">住宿</el-tab-pane>
                <el-tab-pane label="治安点" name="治安点">治安点</el-tab-pane>
            </el-tabs>

            景点名称：
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
                        label="景点名称"
                        width="170"
                        prop="date"
                >
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="区域分组"
                        width="120">
                </el-table-column>

                <el-table-column
                        prop="date"
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
export default {
    data() {
        return {
            input:"",
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: [],
            currentPage4: 1,
            activeName:'景点'

        }
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
                path: "/resourceEquipmentManagement/equipmentManagement/addequipment",
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
                path: "/resourceEquipmentManagement/equipmentManagement/addequipment",
                query:{
                    name:this.activeName
                },

            })
        },
        //
        handleClicktab(tab, event) {
                // console.log(tab, event);
                // console.log(this.activeName)

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
