<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form v-if="labelname !== '应急物资'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px">
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
                        <el-form-item :label="labelname + '名称 :'">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    class="customized_input"
                                    v-model="ruleForm.input2">
                            </el-input>
                            （必选,不超过30个字符）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                        <el-form-item label="所属区域分组 :" prop="labelnamechange">
                            <el-select v-model="ruleForm.labelnamechange" clearable placeholder="请选择" size="medium"  class="customized_input">
                                <el-option
                                        size="medium"
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
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
                            （必选）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="12">
                        <el-form-item :label="labelname + '介绍 :'" prop="textarea">
                            <el-input style="display: none" v-model="ruleForm.textarea"></el-input>
                            （必填，不超过350个字符）
                        </el-form-item>
                    </el-col>
                    <el-col v-if="labelname == '景点'" :span="12">
                        <el-form-item label="上传语音 :">
                            <el-upload
                                    class="upload-demos"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    style="display: inline-block;"
                                    :limit="3"
                                    :on-exceed="handleExceed"
                            >

                                <el-button size="small" type="primary">选择文件</el-button>
                                <div slot="tip" style="display: inline-block">
                                    <el-input
                                            size="medium"
                                            placeholder="未选择任何文件"
                                            class="customized_input"
                                            style="margin: 0 10px 0 10px"
                                            v-model="ruleForm.input2">
                                    </el-input>
                                    <el-button size="small" type="primary">上传</el-button>
                                    （选填，支持MP3格式）
                                </div>
                            </el-upload>

                        </el-form-item>
                    </el-col>
                    <el-col v-if="labelname == '游客中心'" :span="12">
                        <el-form-item label="总车位数 :">
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
                            v-model="ruleForm.textarea"
                            maxlength="350"
                            :rows="4"
                            style="margin-bottom: 16px;"
                            show-word-limit
                    >
                    </el-input>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="地图位置 :" prop="locations">
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
                <el-row type="flex" class="row-bg">
                    <div class="mapchanges">
                        <!--图片-->
                    </div>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="8">
                        <el-form-item label="上传图片（第一张） :">
                            （必填，支持PNG、JPG、BMP）
                        </el-form-item>
                        <el-upload
                                class="upload-demos"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-exceed="handleExceed"
                        >

                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" style="display: inline-block">
                                <el-input
                                        size="medium"
                                        placeholder="未选择任何文件"
                                        class="customized_input"
                                        style="margin: 0 10px 0 10px"
                                        v-model="ruleForm.input2">
                                </el-input>
                                <el-button size="small" type="primary">上传</el-button>
                            </div>

                        </el-upload>

                        <div class="uploadimgs" >
                            <img src=""/>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传图片（第二张） :">
                            （支持PNG、JPG、BMP）
                        </el-form-item>
                        <el-upload
                                class="upload-demos"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-exceed="handleExceed"
                        >

                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" style="display: inline-block">
                                <el-input
                                        size="medium"
                                        placeholder="未选择任何文件"
                                        class="customized_input"
                                        style="margin: 0 10px 0 10px"
                                        v-model="ruleForm.input2">
                                </el-input>
                                <el-button size="small" type="primary">上传</el-button>
                            </div>
                        </el-upload>

                        <div class="uploadimgs" >
                            <img src=""/>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="上传图片（第三张） :">
                            （支持PNG、JPG、BMP）
                        </el-form-item>
                        <el-upload
                                class="upload-demos"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                style="display: inline-block;"
                                :limit="1"
                                :on-exceed="handleExceed"
                        >

                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" style="display: inline-block">
                                <el-input
                                        size="medium"
                                        placeholder="未选择任何文件"
                                        class="customized_input"
                                        style="margin: 0 10px 0 10px"
                                        v-model="ruleForm.input2">
                                </el-input>
                                <el-button size="small" type="primary">上传</el-button>
                            </div>
                        </el-upload>
                        <div class="uploadimgs" >
                            <img src=""/>
                        </div>
                    </el-col>

                </el-row>
            </el-form>
            <el-form v-else ref="form" :model="form" label-width="125px">
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="所属区域分组 :">
                            <el-select v-model="ruleForm.value" clearable placeholder="请选择" size="medium">
                                <el-option
                                        size="medium"
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            （必填）
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" class="row-bg">
                    <el-col :span="24">
                        <el-form-item label="指挥物资名称 :">
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    style="width: 180px"
                                    v-model="ruleForm.input2">
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
                                    style="width: 180px"
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
                            v-model="textarea"
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
                                style="width: 180px"
                                v-model="ruleForm.input2">
                        </el-input>
                            纬度：
                            <el-input
                                    size="medium"
                                    placeholder="请输入内容"
                                    style="width: 180px"
                                    v-model="ruleForm.input2">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-row type="flex" class="row-bg" style="margin-top: 10px">
                <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 完成 </el-button>
            </el-row>
        </div>



    </div>

</template>

<script>
export default {
    data() {
        return {
            ruleForm:{
                name:'',
                labelnamechange:'',
                locations:'',
                textarea:'',
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
                textarea:[
                    { required: true, message: '请输入介绍内容', trigger: 'blur' }
                ]
            },
            textarea:'',
            options:[],
            labelname:'',
            labelPosition:'right'
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
                path:'/resourceEquipmentManagement/equipmentManagement'
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
    .uploadimgs {
        width: 75%;
        height: 250px;
        display: inline-block;
        margin-top: 10px;
        text-align:center;
        border: 1px solid #e9ebec
    }
</style>
