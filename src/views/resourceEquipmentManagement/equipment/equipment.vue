<template>

    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">

            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px" >
                <el-tab-pane v-for="item of activeNamelist" :key="item.id" :label="item.name" :name="item.name">{{item.name}}</el-tab-pane>
            </el-tabs>
            景点名称：
            <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" type="primary" @click="findkeyword">查询</el-button>
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

                <el-table-column type="index"  label="序号" width="55" >
                </el-table-column>
                <el-table-column  label="景点名称" show-overflow-tooltip prop="name" >
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column  prop="groupName" label="区域分组" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="gmtCreate" label="添加时间" show-overflow-tooltip></el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
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
    import { baseinfoList, baseinfolayertypelist, baseinfoDelete, baseinfoDeletebatch  } from "@/api/resourceEquipmentManagement/resourceEquipment.js";

    export default {
    data() {
        return {
            input:"",
            disabledDelete:true,
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            activeName:'景点',
            activeNamelist:[],
            layerTypeId:12,
            page:1,
            limit:10,
            total:0,
        }
    },
    created() {
        this.baseinfolayertypelist()
        this.baseinfoList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.baseinfoList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.baseinfoList()
        },
        findkeyword () {
            this.baseinfoList()
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
                baseinfoDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.baseinfoList()
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
                path: "/resourceEquipmentManagement/equipmentManagement/addequipment",
                query:{
                    name:this.activeName,
                    id:row.id
                },

            })
        },
        //
        handleClicktab() {
            this.activeNamelist.forEach(item => {
                if (item.name == this.activeName) {
                    this.layerTypeId = item.id
                    this.baseinfoList()
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
                baseinfoDelete(row.id).then(res => {
                    if(res.data.code == 200) {
                        this.baseinfoList()
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
        //tab的切换菜单
        baseinfolayertypelist () {
            let data = {
                moduleType:2
            }
            baseinfolayertypelist(data).then(res => {
                if(res.data.code == 200) {
                    this.activeNamelist = res.data.data
                    this.layerTypeId = res.data.data[0].id
                }
            })
        },
        //table
        baseinfoList () {
            let data = {
                organizationId:1,
                moduleType:2,
                layerTypeId:this.layerTypeId,
                groupId:'',
                keyword:this.keyword,
                page:this.page,
                limit:this.limit,
            }
            baseinfoList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
                    this.total = data.total

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
