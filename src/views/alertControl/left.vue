<template>
  <div class="alertLeftModule">
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
        title: "紧急联系人",
        back: "url(" + require('../../assets/event/topk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      },
      bottomData: {
        title: "附近广播",
        back: "url(" + require('../../assets/event/bottomk.png') + ")",
        titleBack: "url(" + require('../../assets/event/titleBack.png') + ")"
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .alertLeftModule {
    color: #ffffff;
    width: 22%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
</style>
