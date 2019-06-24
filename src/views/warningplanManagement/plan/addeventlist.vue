<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="事件分组名称 :" prop="groupName">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.groupName">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>

                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>
    import { eventgroupSave,eventgroupUpdate, eventgroupInfo,} from "@/api/warningplanManagement/warningplan.js";
    export default {
    data() {
        return {

            ruleForm:{
                groupName:'',
            },
            rules: {
                groupName: [
                    { required: true, message: '请输入事件分组名称', trigger: 'blur' },
                ],
            },
            labelname:'',
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加事件分组'
        }else {
            this.$route.meta.title = '编辑事件分组'
            this.eventgroupInfo()
        }

    },
    methods: {
        goback () {
            this.$router.push({
                path:'/warningplanManagement/planManagement'
            })
        },
        //查询
        eventgroupInfo () {
            eventgroupInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
        },
        //修改
        eventgroupUpdate () {
            let data = {
                organizationId:1,
                groupName:this.ruleForm.groupName,
            }
            let ids = this.$route.query.id
            eventgroupUpdate(ids,data).then(res => {
                if(res.data.code == 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.goback()
                }else {
                    this.$message.error(res.data.data.message);
                }
            })
        },
        //新增
        eventgroupSave () {
            let data = {
                organizationId:1,
                groupName:this.ruleForm.groupName,
            }
            eventgroupSave(data).then(res => {
                if(res.data.code == 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.goback()
                }else {
                    this.$message.error(res.data.data.message);
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.type == 1) {
                        this.eventgroupSave()
                    }else {
                        this.eventgroupUpdate()
                    }
                } else {
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
