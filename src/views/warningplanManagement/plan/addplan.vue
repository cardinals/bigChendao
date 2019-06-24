<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 20px">
                <el-step title="填写预案信息"></el-step>
                <el-step title="设置处置方式"></el-step>
            </el-steps>

            <el-form v-if="active == 1" :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">
                <el-col :span="24">
                    <el-form-item label="事件分组 :" prop="groupId">
                        <el-select v-model="ruleForm.groupId"  class="customized_input" placeholder="所有区域分组" size="medium" >
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
                    <el-form-item label="预案名称 :" prop="planName">
                        <el-input
                                size="medium"
                                placeholder="请输入内容"
                                class="customized_input"
                                v-model="ruleForm.planName">
                        </el-input>
                        （必填，不超过10个字符）
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="预案内容 :" prop="content">
                        <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写介绍，不超过350个字符"
                                v-model="ruleForm.content"
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
                    <el-button type="warning" class="successing" @click="nextone()"  size="small"> 下一步 </el-button>
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
                                    v-model="ruleForm.message"
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
                                    class="topchangetransfer"
                                    v-model="value4"

                                    :left-default-checked="[]"

                                    :titles="['请选择短信接收人员', '已选择短信接收人员']"

                                    :format="{
                                        noChecked: '${total}',
                                        hasChecked: '${checked}/${total}'
                                    }"
                                    @change="handleChange"
                                    :data="data">
                                <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
                                <!--<el-select v-model="ruleForm.groupId" slot="left-footer" class="transfer-footer customized_input" placeholder="所有区域分组" size="medium" >-->
                                    <!--<el-option-->
                                            <!--v-for="item in eventgroupAllLists"-->
                                            <!--:key="item.groupId"-->
                                            <!--:label="item.groupName"-->
                                            <!--:value="item.groupId">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->


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
    import { emergencyplanInfo, emergencyplanSave,eventgroupallList} from "@/api/warningplanManagement/warningplan.js";

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
                groupId:'',
                planName:'',
                content:'',
                message:''
            },
            rules: {
                groupId: [
                    { required: true, message: '请选择事件分组', trigger: 'change' },
                ],
                planName: [
                    { required: true, message: '请输入事件名称', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入预案内容', trigger: 'change' }
                ],
            },
            eventgroupAllLists:[],
            labelname:'',
            labelPosition:"right",

            data: generateData(),
            datalist:[{
                type:'领导部',
                list:[{
                    a:'领导部1',b:'领导部2',c:'领导部3'
                }]
            },{
                type:'执法部',
                list:[{
                    a:'执法部1',b:'执法部2',c:'执法部3'
                }]
            },{
                type:'财务部',
                list:[{
                    a:'财务部1',b:'财务部2',c:'财务部3'
                }]
            }],
            value: [],
            value4: [],
            renderFunc(h, option) {
                return <span>{ option.key } - { option.label }</span>;
            }
        }
    },
    created() {
        if(this.$route.query.type == 1) {
            this.$route.meta.title = '添加预案'
        }else {
            this.$route.meta.title = '编辑预案'
            this.emergencyplanInfo()
        }
        this.eventgroupallList()
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/warningplanManagement/planManagement'
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
        nextone() {
            this.next()
        },
        //查询
        emergencyplanInfo () {
            emergencyplanInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
        },
        //获取所有事件分组
        eventgroupallList () {
            eventgroupallList({organizationId:1}).then(res => {
                if(res.data.code == 200) {
                    this.eventgroupAllLists = res.data.data
                }
            })
        },
        //新增
        emergencyplanSave () {
            let groupNames = ''
            this.eventgroupAllLists.forEach(item => {
                if(item.groupId == this.ruleForm.groupId) {
                    groupNames = item.groupName
                }
            })
            let data = {
                organizationId:1,
                id:this.$route.query.type == 1?null:Number(this.$route.query.id),         //Integer	N	预案id（当id!= null时视为修改预案,否则视为新增）
                planName:this.ruleForm.planName,                     //	String	Y	预案名称
                content:this.ruleForm.content,	                    //String	Y	预案内容
                sendPeopleId:'',                //	String	N	短信接收人ID（t_address_book.addr_book_id）
                message:this.ruleForm.message,                     //	String	N	短信内容
                mapDetail:'',                    //	String	N	地图显示内容，人员调度；车辆调度；人员和车辆调度
                groupId:this.ruleForm.groupId,                     //	Integer	Y	所属分组ID
                groupName:groupNames,                   //	String	Y	所属分组名称

            }
            emergencyplanSave(data).then(res => {
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
                    //成功的
                    this.emergencyplanSave()
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

     .topchangetransfer .el-transfer-panel__footer{
         height: 4rem;
         background: #FFF;
         margin: 0;
         padding: 0;
         border-top: 0.1rem solid #EBEEF5;
         position: absolute;
         bottom: 0;
         left: 0;
         width: 100%;
         z-index: 10!important;

         /*bottom: 240px !important;*/
         /*background: red;*/
    }
</style>
