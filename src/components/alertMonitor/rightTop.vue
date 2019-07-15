<template>
  <div class="monitorRightTop">
    <div class="title">布局选择: </div>
    <div class="partBox">
      <img class="partItem" @click="selectPart(index)" v-for="(part, index) in parts" :key="index" :src="part.back" :style="{ border: part.border }" />
    </div>
    <div class="more">更多监控>></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parts: [
        { back: require('../../assets/monitor/line1.png'), border: "2px solid red" },
        { back: require('../../assets/monitor/line2.png'), border: "2px solid transparent" },
        { back: require('../../assets/monitor/line3.png'), border: "2px solid transparent" },
        { back: require('../../assets/monitor/line4.png'), border: "2px solid transparent" }
      ]
    }
  },
  methods: {
    selectPart(index) {
      this.$store.dispatch("savePartNum", index + 1);
      this.parts.map(item => {
        item.border = "2px solid transparent"
      })
      this.parts[index].border = "2px solid red"
    }
  }
}
</script>

<style lang="less" scoped>
  .monitorRightTop {
    width: 90%;
    height: 13%;
    // background: darkolivegreen;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .title {
      font-size: 18px;
      color: white;
      width: 8%;
    }
    .partBox {
      width: 100%;
      height: 48%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .partItem {
        width: 6%;
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-right: 4%;
        cursor: pointer;
      }
    }
    .more {
      font-size: 20px;
      color: #b64a4a;
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 10%;
    }
  }
</style>
