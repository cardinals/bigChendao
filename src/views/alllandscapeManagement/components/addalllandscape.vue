<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="130px">

                <el-col :span="24">
                    <el-form-item label="全景名称 :" prop="name">
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
                    <el-form-item label="全景路径 :"  prop="url">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.url">
                        </el-input>
                        （必填，填写全景链接路径）
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="上传全景缩略图 :" prop="thumb">
                        <el-upload
                                action="http://61.174.54.85:8001/nv2/image/upload"
                                :on-remove="handleRemove"
                                :on-preview="handlePreview"
                                :before-remove="beforeRemove"
                                :on-exceed="handleExceed"

                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                style="display: inline-block;height: 90px"
                                :limit="1"
                                multiple

                        >

                            <el-button size="small" type="primary">选择文件</el-button>
                            <!--<div slot="tip" style="display: inline-block">-->
                                <!--<el-input-->
                                <!--size="medium"-->
                                <!--placeholder="未选择任何文件"-->
                                <!--class="customized_input"-->
                                <!--disabled-->
                                <!--style="margin: 0 10px 0 10px"-->
                                <!--v-model="ruleForm.thumb">-->
                                <!--</el-input>-->
                                <!--<el-button size="small" type="primary">上传</el-button>-->
                            <!--</div>-->
                        </el-upload>
                        <div class="uploadimgs" >
                            <img :src="ruleForm.thumb"  alt="" />
                        </div>
                        (支持PNG、JPG、BMP,不超过2M)
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="关联景点 :">
                        <el-select v-model="ruleForm.baseinfoId" clearable placeholder="请选择" size="medium" prop="name"  class="customized_input">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
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
    import { panoramicInfo, panoramicSave,panoramicUpdate, baseinfoallList } from "@/api/alllandscapeManagement/alllandscape.js";

    export default {
        data() {
            return {
                imageUrl:'',
                ruleForm:{
                    name:'',
                    url:'',
                    thumb:'',
                    baseinfoId:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入全景名称', trigger: 'blur' },
                    ],
                    url:[
                        { required: true, message: '请输入全景路径', trigger: 'blur' }
                    ],
                    thumb: [
                        { required: true, message: '请选择地图位置', trigger: 'change' }
                    ],
                    baseinfoId: [
                        { required: true, message: '请关联景点', trigger: 'change' }
                    ],

                },
                options:[],
                labelPosition:"right"
            }
        },
        created() {
            if(this.$route.query.type == 1) {
                this.$route.meta.title = '添加全景'
            }else {
                this.$route.meta.title = '编辑全景'
                this.panoramicInfo()
            }
            this.baseinfoallList ()
        },
        methods: {
            handleRemove() {
                // file, fileList);
            },
            handlePreview () {

            },
            beforeRemove() {

            },
            handleExceed() {

            },
            //上传后
            handleAvatarSuccess (res) {
                // this.imageUrl = res.browser
                this.ruleForm.thumb = res.url
            },
            //上传前
            beforeAvatarUpload(file) {
                let flag = false
                if(file.type === 'image/jpeg') {
                    flag = true
                }else if (file.type === 'image/png'){
                    flag = true
                }else if (file.type === 'image/bmp') {
                    flag = true
                }else {
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
            goback () {
                this.$router.push({
                    path:'/alllandscape/alllandscapeManagement'
                })
            },
            //查看
            panoramicInfo () {
                panoramicInfo(this.$route.query.id).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.data
                        this.ruleForm = data
                    }
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
            //修改
            panoramicUpdate () {
                let data = {
                    name:this.ruleForm.name,
                    url:this.ruleForm.url,
                    thumb:this.ruleForm.thumb,
                    baseinfoId:this.ruleForm.baseinfoId,
                }
                let id = this.$route.query.id
                panoramicUpdate(id,data).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: '编辑成功！',
                            type: 'success'
                        });
                        this.goback()
                    }

                }).catch( error => {
                    this.$message('添加失败！');

                })
            },
            //添加
            panoramicSave () {
                let data = {
                    name:this.ruleForm.name,
                    url:this.ruleForm.url,
                    thumb:this.ruleForm.thumb,
                    baseinfoId:this.ruleForm.baseinfoId,
                    organizationId:1,
                }
                panoramicSave(data).then(res => {
                    if(res.data.code == 200) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.goback()
                    }

                }).catch( error => {
                    this.$message('添加失败！');
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$route.query.type == 1) {
                            this.panoramicSave()
                        }else {
                            this.panoramicUpdate()
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
    .uploadimgs {
        width: 400px;
        height: 250px;
        margin-top: 10px;
        text-align:center;
        border: 1px solid #e9ebec
    }
    .uploadimgs img {
        width: 100%;
        height: 100%;
    }
</style>
