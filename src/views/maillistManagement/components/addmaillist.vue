<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="部门分组名称 :" prop="groupName">
                        <el-input
                                size="medium"
                                placeholder="请填写分组名称"
                                class="customized_input"
                                v-model="ruleForm.groupName">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>

                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 提交 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>
    import { deptgroupInfo, deptgroupInsert, deptgroupUpdate } from "@/api/maillistManagement/mail.js"
    export default {
        data() {
            return {

                ruleForm:{
                    groupName:'',
                },
                rules: {
                    groupName: [
                        { required: true, message: '请输入部门分组名称', trigger: 'blur' },
                    ],
                },
                labelname:'',
            }
        },
        created() {
            if(this.$route.query.type == 1) {
                this.$route.meta.title = '添加' + this.$route.query.name
            }else {
                this.$route.meta.title = '编辑' + this.$route.query.name
                this.deptgroupInfo()
            }

        },
        methods: {
            goback () {
                // this.$router.push({
                //     path:'/maillistManagement/maillist'
                // })
                this.$router.go(-1)

            },

            //编辑下的根据ID获取部门分组信息
            deptgroupInfo () {
                deptgroupInfo(this.$route.query.groupId).then(res => {
                    if(res.data.code == 200) {
                        this.ruleForm = res.data.data
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$route.query.type == 1) {
                            this.deptgroupInsert()
                        }else {
                            this.deptgroupUpdate()
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //编辑
            deptgroupUpdate () {
                let data = {
                    groupName:this.ruleForm.groupName,
                }
                let groupId = this.$route.query.groupId
                deptgroupUpdate(groupId,data).then(res => {
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
                    console.log(error);
                })
            },
            //添加
            deptgroupInsert () {
                let data = {
                    groupName:this.ruleForm.groupName,
                    organizationId:1,
                }

                deptgroupInsert(data).then(res => {
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
                    console.log(error);
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
