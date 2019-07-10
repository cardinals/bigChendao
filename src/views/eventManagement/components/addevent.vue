<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="140px">

                <el-col :span="24">
                    <el-form-item label="事件名称 :" prop="eventName">
                        <el-input
                                size="medium"
                                placeholder="请填写事件名称"
                                class="customized_input"
                                v-model="ruleForm.eventName">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件描述 :" >
                        <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写事件描述"
                                v-model="ruleForm.eventDescription"
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
                    <el-form-item label="所属事件分组 :" prop="groupName">
                        <el-select v-model="ruleForm.groupName"  class="customized_input" placeholder="请选择事件分组" size="medium" >
                            <el-option
                                    v-for="item in eventgroupAllLists"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生时间 :">
                        <el-date-picker
                                v-model="ruleForm.datas"
                                size="medium"
                                class="customized_input"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        <el-time-picker
                                style="margin-left: 10px"
                                class="customized_input"
                                v-model="ruleForm.times"
                                size="medium"
                                value-format="HH:mm:ss"
                                placeholder="选择时间">
                        </el-time-picker>

                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件发生地 :" prop="eventAddr">
                        <el-input
                                size="medium"
                                placeholder="请输入事件发生地"
                                class="customized_input"
                                v-model="ruleForm.eventAddr">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="所属区域分组 :" prop="areagroupId">
                        <el-select v-model="ruleForm.areagroupId" clearable placeholder="请选择所属区域分组" size="medium"  class="customized_input" >
                            <el-option
                                    size="medium"
                                    v-for="item in areaNameoptions"
                                    :key="item.groupId"
                                    :label="item.groupName"
                                    :value="item.groupId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="选择发生地点位置 :">
                        map位置（后面举例）
                        <el-input
                                size="medium"
                                placeholder="请输入经度"
                                class="customized_input"
                                v-model="ruleForm.lng">
                        </el-input>
                        <el-input
                                style="margin-left: 10px"
                                size="medium"
                                placeholder="请输入纬度"
                                class="customized_input"
                                v-model="ruleForm.lat">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="事件状态 :" prop="eventState">
                        <el-select v-model="ruleForm.eventState"  class="customized_input" placeholder="请选择事件状态" size="medium" >
                            <el-option
                                    v-for="item in eventStateoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="完结描述 :">
                        <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写事件描述"
                                v-model="ruleForm.endDescription"
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

    import { eventmanagementInsert ,eventgroupAllList,areagroupGroupalllist} from "@/api/eventManagement/event.js";

    export default {
    data() {
        return {
            value: '',
            areaNameoptions:[],
            ruleForm:{
                eventName:'',
                eventDescription:'',
                groupName:'',
                datas:'',
                times:'',
                areagroupId:'',
                eventAddr:'',
                eventState:'',
                endeventDescription:'',
                lng:'',
                lat:''
            },
            eventStateoptions:[{id:0,name:'待处理'},{id:1,name:'处置中'},{id:2,name:'已完结'}],
            eventgroupAllLists:[],//事件分组
            rules: {
                eventName: [
                    { required: true, message: '请输入事件名称', trigger: 'blur' },
                ],
                groupName: [
                    { required: true, message: '请选择所属事件分组', trigger: 'change' }
                ],
                areagroupId: [
                    { required: true, message: '请选择所属区域分组', trigger: 'change' }
                ],
                eventAddr: [
                    { required: true, message: '请输入事件发生地', trigger: 'blur' }
                ],
                eventState: [
                    { required: true, message: '请选择事件状态', trigger: 'change' }
                ],
            },
            options:[],
        }
    },
    created() {
        this.eventgroupAllList()
        this.areagroupGroupalllist()
    },
    methods: {
        goback () {
            this.$router.go(-1)
        },
        //获取事件分组
        eventgroupAllList () {
            let data = {
                organizationId : 1,
            }
            eventgroupAllList(data).then(res => {
                if(res.data.code == 200) {
                    this.eventgroupAllLists = res.data.data
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
        //新增
        eventmanagementInsert () {

            let dataTIme = this.ruleForm.datas + ' ' + this.ruleForm.times
            let groupNames = ''
            this.eventgroupAllLists.forEach(item => {
                if(item.groupId == this.ruleForm.groupName) {
                    groupNames = item.groupName
                }
            })
            let areaName = ''
            this.areaNameoptions.forEach(item => {
                if(item.groupId == this.ruleForm.areagroupId) {
                    areaName = item.groupName
                }
            })

            let data = {
                eventName:this.ruleForm.eventName,	                //	事件名称
                eventAddr:this.ruleForm.eventAddr,	                //	事件地点
                eventDescription:this.ruleForm.eventDescription,	//	事件描述/事件名称
                eventState:this.ruleForm.eventState,	            //	事件状态，0：待处理；1：处置中；2：已完结
                endDescription:	this.ruleForm.endDescription,       //	完结描述，如是假事件，取消警报的，则是取消警报描述
                happenedTime:dataTIme,                              //  事件发生时间
                lng: this.ruleForm.lng ,                            //  经度 暂时木有
                lat	: this.ruleForm.lat,                            //  维度
                eventType:0,                                        //	事件类型，0：人工录入；1：设备录入
                sendPeopleId:null,	                                //	短信接收人ID(t_address_book.addr_book_id)
                message:null,                                       //	短信内容
                groupId:this.ruleForm.groupName,                    //	所属分组ID
                groupName:groupNames,                               //	所属分组名称
                organizationId:1,	                                //	组织ID
                areaId:this.ruleForm.areagroupId,                   //  区域id
                areaName:areaName                                   //  区域名称
            }
            eventmanagementInsert(data).then(res => {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.eventmanagementInsert()
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
</style>
