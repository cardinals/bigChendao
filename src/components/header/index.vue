<template>
    <div class="header">
        <div class="header_left">
            <img src="@/assets/icon/leftacllback.png" alt="" />
            <span>慧旅云官网</span>
        </div>
        <div class="header_right">

            <el-badge :value="7" class="item">
                <i class="el-icon-message-solid massage"></i>
            </el-badge>

            <span  class="item">
                <i class="el-icon-switch-button clone"/>
            </span>
            <span  class="item">
                <img src="@/assets/icon/user1.png" alt="" />
                <span>小飞怪</span>
             </span>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
    .header {
        height: 80px;
    }
    .header .header_left {
        align-items: center;
        font-size: 18px;
        color: #8E9196;
        display: inline-block;
        line-height: 80px;
        padding-left: 50px;
    }
    .header .header_right {
        float: right;
        margin-top: 20px;
    }
    .header_right .item {
        margin-right: 55px;
    }
    .header_right .item .massage {
        font-size: 28px;
    }
    .header_right .item .clone {
        font-size: 28px;
    }
</style>
