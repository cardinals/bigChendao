<template>
<!-- 此组件 名字 宽高是自定义接口 -->
  <div class="titleModule" :style="{ width: width, height: height }">
    <div class="leftLine">
      <p class="ld1"></p>
      <p class="ll1"></p>
      <p class="ld2"></p>
    </div>
    <div class="title">{{ title }}</div>
    <div class="rightLine">
      <p class="rd1"></p>
      <p class="rl1"></p>
      <p class="rd2"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "8%"
    },
    title: {
      type: String,
      default: "事件处理"
    }
  }
}
</script>

<style lang="less" scoped>
  .titleModule {
    background: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftLine {
      width: 38%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .ld1 {
        width: 4px;
        height: 4px;
        background: #17ffff;
        border-radius: 50%;
      }
      .ll1 {
        height: 1px;
        width: 94%;
        background: #023761;
      }
      .ld2 {
        width: 4px;
        height: 4px;
        background: #0a7083;
        border-radius: 50%;
      }
    }
    .title {
      width: 20%;
      font-size: 31px;
      color: #ffffff;
    }
    .rightLine {
      width: 38%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .rd1 {
        width: 4px;
        height: 4px;
        background: #0a7083;
        border-radius: 50%;
      }
      .rl1 {
        height: 1px;
        width: 94%;
        background: #0a6e7f;
      }
      .rd2 {
        width: 4px;
        height: 4px;
        background: #17ffff;
        border-radius: 50%;
      }
    }
  }
</style>
