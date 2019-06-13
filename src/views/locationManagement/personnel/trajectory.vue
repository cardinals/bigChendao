<template>
    <div class="addmap">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="120px">
                <div>
                    <span style="margin-right: 20px">姓名：王小小</span>
                    <span>开始时间：</span>
                    <el-date-picker
                            v-model="ruleForm.startday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                    <span style="margin-left: 20px">结束时间：</span>
                    <el-date-picker
                            v-model="ruleForm.endday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                    <span style="margin-left: 20px">播放速度：</span>
                    <el-select v-model="ruleForm.speed" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button style="margin-left: 20px">回访</el-button>
                    <el-button>停止</el-button>
                    <el-button>今天回放</el-button>
                </div>
                <div class="map">
                    <!--地图-->
                </div>
                <div style="margin-top: 20px">
                    <el-button type="info" class="gobacking" @click="goback" size="small"> 返回 </el-button>
                </div>
            </el-form>
        </div>



    </div>

</template>

<script>
    export default {
        data() {
            return {

                ruleForm:{
                    startday:'',
                    endday:'',
                    speed:'',
                },
                rules: {
                    startday: [
                        { required: true, message: '请选择开始时间', trigger: 'change' },
                    ],
                    endday:[
                        { required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    speed: [
                        { required: true, message: '请选择播放速度', trigger: 'change' }
                    ],
                },
                options:[],
                labelname:'',
                labelPosition:"right"
            }
        },
        created() {


        },
        methods: {
            goback () {
                this.$router.push({
                    path:'/locationManagement/personnelManagement'
                })
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

</style>
