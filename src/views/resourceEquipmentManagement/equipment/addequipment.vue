<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form v-if="labelname !== '应急物资'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="155px">
                <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                        <el-form-item :label="labelname + '名称 :'" prop="name">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.name">
                            </el-input>
                            （必选,不超过10个字符）
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="labelname + '地址 :'">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.address">
                            </el-input>
                            （选填，不超过30个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                        <el-form-item label="所属区域分组 :" prop="groupId">
                            <el-select v-model="ruleForm.groupId" clearable placeholder="请选择" size="medium"  class="customized_input" @change="changegroupName">
                                <el-option
                                        size="medium"
                                        v-for="item in areaNameoptions"
                                        :key="item.groupId"
                                        :label="item.groupName"
                                        :value="item.groupId">
                                </el-option>
                            </el-select>
                            （必填）
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话 :">
                            <el-input
                                    size="medium"
                                    class="customized_input"
                                    placeholder="请输入内容"
                                    v-model="ruleForm.input2">
                            </el-input>
                            （选填，不超过11个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                        <el-form-item :label="labelname + '介绍 :'" prop="introduction">
                            <el-input style="display: none" v-model="ruleForm.introduction"></el-input>
                            （必填，不超过350个字符）
                        </el-form-item>
                    </el-col>
                    <el-col v-if="labelname == '景点'" :span="12">
                        <el-form-item label="上传语音 :">
                            <div style="height: 90px;width: 100%">
                                <el-upload
                                        class="upload-demos"
                                        action="http://61.174.54.85:8001/nv2/audio/upload"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        style="display: inline-block;"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :on-success="handleAvatarSuccessaudio"
                                        :before-upload="beforeAvatarUploadaudio"
                                >
                                    <el-button size="small" type="primary">选择文件</el-button>
                                    <span slot="tip" class="el-upload__tip">（选填，支持MP3格式）</span>
                                </el-upload>

                            </div>


                        </el-form-item>
                    </el-col>
                    <el-col v-if="labelname == '游客中心'" :span="12">
                        <el-form-item label="总车位数 :">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.resNumber">
                            </el-input>
                            个
                            （选填，填写整数）
                        </el-form-item>
                    </el-col>
                    <el-col v-if="labelname == '卫生间'" :span="12">
                        <el-form-item label="厕位数 :">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.input2">
                            </el-input>
                            个
                            （选填，填写整数）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">

                    <el-input
                            class="textareaheight"
                            type="textarea"
                            placeholder="请填写介绍，不超过350个字符"
                            v-model="ruleForm.introduction"
                            maxlength="350"
                            :rows="4"
                            style="margin-bottom: 16px;"
                            show-word-limit
                    >
                    </el-input>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="地图位置 :" >
                            <el-radio-group v-model="ruleForm.locations">
                                <el-radio label="中心点描点"></el-radio>
                                <el-radio label="中心点坐标"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label=" ">
                            <el-button type="primary" size="small">开始选点</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="中心的坐标 :">
                            经度： <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
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
                </el-row>
                <el-row type="flex" class="row-bg">
                    <div class="mapchanges">
                        <!--图片-->
                    </div>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="8">
                        <el-form-item label="上传图片（第一张） :" >
                            （必填，支持PNG、JPG、BMP）
                        </el-form-item>
                        <div style="width: 100%;height: 90px">
                            <el-upload
                                    action="http://61.174.54.85:8001/nv2/image/upload"
                                    :on-remove="handleRemove"
                                    :on-preview="handlePreview"
                                    :before-remove="beforeRemove"
                                    :on-exceed="handleExceed"
                                    :on-success="handleAvatarSuccess1"
                                    :before-upload="beforeAvatarUpload"
                                    style="display: inline-block;"
                                    :limit="1"
                                    multiple
                            >
                                <el-button size="small" type="primary">选择文件</el-button>
                            </el-upload>
                        </div>


                        <div class="uploadimgs" >
                            <img :src="picPath1?picPath1:'' " alt=""/>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传图片（第二张） :">
                            （支持PNG、JPG、BMP）
                        </el-form-item>
                        <div style="width: 100%;height: 90px">
                            <el-upload
                                    action="http://61.174.54.85:8001/nv2/image/upload"
                                    :on-remove="handleRemove"
                                    :on-preview="handlePreview"
                                    :before-remove="beforeRemove"
                                    :on-exceed="handleExceed"

                                    :on-success="handleAvatarSuccess2"
                                    :before-upload="beforeAvatarUpload"
                                    style="display: inline-block;"
                                    :limit="1"
                                    multiple
                            >
                                <el-button size="small" type="primary">选择文件</el-button>
                            </el-upload>
                        </div>

                        <div class="uploadimgs" >
                            <img :src="picPath2?picPath2:'' " alt=""/>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传图片（第三张） :">
                            （支持PNG、JPG、BMP）
                        </el-form-item>
                        <div style="width: 100%;height: 90px">
                            <el-upload
                                    action="http://61.174.54.85:8001/nv2/image/upload"
                                    :on-remove="handleRemove"
                                    :on-preview="handlePreview"
                                    :before-remove="beforeRemove"
                                    :on-exceed="handleExceed"

                                    :on-success="handleAvatarSuccess3"
                                    :before-upload="beforeAvatarUpload"
                                    style="display: inline-block;"
                                    :limit="1"
                                    multiple
                            >
                                <el-button size="small" type="primary">选择文件</el-button>
                            </el-upload>
                        </div>

                        <div class="uploadimgs" >
                            <img :src="picPath3?picPath3:'' " alt=""/>
                        </div>
                    </el-col>

                </el-row>
            </el-form>
            <el-form v-else ref="form" :model="form" :rules="rules" label-width="125px">
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="所属区域分组 :" prop="groupId">
                            <el-select v-model="ruleForm.groupId" clearable placeholder="请选择" size="medium"  class="customized_input" @change="changegroupName">
                                <el-option
                                        size="medium"
                                        v-for="item in areaNameoptions"
                                        :key="item.groupId"
                                        :label="item.groupName"
                                        :value="item.groupId">
                                </el-option>
                            </el-select>
                            （必填）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="指挥物资名称 :" prop="name">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.name">
                            </el-input>
                            （必填，不超过10个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="存放地址 :">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.input2">
                            </el-input>
                            （选填，不超过30个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="介绍 :">
                            （选填，不超过350个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-input
                            class="textareaheight"
                            type="textarea"
                            placeholder="请填写介绍，不超过350个字符"
                            v-model="ruleForm.introduction"
                            maxlength="350"
                            :rows="4"
                            style="margin-bottom: 16px;"
                            show-word-limit
                    >
                    </el-input>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="地图位置 :">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="中心点描点"></el-radio>
                                <el-radio label="中心点坐标"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label=" ">
                            <el-button type="primary" size="small">开始选点</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="中心的坐标 :">
                            经度： <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
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
                </el-row>
            </el-form>

            <el-row type="flex" class="row-bg" style="margin-top: 30px">
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-row>
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
                labelnamechange:'',
                groupId:'',
                locations:'',
                introduction:'',
                resNumber:null,//车位和厕位
                lng:null, //经度
                lat:null, //维度
                input2:'',
                value:'',
                resource:'',
                picPath:[{path:""},{path:""},{path:""}]
            },
            picPath1:'',//图片的123
            picPath2:'',
            picPath3:'',
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                groupId:[
                    { required: true, message: '请选择区域分组', trigger: 'change' }
                ],
                locations: [
                    { required: true, message: '请选择地图位置', trigger: 'change' }
                ],
                introduction:[
                    { required: true, message: '请输入介绍内容', trigger: 'change' }
                ]
            },
            textarea:'',
            areaNameoptions:[],
            labelname:'',
            labelPosition:'right',
            audios:''
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
                path:'/resourceEquipmentManagement/equipmentManagement'
            })
        },
        changegroupName () {
            // this.areaNameoptions.forEach(item => {
            //     if(item.groupName == this.ruleForm.groupName) {
            //         this.groupId = item.groupId
            //     }
            // })
        },
        //音频上传
        handleAvatarSuccessaudio (res) {
            this.audios = res.url
        },
        beforeAvatarUploadaudio(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'mp3'
            if(!extension){
                this.$message({
                    message:"上传文件只能是mp3格式！",
                    type:'error'
                })
            }
            return extension
        },
        //以下是图片上传
        //上传后
        handleAvatarSuccess1 (res) {
            this.picPath1 = res.url    //browser  上传jpeg的时候后端有问题
        },
        handleAvatarSuccess2 (res) {
            this.picPath2 = res.url
        },
        handleAvatarSuccess3 (res) {
            this.picPath3 = res.url
        },
        //上传前
        beforeAvatarUpload(file) {
            let flag = false
            if(file.type == 'image/jpeg') {
                flag = true
            }else if (file.type == 'image/png'){
                flag = true
            }else if (file.type == 'image/bmp') {
                flag = true
            }else  if (file.type == 'image/jpg') {
                flag = true
            }else{
                flag = false
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!flag) {
                this.$message.error('上传头像图片只能是 JPG,PNG,BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return flag && isLt2M ;
        },
        handleRemove(file, fileList) {
            // (file, fileList);
        },
        handlePreview(file) {
            // console.log(file);
        },
        handleExceed(files, fileList) {
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${ file.name }？`);
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
        baseinfoInfo () {
            baseinfoInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    let datas = res.data.data
                    this.ruleForm = res.data.data

                    if(datas.picPath && datas.picPath.length>0) {
                        if(datas.picPath.length == 1) {
                            this.picPath1 = datas.picPath[0].path
                        }else if(datas.picPath.length == 2) {
                            this.picPath1 = datas.picPath[0].path
                            this.picPath2 = datas.picPath[1].path
                        }else if(datas.picPath.length == 3) {
                            this.picPath1 = datas.picPath[0].path
                            this.picPath2 = datas.picPath[1].path
                            this.picPath3 = datas.picPath[2].path
                        }
                    }
                }
            })
        },
        //编辑
        baseinfoUpdate () {
            let picturesLists = [{path:''},{path:''},{path:''}]
            picturesLists[0].path = this.picPath1
            picturesLists[1].path = this.picPath2
            picturesLists[2].path = this.picPath3

            let data = {
                organizationId:1,
                name:this.ruleForm.name, //名称
                moduleType:2, //设备/资源类型 1：设备 2：资源
                layerTypeId:12,//关联图层类型
                lng:this.ruleForm.lng, //经度    以下暂时写死
                lat:this.ruleForm.lat, //维度
                address:'', //地址（资源独有）
                phoneNumber:null, //电话（资源独有）
                resNumber:null,//资源内设数量（如：停车场车位数，卫生间厕位数）（资源独有）
                introduction:this.ruleForm.introduction,//资源介绍（资源独有）
                streamUrl:null,//监控视频流（视频监控独有）
                groupId:this.ruleForm.groupId,//区域分组ID
                picturesList:picturesLists,//资源图片（资源独有且至少有1张图片）
                audio:null,//景点语音（景点独有）
            }
            let ids = this.$route.query.id
            baseinfoUpdate(ids,data).then(res => {
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
        baseinfoInsert () {
            let picturesLists = [{path:''},{path:''},{path:''}]

            picturesLists[0].path = this.picPath1
            picturesLists[1].path = this.picPath2
            picturesLists[2].path = this.picPath3


            let data = {
                organizationId:1,
                name:this.ruleForm.name, //名称
                moduleType:2, //设备/资源类型 1：设备 2：资源
                layerTypeId:12,//关联图层类型
                lng:this.ruleForm.lng, //经度    以下暂时写死
                lat:this.ruleForm.lat, //维度
                address:'', //地址（资源独有）
                phoneNumber:null, //电话（资源独有）
                resNumber:this.ruleForm.resNumber,//资源内设数量（如：停车场车位数，卫生间厕位数）（资源独有）
                introduction:this.ruleForm.introduction,//资源介绍（资源独有）
                streamUrl:null,//监控视频流（视频监控独有）
                groupId:this.ruleForm.groupId,//区域分组ID
                picturesList:picturesLists,//资源图片（资源独有且至少有1张图片）
                audio:null,//景点语音（景点独有）
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
                organizationId:1,
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
    .uploadimgs {
        width: 75%;
        height: 200px;
        display: inline-block;
        margin-top: 10px;
        text-align:center;
        border: 1px solid #e9ebec
    }
    .uploadimgs img{
        width: 100%;
        height: 100%;
    }
</style>
