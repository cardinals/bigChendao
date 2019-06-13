<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="事件分组名称 :" prop="eventname">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.eventname">
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
export default {
    data() {
        return {

            ruleForm:{
                eventname:'',
            },
            rules: {
                eventname: [
                    { required: true, message: '请输入事件分组名称', trigger: 'blur' },
                ],
            },
            labelname:'',
        }
    },
    created() {
        if(this.$route.query.type === 1) {
            this.$route.meta.title = '添加' + this.$route.query.name
        }else {
            this.$route.meta.title = '编辑' + this.$route.query.name
        }

    },
    methods: {
        goback () {
            this.$router.push({
                path:'/warningplanManagement/planManagement'
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
