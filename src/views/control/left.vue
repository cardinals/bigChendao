<template>
  <div class="controlLeftModule">
    <common
      :width="datas.width"
      :height="datas.height"
      :title="datas.title"
      :tabs="datas.tabs"
      :style="{ backgroundImage: datas.back }"
    />
  </div>
</template>

<script>
import common from "@/components/control/common"
export default {
  data() {
    return {
      datas: {
        width: '100%',
        height: '36%',
        title: "数据概览",
        tabs: ['游客数量', '设备数量', '资源数量'],
        back: "url(" + require("../../assets/control/datas.png") + ")"
      }
    }
  },
  components: { common }
}
</script>

<style lang="less" scoped>
  .controlLeftModule {
    // background: goldenrod;
    color: white;
    // width: 402px;
    // height: 890px;
    width: 21%;
    height: 95%;
  }
</style>
