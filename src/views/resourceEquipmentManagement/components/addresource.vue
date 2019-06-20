<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">

                <el-col :span="24">
                    <el-form-item label="区域分组名称 :" prop="name">
                        <el-select v-model="ruleForm.groupId" clearable placeholder="请选择" size="medium" prop="name"  class="customized_input" @change="changegroupName">
                            <el-option
                                    size="medium"
                                    v-for="item in areaNameoptions"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item :label="labelname + '名称 :'"  prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.name">
                        </el-input>
                        （必选）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="地图位置 :">
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
                                v-model="ruleForm.lng">
                            </el-input>
                        纬度：
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.lat">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="this.$route.query.name == '监控' ">
                    <el-form-item label="视频流地址 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.streamUrl">
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

    import { baseinfoInsert, areagroupGroupalllist,baseinfoInfo,baseinfoUpdate } from "@/api/resourceEquipmentManagement/resourceEquipment.js";

    export default {
    data() {
        return {
            ruleForm:{
                name:'',
                groupId:'',
                locations:'',
                input2:'',
                value:'',
                resource:'',
                streamUrl:'',
                lng:null,
                lat:null,
            },
            rules: {
                groupId: [
                    { required: true, message: '请区域分组名称', trigger: 'blur' },
                ],
                name:[
                    { required: true, message: '请输入监控名称', trigger: 'blur' }
                ],
                locations: [
                    { required: true, message: '请选择地图位置', trigger: 'change' }
                ],

            },
            options:[],
            labelname:'',
            areaNameoptions:[],//区域分组
            labelPosition:"right",
            groupId:null,
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加' + this.$route.query.name
            this.labelname = this.$route.query.name
        }else {
            this.$route.meta.title = '编辑' + this.$route.query.name
            this.labelname = this.$route.query.name
            this.baseinfoInfo()
        }
        this.areagroupGroupalllist()
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/resourceEquipmentManagement/resourceManagement'
            })
        },
        changegroupName () {

        },
        //查询
        baseinfoInfo () {
            baseinfoInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
        },
        //编辑更新
        baseinfoUpdate () {
            let data = {
                organizationId:1,
                name:this.ruleForm.name, //名称
                moduleType:1, //设备/资源类型 1：设备 2：资源
                layerTypeId:6,//关联图层类型
                lng:this.ruleForm.lng, //经度    以下暂时写死
                lat:this.ruleForm.lat, //维度
                streamUrl:this.ruleForm.streamUrl,//监控视频流（视频监控独有）
                groupId:this.ruleForm.groupId,//区域分组ID

            }
            let ids = this.$route.query.id
            baseinfoUpdate(ids,data).then(res => {
                if(res.data.code == 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.goback()
                }
            })
        },
        //新增
        baseinfoInsert () {
            let data = {
                organizationId:1,
                name:this.ruleForm.name, //名称
                moduleType:1, //设备/资源类型 1：设备 2：资源
                layerTypeId:6,//关联图层类型
                lng:this.ruleForm.lng, //经度    以下暂时写死
                lat:this.ruleForm.lat, //维度
                streamUrl:this.ruleForm.streamUrl,//监控视频流（视频监控独有）
                groupId:this.ruleForm.groupId,//区域分组ID

            }
            baseinfoInsert(data).then(res => {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.$route.query.type == 1) {
                        this.baseinfoInsert()
                    }else {
                        this.baseinfoUpdate()
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
