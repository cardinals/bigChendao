<template>
  <div class="commandselectBox" :style="{ width: width, height: height }">
    <div class="show" @click="pointer" @mouseleave="onleave">
      <div class="text">{{ title }}</div>
      <div class="jiao" :style="{ backgroundImage: jiaoBack }"></div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="hidden" v-if="isClick" @mouseenter="onenter" @mouseleave="onleave">
        <div class="hiddenItem" v-for="(item, index) in data" :key="index" @click="selectOption(item)">{{ item.name }}</div>
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
    title: {
      type: String,
      default: ""
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
    }
  },
  methods: {
    // 请求预案分组
    pointer() {
      this.isClick = !this.isClick
      this.$store.dispatch("_planGroup", { organizationId: 1 })
    },
    // 保存预案分组id
    selectOption(item) {
      this.isClick = false;
      const groupId = item.groupId;
      this.$store.dispatch("saveplanGroupId", groupId);
      this.title = item.groupName
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
  .commandselectBox {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .show {
      width: 100%;
      height: 100%;
      // background: #585c6a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
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
