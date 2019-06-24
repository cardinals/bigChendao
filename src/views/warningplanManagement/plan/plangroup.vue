<template>
    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px">
                <el-tab-pane label="预案" name="预案">预案</el-tab-pane>
                <el-tab-pane label="事件分组" name="事件分组">事件分组</el-tab-pane>
            </el-tabs>

            {{activeName}}名称：
            <el-input v-model="keyword" style="width: 300px;margin-right: 10px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
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
                <template v-if="activeName == '预案' ">
                    <el-table-column
                            label="预案名称"
                            prop="planName"
                            show-overflow-tooltip>
                        <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="groupName"
                            label="事件分组"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            show-overflow-tooltip>
                    </el-table-column>
                </template>
                <template v-if="activeName == '事件分组' ">
                    <el-table-column
                            prop="groupName"
                            label="事件分组名称"
                            show-overflow-tooltip>
                        <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="预案数量"
                            show-overflow-tooltip>
                    </el-table-column>
                </template>


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
    import { emergencyplanList,emergencyplanDelete,emergencyplanDeletebatch,eventgroupList, eventgroupDeletebatch, eventgroupDelete} from "@/api/warningplanManagement/warningplan.js";

    export default {
        data() {
            return {
                input:'',
                options:'',
                tableData: [],
                activeName:'预案',
                multipleSelection: [],
                currentPage4: 1,
                groupId:'',
                keyword:'',
                page:1,
                limit:10,
                total:0,
                disabledDelete:true
            }
        },
        created () {
            this.emergencyplanList()
            // this.eventgroupList()
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val
                this.emergencyplanList()
            },
            handleCurrentChange(val) {
                this.page = val
                this.emergencyplanList()
            },
            findkeyword () {
                this.emergencyplanList()
            },
            handleClicktab() {
                if(this.activeName == '预案') {
                    this.emergencyplanList()
                }else {
                    this.eventgroupList()
                }

            },
            //添加
            addactiveName () {
                this.$router.push({
                    path: this.activeName == '预案'?"/warningplanManagement/planManagement/addplan":"/warningplanManagement/planManagement/addeventlist",
                    query:{
                        type:1
                    },
                })
            },
            //编辑
            handleClick (row) {
                this.$router.push({
                    path: this.activeName == '预案'?"/warningplanManagement/planManagement/addplan":"/warningplanManagement/planManagement/addeventlist",
                    query:{
                        id:this.activeName == '预案'?row.id:row.groupId
                    }
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
                    if(this.activeName == '预案') {
                        ids.push(item.id)
                    }else {
                        ids.push(item.groupId)
                    }

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
                    if(this.activeName == '预案') {
                        emergencyplanDeletebatch(data).then(res => {
                            if(res.data.code == 200) {
                                this.emergencyplanList()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        })
                    }else {
                        eventgroupDeletebatch(data).then(res => {
                            if(res.data.code == 200) {
                                this.eventgroupList()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        })
                    }
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
                    if(this.activeName == '预案') {
                        emergencyplanDelete(row.id).then(res => {
                            if(res.data.code == 200) {
                                this.emergencyplanList()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        })
                    }else {
                        eventgroupDelete(row.groupId).then(res => {
                            if(res.data.code == 200) {
                                this.eventgroupList()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        })
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //预案的list
            emergencyplanList () {
                let data = {
                    organizationId:1,
                    groupId:this.groupId,
                    keyword:this.keyword,
                    page:this.page,
                    limit:this.limit,
                }
                emergencyplanList(data).then(res => {
                    if(res.data.code == 200) {
                        let data = res.data.data
                        this.tableData = data.records
                        this.total = data.total
                    }
                })
            },
            //预案事件分组的list
            eventgroupList () {
                let data = {
                    organizationId:1,
                    keyword:this.keyword,
                    page:this.page,
                    limit:this.limit,
                }
                eventgroupList(data).then(res => {
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
