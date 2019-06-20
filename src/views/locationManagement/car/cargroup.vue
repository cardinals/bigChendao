<template>
    <div class="resource">

        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">

            车辆型号：
            <el-input v-model="carType" style="width: 200px;margin-right: 10px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            车牌号：
            <el-input v-model="licenseNumber" style="width: 200px;margin-right: 10px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            驾驶人：
            <el-input v-model="driver" style="width: 200px;margin-right: 10px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" style="margin-left: 10px" type="primary" @click="findkeyword">查询</el-button>

            <el-button size="medium" @click="addactiveName" style="float: right" type="warning">添加车辆</el-button>
            <el-select v-model="input" placeholder="所有区域分组" size="medium" style="width: 200px;float: right">
                <el-option
                        v-for="item in areaNameoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
                        label="车辆类型"
                        prop="carType"
                        show-overflow-tooltip>
                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="licenseNumber"
                        label="车牌号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="driver"
                        label="驾驶人"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="driverPhone"
                        label="联系方式"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="区域分组"
                        show-overflow-tooltip>
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
    import { carList, carDelete, carDeletebatch, areagroupGroupalllist } from "@/api/locationManagement/location.js";

    export default {
    data() {
        return {
            input:'',
            carType:'',
            licenseNumber:'',
            driver:null,
            keyword:'',
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
        this.carList()
        this.areagroupGroupalllist()
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.carList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.carList()
        },
        findkeyword () {
            this.carList()
        },
        addactiveName () {
            this.$router.push({
                path: "/locationManagement/carManagement/addcar",
                query:{
                    type:1
                },
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
        handleClick (row) {
            this.$router.push({
                path: "/locationManagement/carManagement/addcar",
                query:{
                    id:row.carId
                }
            })
        },
        //轨迹
        handleClicktrajectory () {
            this.$router.push({
                path: "/locationManagement/carManagement/cartrajectory",
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
                ids.push(item.carId)
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
                carDeletebatch(data).then(res => {
                    if(res.data.code == 200) {
                        this.carList()
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
                carDelete(row.carId).then(res => {
                    if(res.data.code == 200) {
                        this.carList()
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
        carList () {
            let data = {
                organizationId:1,
                carType:this.carType, //车辆型号
                licenseNumber:this.licenseNumber, //车牌号
                driver:this.driver, //驾驶人
                keyword:this.keyword,
                page:this.page,
                limit:this.limit,
            }
            carList(data).then(res => {
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
