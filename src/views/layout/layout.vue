<template>
    <el-container>
        <el-header height="auto">
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <Menume></Menume>
            </el-aside>
            <el-container style="background: white">
                <el-main>
                    <breadcrumb />
                    <transition name="breadcrumb">
                        <router-view></router-view>
                    </transition>
                </el-main>
                <el-footer height="31px">
                    Copyright ©2019 中国电信股份有限公司浙江分公司 & 浙江省公众信息产业有限公司
                </el-footer>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
    import Header from '@/components/header/index.vue'
    import Menume from '@/components/menu/menu.vue'
    import Breadcrumb from '@/components/Breadcrumb'


export default {
    components: {
        Header,
        Breadcrumb,
        Menume,
    },
    data() {
          return {

          }
    }
};
</script>

<style scoped lang="less">
    .el-header{
        background-color: rgba(241,246,252,1);
    }
    .el-footer {
        text-align: center;
        font-size: 12px;
        color: #999999;
    }

    .el-aside {
        background-color: rgb(241, 246, 252);
    }

    .el-main {

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
