<template>
    <div class="lower" style="font-size: 16px;box-sizing: border-box;padding: 0 20px 0 20px;">
        <div style="font-size: 14px;box-sizing: border-box;padding: 0 0 0 20px; height: 30px">
            <el-button size="medium" style="float: right" @click="handleaddmap" type="warning">编辑底图</el-button>
        </div>
        <div class="texttop">
            <el-row type="flex" >
                <el-col :span="12">地图源: {{from.gmtModified || "/"}}</el-col>
                <el-col :span="12">底图图层：{{from.backgroundLayer || "/"}}地图</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="12">底图控件：缩放控件 平移控件 比例尺控件 测量控件</el-col>
                <el-col :span="12">显示级别：{{from.mapLevel || "/"}}</el-col>
            </el-row>
        </div>
    </div>


</template>

<script>
    import {basemapInfo} from '@/api/mapManagement/map.js'

    export default {
    data() {
        return {
            input:'',
            mapLevel:'',
            from:{},
        }
    },
    created() {
        this.basemapInfo()
    },
    methods:{
        handleaddmap () {
            this.$router.push({
                path: "/mapManagement/mapManagementLower/addlower",
            })
        },
        basemapInfo () {
            let data = {
                organizationId : 1
            }
            basemapInfo(data).then(res => {
                if(res.data.code == 200) {
                    let data = res.data.data
                    this.from = data
                }
            });
        },
    },
}
</script>

<style scoped>
    .texttop {
        box-sizing: border-box;
        font-size: 16px;
    }
</style>
