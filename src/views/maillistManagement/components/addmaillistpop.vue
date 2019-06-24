<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="部门分组 :" prop="deptName">
                        <el-select v-model="ruleForm.deptName"  class="customized_input" placeholder="请选择" size="medium" >
                            <el-option
                                    v-for="item in deptNameoptions"
                                    :key="item.groupName"
                                    :label="item.groupName"
                                    :value="item.groupName">
                            </el-option>
                        </el-select>
                        <router-link style="margin-left: 20px" :to="{ path:'/maillistManagement/maillist/addmaillist', query: { name:'部门分组',type:1 }}">添加部门分组</router-link>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="区域分组 :" prop="areaName">
                        <el-select v-model="ruleForm.areaName"  class="customized_input" placeholder="请选择" size="medium" >
                            <el-option
                                    v-for="item in areaNameoptions"
                                    :key="item.groupName"
                                    :label="item.groupName"
                                    :value="item.groupName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="姓名 :"  prop="name">
                        <el-input
                                size="medium"
                                placeholder="请填写姓名"
                                class="customized_input"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符，数字，整数）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="联系方式 :" prop="phone">
                        <el-input
                                size="medium"
                                placeholder="请填写手机号"
                                class="customized_input"
                                v-model="ruleForm.phone">
                        </el-input>
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
    import { addressbookSave,deptgroupAlllist, areagroupGroupalllist,addressbookInfo } from "@/api/maillistManagement/mail.js"

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

                deptNameoptions:[],//部门
                areaNameoptions:[],//区域
                labelname:'',
                labelPosition:"right"
            }
        },
        created() {
            if(this.$route.query.type == 1) {
                this.$route.meta.title = '添加人员'
            }else {
                this.$route.meta.title = '编辑人员'
                this.addressbookInfo()
            }
            this.areagroupGroupalllist()
            this.deptgroupAlllist()
            // sessionStorage.setItem("activeName","通讯录")
        },
        methods: {
            goback () {
                this.$router.push({
                    path:'/maillistManagement/maillist',
                })
            },
            submitForm(formName) {
                this.addressbookSave()
                return
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //成功的
                    } else {
                        return false;
                    }
                });
            },
            //编辑下的根据ID获取通讯录人员信息
            addressbookInfo () {
                addressbookInfo(this.$route.query.id).then(res => {
                    if(res.data.code == 200) {
                        this.ruleForm = res.data.data
                    }
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
            //获取部门分组
            deptgroupAlllist () {
                let data = {
                    organizationId : 1
                }
                deptgroupAlllist(data).then(res => {
                    if(res.data.code == 200) {
                        this.deptNameoptions = res.data.data
                    }
                })
            },
            //添加
            addressbookSave () {
                let data = {
                    name:this.ruleForm.name,
                    phone:this.ruleForm.phone,
                    areaId:'',
                    areaName:this.ruleForm.areaName,
                    deptId:'',
                    deptName:this.ruleForm.deptName,
                    organizationId:1,
                    id:this.$route.query.type == 1? null : Number(this.$route.query.id)
                }
                this.areaNameoptions.forEach(item => {
                    if(item.groupName == this.ruleForm.areaName) {
                        data.areaId = item.groupId
                    }
                })
                this.deptNameoptions.forEach(item => {
                    if(item.groupName == this.ruleForm.deptName) {
                        data.deptId = item.groupId
                    }
                })

                addressbookSave(data).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.goback()
                    }else {
                        this.$message.error(res.data.data)
                    }

                }).catch( error => {
                    this.$message('添加失败！');

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
