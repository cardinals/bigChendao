<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="选择景点 :" prop="name">
                        <el-select v-model="ruleForm.mailList"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="设置预警值 :"  prop="phone">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.phone">
                        </el-input>
                        （必填，不超过10个字符，数字，整数）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="设置推荐方案 :" prop="mailList">
                        <el-select v-model="ruleForm.mailList"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="primary">继续添加</el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
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
                phone:'',
                mailList:''
            },
            rules: {
                name: [
                    { required: true, message: '请选择区域分组', trigger: 'blur' },
                ],
                phone:[
                    { required: true, message: '请输入设置预警值', trigger: 'blur' }
                ],
                mailList: [
                    { required: true, message: '请选择设置推荐方案', trigger: 'change' }
                ],

            },
            options:[],
            labelname:'',
            labelPosition:"right"
        }
    },
    created() {
        if(this.$route.query.type === 1) {
            this.$route.meta.title = '添加人员'

        }else {
            this.$route.meta.title = '编辑人员'

        }

    },
    methods: {
        goback () {
            this.$router.push({
                path:'/locationManagement/personnelManagement'
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

</style>
