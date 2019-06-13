<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="部门分组 :" prop="department">
                        <el-select v-model="ruleForm.department"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <router-link style="margin-left: 20px" :to="{ path:'/maillistManagement/maillist/addmaillist', query: { name:'部门分组',type:1 }}">添加部门分组</router-link>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="区域分组 :" prop="areagroup">
                        <el-select v-model="ruleForm.areagroup"  class="customized_input" placeholder="所有区域分组" size="medium" >
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
                    <el-form-item label="姓名 :"  prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符，数字，整数）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="联系方式 :" prop="phone">
                        <el-select v-model="ruleForm.phone"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        （必填，不超过11个字符，数字，整数）
                    </el-form-item>
                </el-col>
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
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
                    department:'',
                    areagroup:'',
                    name:'',
                    phone:'',

                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phone:[
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请选择部门分组', trigger: 'change' }
                    ],
                    areagroup: [
                        { required: true, message: '请选择区域分组', trigger: 'change' }
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
