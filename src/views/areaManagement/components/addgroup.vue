<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="120px" >
                <el-col :span="24" style="height: 70px">
                    <el-form-item label="区域分组名称 :" prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>

            </el-form>
            <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
            <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
        </div>
    </div>

</template>

<script>
    import { areagroupInsert, areagroupUpdate } from "@/api/areaManagement/area.js";

    export default {
    data() {
        return {
            ruleForm:{
                name:''
            },
            rules:{
                name: [
                    { required: true, message: '请输入区域分组名称', trigger: 'blur' },
                ],
            },
            options:[],
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加区域分组'
        }else {
            this.$route.meta.title = '编辑区域分组'
        }
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/areaManagement/areagroupManagement'
            })
        },
        areagroupInsert () {
            let data = {
                groupName:this.ruleForm.name,
                organizationId:1
            }
            areagroupInsert(data).then(res => {
                if(res.data.code == 200) {
                    this.goback()
                }
            })
        },
        areagroupUpdate () {
            let data = {
                groupName:this.ruleForm.name,
                // id:this.$route.query.groupId
            }
            areagroupUpdate(this.$route.query.groupId,data).then(res => {
                if(res.data.code == 200) {
                    this.goback()
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.groupId) {
                        this.areagroupUpdate()
                    }else {
                        this.areagroupInsert()
                    }
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
