<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="140px">

                <el-col :span="24">
                    <el-form-item label="事件名称 :">
                        <el-input
                                size="medium"
                                placeholder="请填写事件名称"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件描述 :">
                        <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写事件描述"
                                v-model="ruleForm.textarea"
                                maxlength="200"
                                :rows="4"
                                style="width: 50%;"
                                show-word-limit
                        >
                        </el-input>
                        （必填，不超过20个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属事件分组 :" prop="mailList">
                        <el-select v-model="ruleForm.mailList"  class="customized_input" placeholder="分组" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生时间 :">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                        <el-time-picker
                                style="margin-left: 10px"
                                class="customized_input"
                                v-model="value"
                                size="medium"
                                placeholder="选择时间">
                        </el-time-picker>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生地 :">
                        <el-input
                                size="medium"
                                placeholder="请输入事件发生地"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="选择发生地点位置 :">
                        map位置
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件状态 :" prop="mailList">
                        <el-select v-model="ruleForm.mailList"  class="customized_input" placeholder="待处理" size="medium" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件描述 :">
                        <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写事件描述"
                                v-model="ruleForm.textarea"
                                maxlength="300"
                                :rows="4"
                                style="width: 50%;"
                                show-word-limit
                        >
                        </el-input>
                        （必填，不超过300个字符）
                    </el-form-item>
                </el-col>
            </el-form>
            <el-button type="info" class="gobacking" @click="goback" size="small">返回</el-button>
            <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small">提交</el-button>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            value: '',
            ruleForm:{
                input2:'',
                value:'',
                textarea:''
            },
            rules: {
                name: [
                    { required: true, message: '请选择事件分组', trigger: 'change' },
                ],
                mailList: [
                    { required: true, message: '请输入事件名称', trigger: 'blur' }
                ],
                textarea: [
                    { required: true, message: '请输入预案内容', trigger: 'change' }
                ],
            },
            options:[],
        }
    },
    created() {

    },
    methods: {
        goback () {
            this.$router.go(-1)
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
