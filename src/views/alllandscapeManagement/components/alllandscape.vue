<template>
    <div class="layer">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">景点名称：
            <el-input v-model="keyword" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" @click="findkeyword" style="margin-left: 10px" type="primary">查询</el-button>
            <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加360全景</el-button>
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
                <!--<el-table-column-->
                        <!--label="全景编号ID"-->

                        <!--prop="date"-->
                        <!--show-overflow-tooltip-->
                <!--&gt;-->
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="全景名称"

                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="baseinfoId"
                        label="关联景点"
                        show-overflow-tooltip
                >
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
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="100"
                            style="float: right"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="40">
                    </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>
    import { panoramicList, panoramicDelete,panoramicDeletebatch } from "@/api/alllandscapeManagement/alllandscape.js";

export default {
    data() {
        return {
            input:"",
            keyword:'', //关键字查找
            tableData: [],
            multipleSelection: [],
            currentPage4: 1

        }
    },
    created () {
        this.panoramicList()
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
                path: "/alllandscape/alllandscapeManagement/addalllandscape",
                query:{
                    type:1
                }
            })
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

                panoramicDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.panoramicList()
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
        //选中的
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //编辑
        handleClick (row) {
            this.$router.push({
                path: "/alllandscape/alllandscapeManagement/addalllandscape",
                query:{
                    id:row.id
                }
            })
        },
        //查询
        findkeyword () {
            this.panoramicList()
        },
        //删除
        handleClickdeleta (row) {
                this.$confirm(' ', '确认要删除吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    customClass:"massagebox"
                }).then(() => {
                    panoramicDelete(row.id).then(res => {
                        if(res.data.code == 200) {
                            this.panoramicList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else {

                        }

                    }).catch(error => {

                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

        },
        panoramicList () {
            let data = {
                organizationId:1,
                keyword:this.keyword?this.keyword:'',
                page:1,
                limit:10
            }
            panoramicList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
                }

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
    .massagebox {
        background: red;
    }
</style>
