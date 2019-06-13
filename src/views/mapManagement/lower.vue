<template>
    <div class="lower" style="font-size: 16px;box-sizing: border-box;padding: 0 0 0 20px;">
        <!--<div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">关键词：-->
            <!--<el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>-->
            <!--<el-button size="medium" type="primary">主要按钮</el-button>-->
            <!--<el-button size="medium" style="float: right" type="warning">添加图层</el-button>-->
        <!--</div>-->
        <div style="box-sizing: border-box">


        <el-form ref="form" :model="form" label-width="200px">
                <el-col :span="20">
                    <el-form-item label="选择地图源 :">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="百度地图"></el-radio>
                            <el-radio label="高德地图"></el-radio>
                            <el-radio label="天地图"></el-radio>
                            <el-radio label="其他其他"></el-radio>
                        </el-radio-group>
                        （必选）
                    </el-form-item>
                </el-col>


                <el-col :span="20">
                    <el-form-item label="地图图层选择（第一步）:">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="2D地图" name="type"></el-checkbox>
                            <el-checkbox label="影像图" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-col :span="20">
                    <el-form-item label="地图控件选择（第二步）:">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="缩放控件" name="type"></el-checkbox>
                            <el-checkbox label="影像图" name="type"></el-checkbox>
                            <el-checkbox label="比例尺控件" name="type"></el-checkbox>
                            <el-checkbox label="测量控件" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-col :span="20">
                    <el-form-item label="显示级别选择（第三步）:">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="级别9"></el-radio>
                            <el-radio label="级别11"></el-radio>
                            <el-radio label="级别13"></el-radio>
                            <el-radio label="级别15"></el-radio>
                        </el-radio-group>
                        （必选）
                    </el-form-item>
                </el-col>

                <el-col :span="20">
                    <el-form-item label="设置地图中心点（第四步）:">
                        <el-button type="primary" size="small">选择中心</el-button>
                    </el-form-item>
                </el-col>

        </el-form>
        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {
            input:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    }
}
</script>

<style scoped>
    .layer {
        box-sizing: border-box;
        padding:0 56px 0 0;
    }
</style>
