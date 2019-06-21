<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="选择景点 :" prop="scenicId">
                        <el-select v-model="ruleForm.scenicId"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="设置预警值 :"  prop="warningValue">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.warningValue">
                        </el-input>
                        （必填，不超过10个字符，数字，整数）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="设置推荐方案 :" prop="planId">
                        <el-select v-model="ruleForm.planId"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in optionsplan"
                                    :key="item.id"
                                    :label="item.planName"
                                    :value="item.id">
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
    import { earlywarningSave, earlywarningInfo,baseinfoallList,emergencyplanallList} from "@/api/warningplanManagement/warningplan.js";

    export default {
    data() {
        return {

            ruleForm:{
                scenicId:'',
                warningValue:'',
                planName:''
            },
            rules: {
                scenicId: [
                    { required: true, message: '请选择景点', trigger: 'change' },
                ],
                warningValue:[
                    { required: true, message: '请输入设置预警值', trigger: 'blur' }
                ],
                planId: [
                    { required: true, message: '请选择设置推荐方案', trigger: 'change' }
                ],

            },
            options:[],
            optionsplan:[],
            labelname:'',
            labelPosition:"right",
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加人员'
        }else {
            this.$route.meta.title = '编辑人员'
            this.earlywarningInfo()
        }
        this.baseinfoallList()
        this.emergencyplanallList()
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/warningplanManagement/warningManagement'
            })
        },
        //关联景点list
        baseinfoallList () {
            let data = {
                organizationId:1,
                layerTypeId:12
            }
            baseinfoallList(data).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.options = data
                }
            })
        },
        //推荐方案
        emergencyplanallList () {
            let data = {
                organizationId:1,
            }
            emergencyplanallList(data).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.optionsplan = data
                }
            })
        },
        //查询
        earlywarningInfo () {
            earlywarningInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
        },
        //新增
        earlywarningSave () {
            let scenicNames = ''
            this.options.forEach(item => {
                if(item.id == this.ruleForm.scenicId) {
                    scenicNames = item.name
                }
            })
            let planNames = ''
            this.optionsplan.forEach(item => {
                if(item.id == this.ruleForm.planId) {
                    planNames = item.planName
                }
            })

            let data = {
                organizationId:1,
                warningValue:this.ruleForm.warningValue, //预警值
                scenicId:this.ruleForm.scenicId, //景点id
                scenicName:scenicNames, //景点
                planId:this.ruleForm.planId, //方案id
                planName:planNames, //方案
                id:this.$route.query.type == 1?null:Number(this.$route.query.id),//人员id
            }
            earlywarningSave(data).then(res => {
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
            this.earlywarningSave()
            return
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //成功的
                    this.earlywarningSave()
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
