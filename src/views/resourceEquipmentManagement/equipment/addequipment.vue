<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form ref="form" :model="form" label-width="110px">

                <el-col :span="24">
                    <el-form-item label="区域分组名称 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"

                                style="width: 180px"
                                v-model="form.input2">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="labelname + '名称 :'">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"

                                style="width: 180px"
                                v-model="form.input2">
                        </el-input>
                        （必选）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地图位置 :">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="中心点描点"></el-radio>
                            <el-radio label="中心点坐标"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label=" ">
                        <el-button type="primary" size="small">开始选点</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="中心的坐标 :">
                        经度： <el-input
                                size="medium"
                                placeholder="请输入内容"
                                style="width: 180px"
                                v-model="form.input2">
                            </el-input>
                        纬度：
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                style="width: 180px"
                                v-model="form.input2">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="视频流地址 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                style="width: 180px"
                                v-model="form.input2">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-button type="info" @click="goback" size="small"> 返回 </el-button>
            <el-button type="warning" size="small"> 完成 </el-button>
        </div>



    </div>

</template>

<script>
export default {
    data() {
        return {
            form:{
                input2:'',
                value:''
            },
            // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            options:[],
            labelname:'',
            labelPosition:"right"
        }
    },
    created() {
        this.$route.meta.title = '添加' + this.$route.query.name
        this.labelname = this.$route.query.name
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/resourceEquipmentManagement/equipmentManagement'
            })
        },

    }
}
</script>

<style scoped>
    .addmap {
        box-sizing: border-box;
        padding:0 23px 0 0;
    }

    .addmap .el-upload-list {
        display: none !important;
    }
</style>
