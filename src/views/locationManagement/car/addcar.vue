<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="车辆型号 :" prop="carType">
                        <el-input
                                size="medium"
                                class="customized_input"
                                placeholder="请输入内容"
                                v-model="ruleForm.carType">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="车牌号 :"  prop="licenseNumber">
                        <el-input
                                size="medium"
                                class="customized_input"
                                placeholder="请输入内容"
                                v-model="ruleForm.licenseNumber">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="驾驶人 :" >
                        <el-input
                                size="medium"
                                class="customized_input"
                                placeholder="请输入内容"
                                v-model="ruleForm.driver">
                        </el-input>
                        （可填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="联系方式 :" >
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.driverPhone">
                        </el-input>
                        （可填，不超过11个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="区域分组 :" prop="groupId">
                        <el-select v-model="ruleForm.groupId"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in areaNameoptions"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                        （必选）
                    </el-form-item>
                </el-col>
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>
    import { carSave, carInfo,areagroupGroupalllist} from "@/api/locationManagement/location.js";

    export default {
        data() {
            return {
                ruleForm:{
                    carType:'',
                    driver:'',
                    driverPhone:'',
                    licenseNumber:'',
                    groupId:''
                },
                rules: {
                    carType: [
                        { required: true, message: '请输入车辆类型', trigger: 'blur' },
                    ],
                    licenseNumber:[
                        { required: true, message: '请输入车牌号', trigger: 'blur' }
                    ],
                    driver: [
                        { required: true, message: '请输入驾驶人', trigger: 'blur' }
                    ],
                    driverPhone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    groupId: [
                        { required: true, message: '请选择通讯录部门', trigger: 'change' }
                    ],

                },
                options:[],
                labelname:'',
                labelPosition:"right",
                areaNameoptions:[]
            }
        },
        created() {
            if(this.$route.query.type === 1) {
                this.$route.meta.title = '添加车辆'
            }else {
                this.$route.meta.title = '编辑车辆'
                this.carInfo()
            }
            this.areagroupGroupalllist()
        },
        methods: {
            goback () {
                this.$router.push({
                    path:'/locationManagement/carManagement'
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
            //查询
            carInfo () {
                carInfo(this.$route.query.id).then(res => {
                    if(res.data.code == 200) {
                        this.ruleForm = res.data.data
                    }
                })
            },
            //新增
            carSave () {
                let groupNames = ''
                this.areaNameoptions.forEach(item => {
                    if(item.groupId == this.ruleForm.groupId) {
                        groupNames = item.groupName
                    }
                })
                let data = {
                    organizationId:1,
                    carType:this.ruleForm.carType, //名称
                    licenseNumber:this.ruleForm.licenseNumber, //电话
                    driver:this.ruleForm.driver, //角色
                    driverPhone:this.ruleForm.driverPhone, //部门id
                    carId:this.$route.query.type == 1?null:Number(this.$route.query.id),//人员id
                    groupId:this.ruleForm.groupId, //所属区域分组ID
                    groupName:groupNames, //所属区域分组名称
                }
                carSave(data).then(res => {
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
                        this.carSave()
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
