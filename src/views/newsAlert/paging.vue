<template>
  <div class="pagingBox">
    <div class="every cc" v-for="(item, index) in pagings" :key="index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagings: ['1/8页', '首页', '上一页', '下一页']
    }
  }
}
</script>

<style lang="less" scoped>
  .pagingBox {
    color: #ffffff;
    width: 92%;
    height: 10%;
    // background: seagreen;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .every {
      width: 6%;
      height: 100%;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    .every:active {
      color: #66afc7;
    }
  }
</style>
