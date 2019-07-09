<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

                <el-col :span="24">
                    <el-form-item label="图层名称 :" prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                maxlength="10"
                                v-model="ruleForm.name">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="关联 :" prop="id">
                        <el-select v-model="ruleForm.id" clearable placeholder="请选择" size="medium"  class="customized_input" @change="changetype(ruleForm.id)">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="ruleForm.id_er" clearable placeholder="请选择" size="medium" style="margin-left: 10px" class="customized_input">
                            <el-option
                                    size="medium"
                                    v-for="item in options2"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" style="height: 140px">
                    <el-form-item label="图层Icon :" prop="iconPath">
                        <el-upload

                                action="http://61.174.54.85:8001/nv2/image/upload"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                 :on-exceed="handleExceed"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                        >

                            <el-button size="small" type="primary">选择文件</el-button>

                            <!-- <el-input v-model="ruleForm.iconPath" type="hidden"></el-input> -->
                            <div slot="tip" style="display: inline-block">
                                <el-input
                                    size="medium"
                                    placeholder="未选择任何文件"
                                    class="customized_input"
                                    style="margin: 0 10px 0 10px"
                                    hidden
                                    v-model="ruleForm.iconPath">
                                </el-input>
                            </div>
                        </el-upload>
                       

                    </el-form-item>

                </el-col>
            </el-form>
            <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
            <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
        </div>



    </div>

</template>

<script>
    import {layerInfo,layerInsert,layertypeListbyparentid} from '@/api/mapManagement/map.js'
import { log } from 'util';
export default {
    data() {
        return {
            ruleForm:{
                name:'',
                id:'',
                id_er:'',
                iconPath:'',

            },
            layerTypeId:'',
            options:[],
            options2:[],
            types:0,
            parentId:0,
            parentId_er:null,
            rules:{
                name: [
                    { required: true, message: '请输入图层名称', trigger: 'blur' },
                ],
                id:[
                    { required: true, message: '请选择关联', trigger: 'change' }
                ],
                iconPath: [
                    { required: true, message: '请选择图层ICON', trigger: 'change' }
                ],

            }
        }
    },
    created() {

        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加图层'
        }else {
            this.$route.meta.title = '编辑图层'
            this.layerInfo()
        }
        this.layertypeListbyparentid()
    },
    methods: {
        goback () {
          this.$router.push({
              path:'/mapManagement/mapManagementLayer'
          })
        },
        handleRemove() {
          
        },
        handlePreview() {
     
        },
        handleExceed() {
           
        },
        beforeRemove() {
            
        },
        //上传后
        handleAvatarSuccess (res) {
            // this.imageUrl = res.browser
            console.log(res)
            this.ruleForm.iconPath = res.url
            console.log(this.ruleForm.iconPath)
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
        //保存
        layerInsert () {
            let data = {
                name:this.ruleForm.name,
                moduleType:this.$route.query.moduleType,
                layerTypeId:this.ruleForm.id_er?this.ruleForm.id_er:this.ruleForm.id,
                iconPath:this.ruleForm.iconPath,
                organizationId:1,
            }
            layerInsert(data).then(res => {
                if(res.data.code == 200) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.goback()
                }

            }).catch( error => {
                this.$message('添加失败！');
                console.log(error);
            })
        },
        //第一级改变的
        changetype (id) {
            this.ruleForm.id_er = ''
            this.parentId_er = id
            this.layertypeListbyparentid_er()
        },
        //关联第一级
        layertypeListbyparentid () {
            let data = {
                parentId:this.parentId
            }
             layertypeListbyparentid(data).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.options = data

                }
            })
        },
        //关联第二级
        layertypeListbyparentid_er () {
            let data = {
                parentId:this.parentId_er
            }
             layertypeListbyparentid(data).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.options2 = data
                }
            })
        },
        //查看的
        layerInfo () {

            layerInfo(this.$route.query.id).then(res => {
                if (res.data.code == 200) {
                    let data = res.data.data
                    this.ruleForm = data
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //成功的
                    this.layerInsert()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
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
