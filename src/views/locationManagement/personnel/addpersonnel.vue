<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="姓名 :" prop="name">
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
                    <el-form-item label="联系方式 :"  prop="phone">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.phone">
                        </el-input>
                        （必填，不超过11个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="角色 :" prop="role">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.role">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="区域分组 :"  prop="groupId">
                        <el-select v-model="ruleForm.groupId"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in areaNameoptions"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="通讯录部门 :" prop="deptId">
                        <el-select v-model="ruleForm.deptId"  class="customized_input" placeholder="所有区域分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>
    import { personnelSave, personnelInfo, deptgroupAllList,areagroupGroupalllist} from "@/api/locationManagement/location.js";

    export default {
    data() {
        return {

            ruleForm:{
                name:'',
                phone:'',
                role:'',
                groupName:'',
                deptId:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                phone:[
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请输入角色', trigger: 'change' }
                ],
                groupId: [
                    { required: true, message: '请输入区域分组', trigger: 'change' }
                ],
                deptId: [
                    { required: true, message: '请选择通讯录部门', trigger: 'change' }
                ],

            },
            options:[],
            areaNameoptions:[],
            labelname:'',
            labelPosition:"right",
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加人员'
        }else {
            this.$route.meta.title = '编辑人员'
            this.personnelInfo()
        }
        this.deptgroupAllList()
        this.areagroupGroupalllist()
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/locationManagement/personnelManagement'
            })
        },
        //查询
        personnelInfo () {
            personnelInfo(this.$route.query.id).then(res => {
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
        //通讯录部门
        deptgroupAllList () {
            deptgroupAllList({organizationId:1}).then(res => {
                if(res.data.code == 200) {
                    this.options = res.data.data
                }
            })
        },
        //新增
        personnelSave () {
            let groupNames = ''
            this.areaNameoptions.forEach(item => {
                if(item.groupId == this.ruleForm.groupId) {
                    groupNames = item.groupName
                }
            })

            let data = {
                organizationId:1,
                name:this.ruleForm.name, //名称
                phone:this.ruleForm.phone, //电话
                role:this.ruleForm.role, //角色
                deptId:this.ruleForm.deptId, //部门id
                id:this.$route.query.type == 1?null:this.$route.query.id,//人员id
                groupId:this.ruleForm.groupId, //所属区域分组ID
                groupName:groupNames, //所属区域分组名称

            }
            personnelSave(data).then(res => {
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
                    this.personnelSave()
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
