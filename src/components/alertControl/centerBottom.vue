<template>
  <div class="centerBottom">
    <div class="content" :style="{ height: this.$store.state.eventAlert.tabNumber == 0 ? '65%' : '34%'}">
      <div
        class="handle cc"
        @click="planOrmanOrNo(index)"
        v-for="(handle, index) in handles"
        :style="{ backgroundImage: handle.back }"
        :key="index">
          {{ handle.text }}
        </div>
    </div>
    <div class="text">提议: 建议先确认事件真实性;</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handles: [
        { back: "url(" + require('../../assets/event/handle1.png') + ")", text: "预案处理" },
        { back: "url(" + require('../../assets/event/handle2.png') + ")", text: "人工处理" },
        { back: "url(" + require('../../assets/event/handle3.png') + ")", text: "不处理" }
      ]
    }
  },
  methods: {
    planOrmanOrNo(index) {
      console.log(index)
      const self = this;
      this.$store.dispatch("savePlanOrmanOrNo", index)
      if (index == 2) {
        self.$store.dispatch("savePlanOrmanOrNo", 7);
        // self.$store.dispatch("showAlert", false);
        // self.$store.dispatch("savePlanOrmanOrNo", 6);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .centerBottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .handle {
        width: 25%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-bottom: 1%;
        cursor: pointer;
      }
    }
    .text {
      font-size: 14px;
      color: white;
      position: absolute;
      left: 0;
      bottom: 0%;
    }
  }
</style>
