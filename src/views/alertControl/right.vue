<template>
  <div class="alertRightModule">
    <listModule :option="topData" position="top" titleTop="0" titleLeft="3%" />
    <listModule :option="bottomData" position="bottom" titleTop="8%" titleLeft="0" />
  </div>
</template>

<script>
import listModule from "@/components/alertControl/listModule"
export default {
  components: { listModule },
  data() {
    return {
      topData: {
        title: "附近人员",
        back: "url(" + require('../../assets/event/rtk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      },
      bottomData: {
        title: "附近资源",
        back: "url(" + require('../../assets/event/rbk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .alertRightModule {
    color: #ffffff;
    width: 22%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
</style>
