<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="区域分组名称 :" prop="name">
                        <el-select v-model="ruleForm.name" clearable placeholder="请选择" size="medium" prop="name"  class="customized_input">
                            <el-option
                                    size="medium"
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="labelname + '名称 :'"  prop="labelnamechange">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.labelnamechange">
                        </el-input>
                        （必选）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地图位置 :" prop="locations">
                        <el-radio-group v-model="ruleForm.locations" >
                            <el-radio label="中心点描点"></el-radio>
                            <el-radio label="中心点坐标"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label=" ">
                        <el-button type="primary" size="small">开始选点</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="中心的坐标 :">
                        经度： <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                style="margin-right: 19px"
                                v-model="ruleForm.input2">
                            </el-input>
                        纬度：
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="视频流地址 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-form>

        </div>



    </div>

</template>

<script>

    import { baseinfoInsert } from "@/api/resourceEquipmentManagement/resourceEquipment.js";

    export default {
    data() {
        return {
            ruleForm:{
                name:'',
                labelnamechange:'',
                locations:'',
                input2:'',
                value:'',
                resource:''
            },
            rules: {
                name: [
                    { required: true, message: '请区域分组名称', trigger: 'blur' },
                ],
                labelnamechange:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                locations: [
                    { required: true, message: '请选择地图位置', trigger: 'change' }
                ],

            },
            options:[],
            labelname:'',
            labelPosition:"right"
        }
    },
    created() {
        if(this.$route.query.type === 1) {
            this.$route.meta.title = '添加' + this.$route.query.name
            this.labelname = this.$route.query.name
        }else {
            this.$route.meta.title = '编辑' + this.$route.query.name
            this.labelname = this.$route.query.name
        }

    },
    methods: {
        goback () {
            this.$router.push({
                path:'/resourceEquipmentManagement/resourceManagement'
            })
        },
        baseinfoInsert () {
            let data = {
                organizationId:1,
                Name:'sdasda',
                moduleType:1,
                layerTypeId:6,
                Lng:'33.33',
                Lat:'64.25',
                address:'',
                phoneNumber:'',
                resNumber:'',
                introduction:'',
                streamUrl:'',
                groupId:'',
            }
            baseinfoInsert(data).then(res => {
                if(res.data.code == 200) {
                    this.$message('添加成功！');
                    this.goback()
                }
            })
        },
        submitForm(formName) {
            this.baseinfoInsert()
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
