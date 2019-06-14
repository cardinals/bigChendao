<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="140px">

                <el-col :span="24">
                    <el-form-item label="事件名称 :">
                        /
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属事件分组 :">
                        /
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生时间 :">
                        /
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生地 :">
                        /
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="发生地点位置 :">
                        map位置
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件状态 :">
                        /
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="完结描述 :">
                        /
                    </el-form-item>
                </el-col>

                <div>
                    <el-col :span="24">
                        <el-form-item label="人工处置 :">
                            /
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="发送对象 :">
                            <span @click="seeclick" style="color: #1890ff;cursor: pointer">查看</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="处置人 :">
                            admin
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="处置时间 :">
                            2018－09－08  12：13：45
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="完结时间 :">
                            2018－09－08  12：13：45
                        </el-form-item>
                    </el-col>
                </div>

            </el-form>
            <el-button type="info" class="gobacking" @click="goback" size="small">返回</el-button>
        </div>
        <sendobject ref="sencobject"></sendobject>
    </div>

</template>

<script>
import sendobject from '@/components/messageBox/sendobject.vue'

export default {
    components: {
        sendobject,
    },
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
        seeclick() {
            this.$refs.sencobject.show(1)
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
