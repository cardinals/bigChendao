<template>
    <div class="lower" style="font-size: 16px;box-sizing: border-box;padding: 0 20px 0 20px;">
        <div style="font-size: 14px;box-sizing: border-box;padding: 0 0 0 20px; height: 30px">
            <el-button size="medium" style="float: right" @click="handleaddmap" type="warning">编辑底图</el-button>
        </div>
        <div class="texttop">
            <el-row type="flex" >
                <el-col :span="12">地图源:百度</el-col>
                <el-col :span="12">底图图层：2D地图</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
                <el-col :span="12">底图控件：缩放控件 平移控件 比例尺控件 测量控件</el-col>
                <el-col :span="12">显示级别：级别9</el-col>
            </el-row>
        </div>
        <el-button size="medium" @click="layouts" type="warning">跳轉吧</el-button>
    </div>


</template>

<script>
export default {
    data() {
        return {
            input:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods:{
        handleaddmap () {
            this.$router.push({
                path: "/mapManagement/mapManagementLower/addlower",
            })
        },
        layouts() {
            this.$router.push({
                path: "/layouts",
            })
        }
    }
}
</script>

<style scoped>
    .texttop {
        box-sizing: border-box;
        font-size: 16px;
    }
</style>
