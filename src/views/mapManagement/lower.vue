<template>
    <div class="lower">
        <div style="font-size: 14px;margin-bottom: 20px;box-sizing: border-box;padding: 0 0 0 20px;">关键词：
            <el-input v-model="input" style="width: 300px" size="medium" placeholder="请输入关键词进行搜索"></el-input>
            <el-button size="medium" type="primary">主要按钮</el-button>
            <el-button size="medium" style="float: right" type="warning">添加图层</el-button>
        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {
            input:'',
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
