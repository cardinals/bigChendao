<template>
    <div class="layer">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">分组名称：
            <el-input v-model="findkeyword" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" @click="keyword" type="primary">查询</el-button>
            <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加分组</el-button>
        </div>

        <div style="box-sizing: border-box;padding: 0 0 0 20px;">

            <el-table
                    ref="multipleTable"
                    border
                    stripe
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
                <el-table-column label="区域分组" prop="groupName" show-overflow-tooltip >

                </el-table-column>

                <el-table-column label="添加时间" prop="gmtCreate" show-overflow-tooltip>

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
                <el-button type="warning" :disabled="disabledDelete" @click="toggleSelection()">批量删除</el-button>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[10, 20, 40, 80]"
                            :page-size="10"
                            style="float: right"
                            layout="total, sizes, prev, pager, next, jumper"

                            :total="totals">
                    </el-pagination>
            </div>
        </div>

    </div>

</template>

<script>
    import { areagroupList,areagroupDelete,addressbookDeletebatch } from "@/api/areaManagement/area.js";

    export default {
    data() {
        return {
            input:"",
            findkeyword:'',
            totals:0,//总的
            page:1,
            limit:10,
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            disabledDelete:true,

        }
    },
    created() {
        this.areagroupList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.areagroupList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.areagroupList()
        },
        addgroup () {
            this.$router.push({
                path: "/areaManagement/areagroupManagement/addgroup",
                query:{
                    type:1
                }
            })
        },
        keyword () {
            this.areagroupList()
        },
        //批量删除
        toggleSelection() {
            let ids = []
            this.multipleSelection.map(item => {
                ids.push(item.groupId)
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

                addressbookDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.areagroupList()
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

            if(val.length>0) {
                this.disabledDelete = false
            }else {
                this.disabledDelete = true
            }
            this.multipleSelection = val;
        },
        //编辑
        handleClick (row) {
            this.$router.push({
                path: "/areaManagement/areagroupManagement/addgroup",
                query:{
                    groupId:row.groupId
                }
            })
        },
        //删除
        handleClickdeleta (row) {

                this.$confirm(' ', '确认要删除吗?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true,
                    customClass:"massagebox"
                }).then(() => {
                    areagroupDelete(row.groupId).then(res => {
                        if(res.data.code == 200) {
                            this.areagroupList()
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

        areagroupList() {
            let data = {
                organizationId:1,
                keyword:this.findkeyword,
                page:this.page,
                limit:this.limit
            }
            areagroupList(data).then(res => {

                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
                    this.totals = data.total
                }
            })
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
