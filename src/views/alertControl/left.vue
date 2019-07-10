<template>
  <div class="alertLeftModule">
    <listModule
      :option="topData"
      position="top"
      titleTop="0"
      titleLeft="3%"
      positionBottom="9%"
      slotHeight="77%">
        <listContent width="73%" height="85%" :data="this.$store.state.eventAlert.emergencyContact" />
    </listModule>
    <listModule
      :option="bottomData"
      position="bottom"
      titleTop="8%"
      titleLeft="0"
      slotHeight="79%">
        <listContent
          width="86%"
          height="66%"
          :data="this.$store.state.eventAlert.nearbyRadio"
          :isChecked="true"
          margin="5.5%" 
          nameWidth="32%"
          telWidth="33%" />
    </listModule>
  </div>
</template>

<script>
import listContent from "@/components/alertControl/listContent"
import listModule from "@/components/alertControl/listModule"
export default {
  components: { listModule, listContent },
  data() {
    return {
      topData: {
        title: "紧急联系人",
        back: "url(" + require('../../assets/event/topk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      },
      bottomData: {
        title: "附近广播",
        back: "url(" + require('../../assets/event/bottomk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      },
      data1: [
        { name: "小飞怪1", tel: "13765678765" },
        { name: "小飞怪2", tel: "13765678765" },
        { name: "小飞怪3", tel: "13765678765" },
        { name: "小飞怪4", tel: "13765678765" },
        { name: "小飞怪5", tel: "13765678765" },
        { name: "小飞怪6", tel: "13765678765" },
        { name: "小飞怪3", tel: "13765678765" },
        { name: "小飞怪4", tel: "13765678765" },
        { name: "小飞怪5", tel: "13765678765" },
        { name: "小飞怪6", tel: "13765678765" }
      ],
      data2: [
        { name: "西湖广播1", tel: "GB0010001", status: 0 },
        { name: "西湖广播2", tel: "GB0010001", status: 0 },
        { name: "西湖广播3", tel: "GB0010001", status: 1 },
        { name: "西湖广播4", tel: "GB0010001", status: 0 },
        { name: "西湖广播5", tel: "GB0010001", status: 1 },
        { name: "西湖广播6", tel: "GB0010001", status: 0 },
        { name: "西湖广播3", tel: "GB0010001", status: 1 },
        { name: "西湖广播4", tel: "GB0010001", status: 0 },
        { name: "西湖广播5", tel: "GB0010001", status: 1 },
        { name: "西湖广播6", tel: "GB0010001", status: 0 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .alertLeftModule {
    color: #ffffff;
    width: 24%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
</style>
