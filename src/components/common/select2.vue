<template>
  <div class="selectBox" :style="{ width: width, height: height }">
    <div class="show" @click="pointer" @mouseleave="onleave">
      <div class="text">{{ title }}</div>
      <div class="jiao" :style="{ backgroundImage: jiaoBack }"></div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="hidden" v-if="isClick" @mouseenter="onenter" @mouseleave="onleave">
        <div class="hiddenItem" v-for="(item, index) in data" :key="index" @click="selectOption(item)">{{ item.planName }}</div>
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
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isClick: false,
      jiaoBack: "url(" + require('../../assets/event/jiao.png') + ")",
      title: "选择预案"
    }
  },
  methods: {
    // 请求预案
    pointer() {
      const self = this;
      this.isClick = !this.isClick
      this.$store.dispatch("_planSelf", self.$store.state.eventAlert.planGroupId);
    },
    selectOption(item) {
      this.isClick = false;
      this.title = item.planName
      this.$store.dispatch("_saveDisposalParamPlanId", item);
    },
    onenter() {
      this.isClick = true;
    },
    onleave() {
      this.isClick = false
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
      .hiddenItem:hover {
        background: #898a8e;
      }
    }
  }
</style>
