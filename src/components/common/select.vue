<template>
  <div class="selectBox" :style="{ width: width, height: height }">
    <div class="show" @click="pointer">
      <div class="text">{{ defaultText }}</div>
      <div class="jiao" :style="{ backgroundImage: jiaoBack }"></div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="hidden" v-if="isClick">
        <div class="hiddenItem" v-for="(item, index) in list" :key="index" @click="selectOption">{{ item }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "45%"
    },
    height: {
      type: String,
      default: "100%"
    },
    option: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isClick: false,
      defaultText: "请选择",
      jiaoBack: "url(" + require('../../assets/event/jiao.png') + ")",
      list: ["选择内容1", "选择内容2", "选择内容3", "选择内容4", "选择内容5"]
    }
  },
  methods: {
    pointer() {
      this.isClick = !this.isClick
    },
    selectOption() {
      this.isClick = false;
    }
  }
}
</script>

<style lang="less" scoped>
  .selectBox {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .show {
      width: 100%;
      height: 100%;
      background: #585c6a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 3px;
      .text {
        font-size: 16px;
        color: #d2d2d2;
        margin-left: 13%;
      }
      .jiao {
        width: 9%;
        height: 34%;
        margin-right: 13%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .hidden {
      width: 100%;
      position: absolute;
      top: 100%;
      .hiddenItem {
        width: 100%;
        height: 100%;
        background: #585c6a;
        border-bottom: 1px solid #d2d2d2;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
