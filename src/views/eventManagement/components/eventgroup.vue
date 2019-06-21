<template>
    <div class="layer">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">事件名称：
            <el-input v-model="keyword" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" type="primary" @click="findkeyword">查询</el-button>
            <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加事件</el-button>
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
                        label="事件编号"
                        prop="eventCode"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="eventAddr"
                        label="事件发生地点"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="eventName"
                        label="事件名称"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="事件分组"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="事件状态"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.eventState == 0" style="color: #04f3a3">待处理</span>
                        <span v-if="scope.row.eventState == 1" style="color: #9ca5a2">处置中</span>
                        <span v-if="scope.row.eventState == 2" style="color: red">已完结</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="endDescription"
                        label="完美描述"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="发生时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit-outline" style="color: #E79524"></i>查看</el-button>
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
    import { eventmanagementlList, eventmanagementDelete, eventmanagementDeletebatch } from "@/api/eventManagement/event.js";
    export default {
    data() {
        return {
            input:"",
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            dayNum:null, //天数
            keyword:'',
            page:1,
            limit:10,
            total:0,
            disabledDelete:true
        }
    },
    created () {
        this.eventmanagementlList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.eventmanagementlList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.eventmanagementlList()
        },
        findkeyword () {
            this.eventmanagementlList()
        },
        addgroup () {
            this.$router.push({
                path: "/eventManagement/event/addevent",
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
        //编辑
        handleClick (row){
            this.$router.push({
                path: "/eventManagement/event/seeevent",
                query:{
                    id:row.eventId
                }
            })
        },
        //批量删除
        toggleSelection() {
            let ids = []
            this.multipleSelection.map(item => {
                ids.push(item.eventId)
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
                eventmanagementDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.eventmanagementlList()
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
                eventmanagementDelete(row.eventId).then(res => {
                    if(res.data.code == 200) {
                        this.eventmanagementlList()
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
        eventmanagementlList () {
            let data = {
                organizationId:1,
                dayNum:this.dayNum, //驾驶人
                keyword:this.keyword,
                page:this.page,
                limit:this.limit,
            }
            eventmanagementlList(data).then(res => {
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
.layer {
    box-sizing: border-box;
    padding:0 23px 0 0;
}
</style>
