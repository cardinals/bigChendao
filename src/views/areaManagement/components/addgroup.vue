<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form ref="form" :model="form" label-width="120px">
                <el-col :span="24">
                    <el-form-item label="区域分组名称 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                suffix-icon="el-icon-date"
                                style="width: 180px"
                                v-model="form.input2">
                        </el-input>
                        （必填，不超过10个字符）
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
        }
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/areaManagement/areagroupManagement'
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
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
