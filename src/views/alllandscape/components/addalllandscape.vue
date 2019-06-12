<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="全景名称 :" prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                style="width: 180px"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="全景路径 :"  prop="labelnamechange">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                style="width: 180px"
                                v-model="ruleForm.labelnamechange">
                        </el-input>
                        （必填，填写全景链接路径）
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="上传全景缩略图 :" prop="imgsupload">
                        <el-upload

                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-exceed="handleExceed"
                        >

                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" style="display: inline-block">
                                <el-input
                                size="medium"
                                placeholder="未选择任何文件"
                                style="width: 180px;margin: 0 10px 0 10px"
                                v-model="ruleForm.imgsupload">
                                </el-input>
                                <el-button size="small" type="primary">上传</el-button>
                            </div>
                        </el-upload>
                        <div class="uploadimgs" >
                            <img src=""/>
                        </div>

                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="关联景点 :">
                        <el-select v-model="ruleForm.name" clearable placeholder="请选择" size="medium" prop="name">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button type="info" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" @click="submitForm('ruleForm')"  size="small"> 提交 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>
    export default {
        data() {
            return {
                ruleForm:{
                    name:'',
                    labelnamechange:'',
                    locations:'',
                    input2:'',
                    value:'',
                    resource:''
                },
                rules: {
                    name: [
                        { required: true, message: '请区域分组名称', trigger: 'blur' },
                    ],
                    labelnamechange:[
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    locations: [
                        { required: true, message: '请选择地图位置', trigger: 'change' }
                    ],
                    imgsupload: [
                        { required: true, message: '请上传全景缩略图', trigger: 'change' }
                    ],

                },
                options:[],
                labelname:'',
                labelPosition:"right"
            }
        },
        created() {
            if(this.$route.query.type === 1) {
                this.$route.meta.title = '添加全景'
            }else {
                this.$route.meta.title = '编辑全景'
            }

        },
        methods: {
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
            goback () {
                this.$router.push({
                    path:'/alllandscape/alllandscapeManagement'
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //成功的
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
    .uploadimgs {
        width: 400px;
        height: 250px;
        margin-top: 10px;
        text-align:center;
        border: 1px solid #e9ebec
    }
</style>
