<template>
        <el-dialog title="查看发送对像" center class="seedobject" :visible.sync="dialogTableVisible" width="40%" height="500px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="140px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="所属分组 :">
                            {{ruleForm.groupName || '/'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="24">
                        <el-form-item label="编号 :">
                            {{ruleForm.eventName || '/'}}
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="预案名称 :">
                            {{ruleForm.planName || '/'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="预案内容 :">
                            <!-- {{ruleForm.content || '/'}} -->
                             <el-input
                                class="textareaheight"
                                type="textarea"
                                placeholder="请填写介绍，不超过350个字符"
                                v-model="ruleForm.content"
                                :rows="4"
                                style="margin-bottom: 16px;"
                                disabled="true"
                                show-word-limit
                            >
                        </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="短信 :">
                            <!-- {{ruleForm.poplist || '/'}} -->

                             <div v-for="(item, index) of ruleForm.poplist" :key="index" class="tab-item">
                                <span v-if="item.itemlist.length>0">【{{item.groupName}}】</span>

                                <span style="box-sizing: border-box;padding-left: 5px" v-for="(items, index2) of item.itemlist" :key="index2+1000">
                                    <span style="padding-left: 5px">{{ items.name }}</span>
                                </span>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容 :">
                            {{ruleForm.message || '/'}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="text-align: center">
                        <el-button type="warning" class="successing" @click="previous" size="small">取消</el-button>
                        <el-button type="primary" class="successing" @click="submitForm('ruleForm')"  size="small">确认提交</el-button>
                    </el-col>
                </el-row>

            </el-form>
        </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            ruleForm:{},
            rules:{},
            dialogTableVisible:false,
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            page:1,
            limit:10,
            total:0,
        }
    },
    created() {

    },
    methods: {
        show (data) {
            this.dialogTableVisible = true
            this.ruleForm = data

            console.log(this.ruleForm)
        },
        previous () {
            this.dialogTableVisible = false
        },
        submitForm () {
            this.$emit('changeplanobject')
        }
    }
}
</script>

<style scoped>

</style>
