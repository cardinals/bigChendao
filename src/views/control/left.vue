<template>
  <div class="controlLeftModule">
    <common
      :width="datas.width"
      :height="datas.height"
      :title="datas.title"
      :tabs="datas.tabs"
      :style="{ backgroundImage: datas.back }"
    />
    <common
      :width="layer.width"
      :height="layer.height"
      :title="layer.title"
      :tabs="layer.tabs"
      border="none"
      all="yes"
      :style="{ backgroundImage: layer.back }"
    />
    <common
      :width="hot.width"
      :height="hot.height"
      :title="hot.title"
      :tabs="hot.tabs"
      border="none"
      :style="{ backgroundImage: hot.back }"
      blue="none"
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
      },
      layer: {
        width: '100%',
        height: '31%',
        title: "图层展示",
        tabs: ['图层名称'],
        back: "url(" + require("../../assets/control/layer.png") + ")"
      },
      hot: {
        width: '100%',
        height: '31%',
        title: "景区热力图",
        back: "url(" + require("../../assets/control/hot.png") + ")"
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
