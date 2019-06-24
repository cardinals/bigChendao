<template>
<!-- 此组件 背景图 宽高是自定义接口 -->
  <div
    class="centerCommon"
    :style="{ width: width, height: height, backgroundImage: back }">
    <div class="title cc" :style="{ height: titleHeight, backgroundImage: titleBack, marginBottom: titleBottom }">
      {{ title }}
    </div>
    <div class="slotBox" :style="{ width: slotWidth, height: slotHeight }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "93%"
    },
    height: {
      type: String,
      default: "53%"
    },
    back: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '事件'
    },
    titleHeight: {
      type: String,
      default: '9%'
    },
    slotWidth: {
      type: String,
      default: ""
    },
    slotHeight: {
      type: String,
      default: ""
    },
    titleBottom: {
      type: String,
      default: "2%"
    }
  },
  data() {
    return {
      titleBack: "url(" + require('../../assets/control/titleBack.png') + ")"
    }
  }
}
</script>

<style lang="less" scoped>
  .centerCommon {
    // background: green;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .title {
      width: 31%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .slotBox {
      // background: yellow;
      margin:  auto;
    }
  }
</style>
