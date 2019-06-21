<template>
    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            姓名：
            <el-input v-model="name" style="width: 300px;margin-right: 10px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            联系方式：
            <el-input v-model="phone" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" type="primary" @click="findkeyword">查询</el-button>

            <el-button size="medium" @click="addactiveName" style="float: right" type="warning">添加人员</el-button>
            <el-select v-model="input" placeholder="所有区域分组" size="medium" style="width: 200px;float: right">
                <el-option
                        v-for="item in areaNameoptions"
                        :key="item.groupId"
                        :label="item.groupName"
                        :value="item.groupId">
                </el-option>
            </el-select>
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
                        label="姓名"
                        prop="name"
                        width="85">
                </el-table-column>
                <el-table-column
                        label="联系方式"
                        show-overflow-tooltip
                        prop="phone"
                >
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="role"
                        label="角色"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="区域分组"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="设备状态"
                        show-overflow-tooltip>
                    <template slot-scope="scope" >
                        <span v-if="scope.row.state == 0" style="color: #04f3a3">在线</span>
                        <span v-if="scope.row.state == 1" style="color: #9ca5a2">离线</span>
                        <span v-if="scope.row.state == 2" style="color: red">报警</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="gmtCreate"
                        label="添加时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleClicktrajectory(scope.row)" type="text" size="small"><i class="el-icon-edit-outline" style="color: #E79524"></i>轨迹</el-button>
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
    import { personnelList, personnelDelete, personnelDeletebatch, areagroupGroupalllist } from "@/api/locationManagement/location.js";

    export default {
    data() {
        return {
            name:'',
            phone:'',
            input:'',
            options:'',
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            page:1,
            limit:10,
            total:0,
            areaNameoptions:[],
            disabledDelete:true
        }
    },
    created () {
        this.personnelList()
        this.areagroupGroupalllist()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.personnelList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.personnelList()
        },
        findkeyword () {
            this.personnelList()
        },
        //添加
        addactiveName () {
            this.$router.push({
                path: "/locationManagement/personnelManagement/addpersonnel",
                query:{
                    type:1
                },
            })
        },
        //编辑
        handleClick (row) {
            this.$router.push({
                path: "/locationManagement/personnelManagement/addpersonnel",
                query:{
                    id:row.id
                }
            })
        },
        //轨迹
        handleClicktrajectory () {
            this.$router.push({
                path: "/locationManagement/personnelManagement/personneltrajectory",
            })
        },
        //获取区域分组
        areagroupGroupalllist () {
            let data = {
                organizationId : 1,
            }
            areagroupGroupalllist(data).then(res => {
                if(res.data.code == 200) {
                    this.areaNameoptions = res.data.data
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
                personnelDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.personnelList()
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
        //删除
        handleClickdeleta (row) {
            this.$confirm(' ', '确认要删除吗?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                customClass:"massagebox"
            }).then(() => {
                personnelDelete(row.id).then(res => {
                    if(res.data.code == 200) {
                        this.personnelList()
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
        personnelList () {
            let data = {
                organizationId:1,
                name:this.name,
                phone:this.phone,
                keyword:this.keyword,
                page:this.page,
                limit:this.limit,
            }
            personnelList(data).then(res => {
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
