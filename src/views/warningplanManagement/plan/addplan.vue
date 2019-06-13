<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 20px">
                <el-step title="填写预案信息"></el-step>
                <el-step title="设置处置方式"></el-step>
            </el-steps>

            <el-form v-if="active == 1" :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">
                <el-col :span="24">
                    <el-form-item label="事件分组 :" prop="mailList">
                        <el-select v-model="ruleForm.mailList"  class="customized_input" placeholder="所有区域分组" size="medium" >
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
                    <el-form-item label="预案名称 :" prop="name">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.input2">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="预案内容 :" prop="textarea">
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
                        （必填，不超过350个字符）
                    </el-form-item>
                </el-col>

                <el-col :span="24" style="text-align: center">
                    <el-button type="warning" class="successing" @click="submitForm('ruleForm')"  size="small"> 下一步 </el-button>
                </el-col>
            </el-form>

            <el-form v-if="active == 2" :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="短信内容 :">
                            <el-input
                                    class="textareaheight"
                                    type="textarea"
                                    placeholder="请填写介绍，不超过350个字符"
                                    v-model="ruleForm.textarea"
                                    maxlength="350"
                                    :rows="4"
                                    style="margin-bottom: 16px;width: 75%;"
                                    show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <div style="text-align: left">
                            <el-transfer
                                    style="text-align: left; display: inline-block"
                                    v-model="value4"

                                    :left-default-checked="[]"

                                    :titles="['请选择短信接收人员', '已选择短信接收人员']"

                                    :format="{
                                        noChecked: '${total}',
                                        hasChecked: '${checked}/${total}'
                                    }"
                                    @change="handleChange"
                                    :data="data">
                                <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>

                            </el-transfer>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;margin-top: 100px">
                        <el-button type="warning" class="successing" @click="previous" size="small">上一步</el-button>
                        <el-button type="primary" class="successing" @click="submitForm('ruleForm')"  size="small">提交</el-button>
                    </el-col>
                </el-row>
            </el-form>

        </div>



    </div>

</template>

<script>
export default {
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    // disabled: i % 4 === 0
                });
            }
            return data;
        };
        return {
            active: 1,
            ruleForm:{
                name:'',
                mailList:'',
                textarea:'',
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
            labelname:'',
            labelPosition:"right",

            data: generateData(),

            value: [],
            value4: [],
            renderFunc(h, option) {
                return <span>{ option.key } - { option.label }</span>;
            }
        }
    },
    created() {
        if(this.$route.query.type === 1) {
            this.$route.meta.title = '添加' + this.$route.query.name
        }else {
            this.$route.meta.title = '编辑' + this.$route.query.name
        }
        this.labelname = this.$route.query.name
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/locationManagement/personnelManagement'
            })
        },
        next() {
            this.active = this.active + 1
        },
        previous () {
            this.active = this.active - 1
        },
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },
        submitForm(formName) {
            this.next()
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
