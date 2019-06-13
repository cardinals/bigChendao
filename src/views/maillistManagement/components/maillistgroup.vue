<template>
    <div class="layer">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px">
                <el-tab-pane label="通讯录" name="通讯录">通讯录</el-tab-pane>
                <el-tab-pane label="部门分组" name="部门分组">部门分组</el-tab-pane>
            </el-tabs>

            <el-row type="flex" class="row-bg" v-if="activeName == '部门分组' ">
                <el-col :span="24">
                    分组名称：
                    <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
                    <el-button size="medium" style="margin-left: 10px" type="primary">查询</el-button>
                    <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加分组</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" v-else>
                <el-col :span="24">
                    姓名：
                    <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入姓名进行搜索"></el-input>
                    联系方式：
                    <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入联系方式进行搜索"></el-input>
                    <el-button size="medium" style="margin-left: 10px" type="primary">查询</el-button>
                    <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加人员</el-button>
                </el-col>
            </el-row>

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
                        label="全景编号ID"
                        width="120"
                        prop="date"
                >
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="全景名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="关联景点"
                        width="120"
                        >
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
            activeName:'通讯录',
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

        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        addgroup () {

            this.$router.push({
                path:this.activeName == '通讯录'? "/maillistManagement/maillist/addmaillistpop" : "/maillistManagement/maillist/addmaillist",
                query:{
                    name:this.activeName,
                    type:1
                }
            })
        },
        handleClicktab () {

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
                path:this.activeName == '通讯录'? "/maillistManagement/maillist/addmaillistpop" : "/maillistManagement/maillist/addmaillist",
                query:{
                    name:this.activeName,
                }
            })
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
.layer {
    box-sizing: border-box;
    padding:0 23px 0 0;
}
.el-tab-pane{
    display: none;
}
</style>
