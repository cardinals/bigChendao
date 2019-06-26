<template>
  <div class="continueBox">
    <centerCommon
      :width="option[0].width"
      :height="option[0].height"
      :back="option[0].back"
      :title="option[0].title"
      :titleHeight="option[0].titleHeight"
      :slotWidth="option[0].slotWidth"
      :slotHeight="option[0].slotHeight"
    >
      <Top />
    </centerCommon>
    <centerCommon
      titleBottom="8%"
      :width="option[1].width"
      :height="option[1].height"
      :back="option[1].back"
      :title="option[1].title"
      :titleHeight="option[1].titleHeight"
      :slotWidth="option[1].slotWidth"
      :slotHeight="option[1].slotHeight"
    >
      <div class="chaBox cc">
        <div class="names">{{ option[1].status }}</div>
        <div class="continueBtn cc" @click="continues">{{ option[1].btn }}</div>
      </div>
    </centerCommon>
  </div>
</template>

<script>
import Top from "@/components/alertControl/centerTop"
import Bottom from "@/components/alertControl/centerBottom"
import centerCommon from "@/components/alertControl/centerCommon"
import planMan from "@/components/alertControl/planMan"
export default {
  components: { centerCommon, Top, Bottom, planMan },
  methods: {
    continues() {
      this.$store.dispatch("savePlanOrmanOrNo", 4);
    }
  },
  data() {
    return {
      option: [
        {
          width: "93%",
          height: "53%",
          title: "事件",
          titleHeight: "9%",
          back: "url(" + require('../../assets/event/back1.png') + ")",
          slotWidth: "90%",
          slotHeight: "82%"
        },
        {
          width: "93%",
          height: "37%",
          title: "处置方法",
          status: "处置状态: 处置中",
          btn: "继续处置",
          titleHeight: "14%",
          back: "url(" + require('../../assets/event/back33.png') + ")",
          slotWidth: "90%",
          slotHeight: "56%"
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .continueBox {
    color: #ffffff;
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .chaBox {
      position: relative;
      width: 100%;
      height: 100%;
      .names {
        font-size: 16px;
        color: white;
        position: absolute;
        left: 0;
        top: 0;
      }
      .continueBtn {
        width: 25%;
        height: 30%;
        background: #134694;
        border-radius: 5px;
        color: white;
        font-size: 18px;
      }
    }
  }
</style>
