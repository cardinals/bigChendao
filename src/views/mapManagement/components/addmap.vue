<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">

                <el-col :span="24">
                    <el-form-item label="图层名称 :" prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="关联 :" prop="moduleName">
                        <el-select v-model="ruleForm.value" clearable placeholder="请选择" size="medium"  class="customized_input" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.moduleName">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.value" clearable placeholder="请选择" size="medium" style="margin-left: 10px"  class="customized_input">
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
                <el-col :span="24" style="height: 90px">
                    <el-form-item label="图层Icon :" prop="iconPath">
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
                                        class="customized_input"
                                        style="margin: 0 10px 0 10px"
                                        v-model="ruleForm.iconPath">
                                </el-input>
                                <el-button size="small" type="primary">上传</el-button>
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
    import {layerInfo,layerInsert} from '@/api/mapManagement/map.js'
export default {
    data() {
        return {
            ruleForm:{},
            options:[],
            rules:{
                name: [
                    { required: true, message: '请输入图层名称', trigger: 'blur' },
                ],
                moduleName:[
                    { required: true, message: '请输入关联名称', trigger: 'blur' }
                ],
                iconPath: [
                    { required: true, message: '请选择图层ICON', trigger: 'change' }
                ],

            }
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
        layerInsert () {
            let data = {
                name:'ssadasdas',
                moduleType:1,
                layerTypeId:5,
                iconPath:'www.xihuquceshi.com',
                organizationId:1,
            }
            layerInsert(data).then(res => {
                if(res.data.code == 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.goback()
                }

            }).catch( error => {
                this.$message('添加失败！');
                console.log(error);
            })
        },
        //查看的
        layerInfo () {

            layerInfo({layerTypeId:this.$route.query.layerTypeId}).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.ruleForm = data

                }
            })
        },
        submitForm(formName) {
            this.layerInsert()
            return
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //成功的
                    this.layerInsert()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
