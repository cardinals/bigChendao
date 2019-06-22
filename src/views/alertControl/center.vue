<template>
  <div class="alertCenterModule">
    <titleModule width="100%" height="8%" title="事件处理" />
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
      :width="option[1].width"
      :height="option[1].height"
      :back="option[1].back"
      :title="option[1].title"
      :titleHeight="option[1].titleHeight"
      :slotWidth="option[1].slotWidth"
      :slotHeight="option[1].slotHeight"
    >
      <Center />
    </centerCommon>
    <centerCommon
      :width="option[2].width"
      :height="option[2].height"
      :back="option[2].back"
      :title="option[2].title"
      :titleHeight="option[2].titleHeight"
      :slotWidth="option[2].slotWidth"
      :slotHeight="option[2].slotHeight"
    >
      <Bottom />
    </centerCommon>
  </div>
</template>

<script>
import Top from "@/components/alertControl/centerTop"
import Center from "@/components/alertControl/centerCenter"
import Bottom from "@/components/alertControl/centerBottom"
import centerCommon from "@/components/alertControl/centerCommon"
import titleModule from "@/components/alertControl/titleModule"
export default {
  components: { centerCommon, titleModule, Top, Center, Bottom },
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
          height: "16%",
          title: "报警柱麦克风",
          titleHeight: "30%",
          back: "url(" + require('../../assets/event/back2.png') + ")",
          slotWidth: "90%",
          slotHeight: "37%"
        },
        {
          width: "93%",
          height: "19%",
          title: "处置方法",
          titleHeight: "25%",
          back: "url(" + require('../../assets/event/back3.png') + ")",
          slotWidth: "90%",
          slotHeight: "54%"
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .alertCenterModule {
    color: #ffffff;
    // border: 1px solid #ffffff;
    width: 50%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>