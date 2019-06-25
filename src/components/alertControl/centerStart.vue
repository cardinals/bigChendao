<template>
  <div class="centerStart">
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
      v-if="this.$store.state.eventAlert.tabNumber == 0"
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
      :titleBottom="this.$store.state.eventAlert.tabNumber == 0 ? '2%' : '8%'"
      :width="option[2].width"
      :height="this.$store.state.eventAlert.tabNumber == 0 ? option[2].height : option[2].height2"
      :back="this.$store.state.eventAlert.tabNumber == 0 ? option[2].back : option[2].back2"
      :title="option[2].title"
      :titleHeight="this.$store.state.eventAlert.tabNumber == 0 ? option[2].titleHeight : option[2].titleHeight2"
      :slotWidth="option[2].slotWidth"
      :slotHeight="this.$store.state.eventAlert.tabNumber == 0 ? option[2].slotHeight : option[2].slotHeight2"
    >
      <Bottom />
    </centerCommon>
  </div>
</template>

<script>
import { mapState } from "vuex"
import Top from "@/components/alertControl/centerTop"
import Center from "@/components/alertControl/centerCenter"
import Bottom from "@/components/alertControl/centerBottom"
import centerCommon from "@/components/alertControl/centerCommon"
import planMan from "@/components/alertControl/planMan"
export default {
  components: { centerCommon, Top, Center, Bottom, planMan },
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
          height2: "37%",
          title: "处置方法",
          titleHeight: "25%",
          titleHeight2: "14%",
          back: "url(" + require('../../assets/event/back3.png') + ")",
          back2: "url(" + require('../../assets/event/back33.png') + ")",
          slotWidth: "90%",
          slotHeight: "54%",
          slotHeight2: "56%"
        }
      ],
      isTabNumber: 0
    }
  }
}
</script>

<style lang="less" scoped>
  .centerStart {
    color: #ffffff;
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>
