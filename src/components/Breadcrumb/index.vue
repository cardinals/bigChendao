<template>
<div class="box" v-if="$route.path !== '/console' ">
    <el-breadcrumb  class="app-breadcrumb" separator-class="el-icon-arrow-right" ondragstart="return false;" oncontextmenu="return false;">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
  data() {
    return {
        levelList: null,
        actives:true
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
        let matched = this.$route.matched
        this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .box {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding:  0 20px 0 20px;
    }
  .app-breadcrumb.el-breadcrumb {
    width: 100%;
    font-size: 14px;
    line-height: 45px;
      border-bottom:  1px solid #cdd1dc;

    .no-redirect {
      color: #606266;
      cursor: text;
    }
  }

  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
