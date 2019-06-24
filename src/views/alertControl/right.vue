<template>
  <div class="alertRightModule">
    <listModule 
      :option="topData"
      positionBottom="9%"
      position="top"
      titleTop="0"
      titleLeft="0%"
      slotHeight="77%">
        <listContent width="73%" height="85%" :data="data1" />
    </listModule>
    <listModule
      @propEvent="receiveEvent"
      :option="bottomData"
      :isBlue="true"
      position="bottom"
      titleTop="8%"
      titleLeft="0"
      slotHeight="79%">
        <listContent
          width="73%"
          height="65%"
          margin="6.5%"
          v-if="dataNumber == 0"
          position="relative"
          top="10%"
          :data="data2" />
        <listContent
          width="73%"
          height="65%"
          margin="6.5%"
          v-if="dataNumber == 1"
          position="relative"
          top="10%"
          :data="data3" />
    </listModule>
  </div>
</template>

<script>
import listContent from "@/components/alertControl/listContent";
import listModule from "@/components/alertControl/listModule";
export default {
  components: { listModule, listContent },
  data() {
    return {
      topData: {
        title: "附近人员",
        back: "url(" + require("../../assets/event/rtk.png") + ")",
        titleBack: "url(" + require("../../assets/event/titleBack.png") + ")"
      },
      bottomData: {
        title: "附近资源",
        back: "url(" + require("../../assets/event/rbk.png") + ")",
        titleBack: "url(" + require("../../assets/event/titleBack.png") + ")"
      },
      data1: [
        { name: "附近人1", tel: "13765678765" },
        { name: "附近人2", tel: "13765678765" },
        { name: "附近人3", tel: "13765678765" },
        { name: "附近人4", tel: "13765678765" },
        { name: "附近人5", tel: "13765678765" },
        { name: "附近人6", tel: "13765678765" },
        { name: "附近人3", tel: "13765678765" },
        { name: "附近人4", tel: "13765678765" },
        { name: "附近人5", tel: "13765678765" },
        { name: "附近人6", tel: "13765678765" }
      ],
      data2: [
        { name: "灭火器1", tel: "13765678765" },
        { name: "灭火器2", tel: "13765678765" },
        { name: "灭火器3", tel: "13765678765" },
        { name: "灭火器4", tel: "13765678765" },
        { name: "灭火器5", tel: "13765678765" },
        { name: "灭火器6", tel: "13765678765" },
        { name: "灭火器3", tel: "13765678765" },
        { name: "灭火器4", tel: "13765678765" },
        { name: "灭火器5", tel: "13765678765" },
        { name: "灭火器6", tel: "13765678765" }
      ],
      data3: [
        { name: "车辆1", tel: "13765678765" },
        { name: "车辆2", tel: "13765678765" },
        { name: "车辆3", tel: "13765678765" },
        { name: "车辆4", tel: "13765678765" },
        { name: "车辆5", tel: "13765678765" },
        { name: "车辆6", tel: "13765678765" },
        { name: "车辆3", tel: "13765678765" },
        { name: "车辆4", tel: "13765678765" },
        { name: "车辆5", tel: "13765678765" },
        { name: "车辆6", tel: "13765678765" }
      ],
      dataNumber: 0
    };
  },
  methods: {
    receiveEvent(e) {
      this.dataNumber = e;
    }
  }
};
</script>

<style lang="less" scoped>
.alertRightModule {
  color: #ffffff;
  width: 24%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>
