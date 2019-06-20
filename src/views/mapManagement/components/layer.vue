<template>
    <div class="layer">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">

            <el-tabs v-model="activeName" @tab-click="handleClicktab" style="margin-bottom: 10px">
                <el-tab-pane label="管控" name="管控">管控</el-tab-pane>
                <el-tab-pane label="指挥" name="指挥">指挥</el-tab-pane>
            </el-tabs>

            关键词：
            <el-input v-model="keyword" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" @click="querylist" type="primary">查询</el-button>
            <el-button size="medium" @click="addmap" style="float: right" type="warning">添加图层</el-button>
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
                <template>
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column type="index" label="序号" width="55"></el-table-column>

                    <el-table-column label="图层名称" prop="name" show-overflow-tooltip >

                    </el-table-column>
                    <el-table-column label="关联名称" prop="moduleName" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="图层元素数量" prop="resCount" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="图层ICON" prop="iconPath" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column label="添加时间" prop="gmtCreate" show-overflow-tooltip>

                    </el-table-column>

                    <el-table-column fixed="right" label="操作"width="130">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit-outline" style="color: #E79524"></i>编辑</el-button>
                            <el-button @click="handleClickdeleta(scope.row)" type="text" size="small"><i class="el-icon-delete" style="color: #C30E29"></i>删除</el-button>
                        </template>
                    </el-table-column/>

                </template>


            </el-table>
            <div style="margin-top: 20px">
                <el-button type="warning" :disabled="disabledDelete" @click="toggleSelection()">批量删除</el-button>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[10, 20, 30, 40]"
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
    import { layerList, layerDelete,layerDeletebatch } from "@/api/mapManagement/map.js";
export default {
    data() {
        return {
            keyword:'',
            activeName:'管控',
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            moduleType:1,
            disabledDelete:true,
            page:1,
            limit:10,
            total:0,



        }
    },
    created() {
      this.layerList()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.layerList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.layerList()
        },
        addmap () {
            this.$router.push({
                path: "/mapManagement/mapManagementLayer/addmap",
                query:{
                    type:1
                }
            })
        },
        //tab切换
        handleClicktab () {
            if(this.activeName == '管控') {
                this.moduleType = 1
            }else {
                this.moduleType = 2
            }
            this.layerList()
        },
        //查询
        querylist () {
            this.layerList()
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

                layerDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.layerList()
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
                path: "/mapManagement/mapManagementLayer/addmap",
                query:{
                    id:row.id
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

                    layerDelete(row.id).then(res => {
                        if(res.data.code == 200) {
                            this.layerList()
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
        layerList () {
            let data = {
                organizationId:1,
                moduleType:this.moduleType,
                keyword:this.keyword?this.keyword:'',
                page:this.page,
                limit:this.limit
            }
            layerList(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.tableData = data.records
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

.layer .el-tab-pane{
    display: none;
}
</style>
