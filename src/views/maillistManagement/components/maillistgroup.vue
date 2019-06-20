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
                    <el-input v-model="deptname" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
                    <el-button size="medium" style="margin-left: 10px" type="primary" @click="findlist">查询</el-button>
                    <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加分组</el-button>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" v-else>
                <el-col :span="24">
                    姓名：
                    <el-input v-model="name" style="width: 300px" size="medium" placeholder="请输入姓名进行搜索"></el-input>
                    联系方式：
                    <el-input v-model="phone" style="width: 300px" size="medium" placeholder="请输入联系方式进行搜索"></el-input>
                    <el-button size="medium" style="margin-left: 10px" type="primary" @click="findlist">查询</el-button>
                    <el-button size="medium" @click="addgroup" style="float: right" type="warning">添加人员</el-button>
                </el-col>
            </el-row>

        </div>

        <div v-if="activeName == '通讯录'" style="box-sizing: border-box;padding: 0 0 0 20px;">
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  type="index" label="序号" width="55" ></el-table-column>
                <el-table-column label="人员姓名" prop="name"  width="85"  >
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column prop="phone" label="联系方式"  show-overflow-tooltip> </el-table-column>
                <el-table-column prop="deptName" label="部门分组" show-overflow-tooltip></el-table-column>
                <el-table-column  prop="areaName" label="区域分组" show-overflow-tooltip></el-table-column>
                <el-table-column prop="gmtCreate" label="添加时间" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope" v-if="activeName == '通讯录'">
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
                        :page-sizes="[10, 20, 40, 60]"
                        :page-size="10"
                        style="float: right"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

        <div v-else style="box-sizing: border-box;padding: 0 0 0 20px;">
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableDatadept"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  type="index" label="序号" width="55" ></el-table-column>
                <el-table-column prop="groupName" label="分组名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="count" label="人员数量"  show-overflow-tooltip> </el-table-column>
                <el-table-column prop="gmtCreate" label="添加时间" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right"  label="操作" width="120">
                    <template slot-scope="scope" v-if="activeName !== '通讯录'">
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
    import { addressbookList, addressbookDelete, addressbookDeletebatch, deptgroupList,deptgroupDelete,deptgroupDeletebatch } from "@/api/maillistManagement/mail.js"

    export default {
    data() {
        return {
            name:'',
            phone:'',
            deptname:'',
            activeName:'通讯录',
            tableData: [],//通讯录
            tableDatadept:[],//部门分组
            multipleSelection: [],
            currentPage4: 1,
            disabledDelete:true,
            page:1,
            limit:10,
            total:0,
        }
    },
    created () {

        this.addressbookList()
        // this.deptgroupList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            if(this.activeName == "通讯录") {
                this.addressbookList()
            }else {
                this.deptgroupList()
            }
        },
        handleCurrentChange(val) {
            this.page = val

            if(this.activeName == "通讯录") {
                this.addressbookList()
            }else {
                this.deptgroupList()
            }

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
            if (this.activeName == "通讯录") {
                this.addressbookList()
            }else {
                this.deptgroupList()
            }
        },
        //通讯录查找and部门查看
        findlist () {
            if (this.activeName == '通讯录') {
                this.addressbookList()
            }else {
                this.deptgroupList()
            }

        },
        //批量删除
        toggleSelection() {
            let ids = []
            this.multipleSelection.map(item => {
                if(this.activeName == '通讯录') {
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
                if(this.activeName == '通讯录') {
                    addressbookDeletebatch(data).then(res => {
                        if(res.data.code == 200) {
                            this.addressbookList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }else {
                    deptgroupDeletebatch(data).then(res => {
                        if(res.data.code == 200) {
                            this.deptgroupList()
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
            if(this.activeName == '通讯录') {
                this.$router.push({
                    path:"/maillistManagement/maillist/addmaillistpop",
                    query:{
                        name:this.activeName,
                        id:row.id
                    }
                })
            }else {
                this.$router.push({
                    path:"/maillistManagement/maillist/addmaillist",
                    query:{
                        name:this.activeName,
                        groupId:row.groupId
                    }
                })
            }

        },
        //删除
        handleClickdeleta (row) {
            this.$confirm(' ', '确认要删除吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                customClass:"massagebox"
            }).then(() => {
                if (this.activeName == '通讯录') {
                    addressbookDelete(row.id).then(res => {
                        if(res.data.code == 200) {
                            this.addressbookList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }else {
                    deptgroupDelete(row.groupId).then(res => {
                        if(res.data.code == 200) {
                            this.deptgroupList()
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
        //部门的编辑
        handleClickdept (row) {

        },
        //部门的删除
        handleClickdeletadept (row) {

        },
        //通讯录list
        addressbookList () {
            let data = {
                organizationId:1,
                areaId:'',
                deptId:'',
                name:this.name,
                phone:this.phone,
                page:this.page,
                limit:this.limit
            }
            addressbookList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
                    this.total = data.total
                }

            });
        },
        //部门分组lsit
        deptgroupList () {
            let data = {
                organizationId:1,
                keyword:this.deptname,
                page:this.page,
                limit:this.limit
            }
            deptgroupList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableDatadept = data.records
                    this.total = data.total
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
.el-tab-pane{
    display: none;
}
</style>
