<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-col :span="24">
                    <el-form-item label="图层名称 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="form.input2">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="关联 :">
                        <el-select v-model="form.value" clearable placeholder="请选择" size="medium"  class="customized_input" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="form.value" clearable placeholder="请选择" size="medium" style="margin-left: 10px"  class="customized_input">
                            <el-option
                                    size="medium"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="图层Icon :" >
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="form.input2">
                        </el-input>
                        <el-upload
                                class="upload-demos"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-exceed="handleExceed"
                                >
                            <el-button style="margin-left: 10px" size="small" type="primary">选择文件</el-button>
                            <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-left: 10px">
                                <el-button size="small" type="primary">上传文件</el-button>
                                <span style="padding-left: 10px" slot="tip" class="el-upload__tip">(必填项，上传PNG格式图标)</span>
                            </div>


                        </el-upload>

                    </el-form-item>
                </el-col>
            </el-form>
            <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
            <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
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
    created() {
        if(this.$route.query.type === 1) {
            this.$route.meta.title = '添加图层'
        }else {
            this.$route.meta.title = '编辑图层'
        }
    },
    methods: {
        goback () {
          this.$router.push({
              path:'/mapManagement/mapManagementLayer'
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
