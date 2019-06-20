<template>
  <div class="controlLeftModule">
    <common
      :width="datas.width"
      :height="datas.height"
      :title="datas.title"
      :tabs="datas.tabs"
      slotHeight="73%"
      @propEvent="receiveEvent"
      :style="{ backgroundImage: datas.back }">
      <dataTourist :data="touristData" v-if="dataNumber == 0" />
      <dataDevice v-if="dataNumber == 1" />
      <dataResource v-if="dataNumber == 2" />
    </common>
    <common
      :width="layer.width"
      :height="layer.height"
      :title="layer.title"
      :tabs="layer.tabs"
      slotHeight="50%"
      border="none"
      all="yes"
      :style="{ backgroundImage: layer.back }"
    >
      <layerContent />
    </common>
    <common
      :width="hot.width"
      :height="hot.height"
      :title="hot.title"
      :tabs="hot.tabs"
      border="none"
      :style="{ backgroundImage: hot.back }"
      blue="none"
    >

    </common>
  </div>
</template>

<script>
import common from "@/components/control/common";
import dataTourist from "@/components/control/dataTourist";
import dataDevice from "@/components/control/dataDevice";
import dataResource from "@/components/control/dataResource";
import layerContent from "@/components/control/layerContent";
export default {
  components: { common, dataTourist, dataDevice, dataResource, layerContent },
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
      },
      dataNumber: 0,
      touristData: [
        {
          link: "url("+ require('../../assets/control/men1.png') +")",
          name: "今日：",
          num: 2479,
          unit: '人'
        },
        {
          link: "url("+ require('../../assets/control/men2.png') +")",
          name: "昨日：",
          num: 4899,
          unit: '人'
        },
        {
          link: "url("+ require('../../assets/control/men3.png') +")",
          name: "近一周累计：",
          num: 50797,
          unit: '人'
        },
        {
          link: "url("+ require('../../assets/control/men4.png') +")",
          name: "本月累计：",
          num: 8080797,
          unit: '人'
        }
      ],
      deviceData: [

      ]
    }
  },
  methods: {
    receiveEvent(e) { this.dataNumber = e; }
  }
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
