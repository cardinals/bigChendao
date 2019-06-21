<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="140px">

                <el-col :span="24">
                    <el-form-item label="事件名称 :">
                        {{ruleForm.eventName || '/'}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属事件分组 :">
                        {{ruleForm.groupName || '/'}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生时间 :">
                        {{ruleForm.happenedTime || '/'}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生地 :">
                        {{ruleForm.eventAddr || '/'}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="发生地点位置 :">
                        map位置
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件状态 :">
                        {{changeeventState(ruleForm.eventState)}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="完结描述 :">
                        {{ruleForm.endDescription || '/'}}
                    </el-form-item>
                </el-col>

                <div v-if="ruleForm.eventState == 1 || ruleForm.eventState == 2">
                    <el-col :span="24">
                        <el-form-item label="人工处置 :">
                            <span v-if="ruleForm.eventType == 0">人工录入</span>
                            <span v-if="ruleForm.eventType == 1">设备录入</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="发送对象 :">
                            <span @click="seeclick" style="color: #1890ff;cursor: pointer">查看</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="处置人 :">
                            {{ruleForm.userName || '/'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="处置时间 :">
                            {{ruleForm.managementTime || '/'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="ruleForm.eventState == 2">
                        <el-form-item label="完结时间 :">
                            {{ruleForm.endTime || '/'}}
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
    import { eventmanagementInfo, } from "@/api/eventManagement/event.js";
    import sendobject from '@/components/messageBox/sendobject.vue'

export default {
    components: {
        sendobject,
    },
    data() {
        return {
            ruleForm:{},
            rules:{}
        }
    },
    created() {
        this.eventmanagementInfo()
    },
    methods: {
        goback () {
            this.$router.go(-1)
        },
        seeclick() {
            this.$refs.sencobject.show(this.ruleForm.sendPeopleId)
        },
        changeeventState (state) {
            if(state == 0) {
                return '待处理'
            }else if(state == 1) {
                return '处置中'
            }else if(state == 2) {
                return '已完结'
            }else {
                return '/'
            }
        },
        //获取事件id查看
        eventmanagementInfo () {
            eventmanagementInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
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
