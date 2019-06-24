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
                        <div style="text-align: left" class="transferdata">
                            <div class="right-main">
                                <div class="right-left-main">
                                    <span style="font-weight: 600;font-size: 16px;padding-left: 12px;padding-right: 12px">请选择分组</span>
                                    <el-select v-model="addressGroupId" style="width: 120px;margin-top: 5px" size="medium" placeholder="请选择分组" @change="addressGroupIdSeleceChanged">
                                        <el-option
                                                v-for="item in addressGroup"
                                                :key="item.groupId"
                                                :label="item.groupName"
                                                :value="item.groupId"/>
                                    </el-select>
                                    <div class="select-con">
                                        <el-checkbox class="select-options" v-for="(item, index) of addressGList" :key="index" v-model="item.checked" @change="checkSelectAdd(item)">{{ item.name }}</el-checkbox>
                                    </div>
                                </div>
                                <div style="float: left;width: 50px;height: 100%;text-align: center;margin-top: 180px">
                                    <i class="el-icon-right" style="display: block"></i>
                                    <i class="el-icon-right"></i>
                                </div>
                                <div class="right-right-main">
                                    <!--<div v-for="(item, index) of addressListCheckList" :key="index" class="tab-item">-->
                                        <!--<span class="name ellipsis">{{ item.name }}</span >-->
                                        <!--<i class="el-icon-close" @click="deleteAddress(item)"></i>-->
                                    <!--</div>-->
                                    <div v-for="(item, index) of addressGrouplist" :key="index" class="tab-item">
                                        <p v-if="item.itemlist.length>0">{{item.groupName}}</p>
                                        <div style="box-sizing: border-box;padding-left: 20px" v-for="(items) of item.itemlist">
                                            <span class="name ellipsis">{{ items.name }}</span >
                                            <i class="el-icon-close" @click="deleteAddress(items)"></i>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center;margin-top: 100px">
                        <el-button type="warning" class="successing" @click="previous" size="small">上一步</el-button>
                        <el-button type="primary" class="successing" @click="submitForms()"  size="small">提交</el-button>
                    </el-col>
                </el-row>
            </el-form>

        </div>
        <planobject ref="planobject" @changeplanobject="changeplanobject"></planobject>
    </div>

</template>

<script>
    import { emergencyplanInfo, emergencyplanSave,eventgroupallList, deptgroupallList, addressbookgroupalllist} from "@/api/warningplanManagement/warningplan.js";
    import planobject from '@/components/messageBox/planobject.vue'

    export default {
        components: {
            planobject,
        },
    data() {
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
            addressGrouplist:[],
            addressGroupId:[],
            addressGroup:[],
            addressGList:[],
            listdata:[],
            addressListCheckList:[],
            aa:[]
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
        this.deptgroupallList()
    },
    methods: {
        goback () {
            this.$router.push({
                path:'/warningplanManagement/planManagement'
            })
        },
        changeplanobject () {
            this.emergencyplanSave()
        },
        addressGroupIdSeleceChanged(id) {
            this.listdata = []
            addressbookgroupalllist({
                organizationId: 1,
                deptId: id,
            }).then(res => {
                const result = res.data.data
                for (const item of result) {
                    if (this.hasId(item)) {
                        item.checked = true
                    } else {
                        item.checked = false
                    }
                }
                this.addressGList = result
            })
        },
        hasId(item) {
            for (const i of this.addressListCheckList) {
                if (i.id == item.id) {
                    return true
                }
            }
            return false
        },
        checkSelectAdd(item) {
            if (item.checked == true) {
                this.addressGrouplist.forEach(itemlist => {
                    if(itemlist.groupName == item.deptName) {
                        itemlist.itemlist.push(item)
                    }
                })
                console.log("addressGrouplist",this.addressGrouplist)
                this.addressListCheckList.push(item)
            } else {
                this.deleteAddress(item)
            }

        },
        deleteAddress(item) {
            // this.addressListCheckList = this.addressListCheckList.filter(i => {
            //     return i.id !== item.id
            // })
            //
            // console.log(item)

           this.addressGrouplist.forEach(itemlist => {
                if(itemlist.groupName == item.deptName) {
                    itemlist.itemlist.forEach( (itemdatalist,index) => {
                        if(itemdatalist.id == item.id) {
                            itemlist.itemlist.splice(index,1)
                        }
                    })
                }
                return this.addressGrouplist
            })
            console.log(this.addressGrouplist)

            for (const j of this.addressGList) {
                if (j.id == item.id) {
                    j.checked = false
                }
            }
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
            this.submitForm()
        },
        //查询
        emergencyplanInfo () {
            emergencyplanInfo(this.$route.query.id).then(res => {
                if(res.data.code == 200) {
                    this.ruleForm = res.data.data
                }
            })
        },
        //获取部门分组
        deptgroupallList () {
            deptgroupallList({organizationId:1}).then(res => {
                if(res.data.code == 200) {
                    this.addressGroup = res.data.data
                    this.addressGrouplist = res.data.data

                    this.addressGrouplist.forEach(item => {
                        item.itemlist = []
                    })
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
                    this.next()
                    // this.$refs.planobject.show(this.ruleForm)
                    // this.emergencyplanSave()
                } else {
                    return false;
                }
            });
        },
        submitForms () {
            this.$refs.planobject.show(this.ruleForm)
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

     .topchangetransfer .el-transfer-panel__footer{

     }
    .right-main {
        width: 100%;
    }
    .right-left-main {
        width: 250px;
        height: 330px;
        float: left;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }
    .right-right-main {
        box-sizing: border-box;
        padding: 10px;
        float: left;
        width: 250px;
        height: 330px;
        border: 1px solid #DCDFE6;
        font-size: 14px;
    }
    .right-right-main .name {
        width: 150px;

        display: inline-block;
    }
    .select-con{
        box-sizing: border-box;
        padding: 5px 10px;
    }
    .select-con .select-options{
        display: block;
    }
</style>
