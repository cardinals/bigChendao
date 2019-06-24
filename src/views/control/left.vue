<template>
  <div class="controlLeftModule">
    <transition name="el-zoom-in-top">
      <common
        v-if="isHidden == '隐藏浮窗'"
        :width="datas.width"
        :height="datas.height"
        :title="datas.title"
        :tabs="datas.tabs"
        slotHeight="73%"
        @propEvent="receiveEvent"
        :style="{ backgroundImage: datas.back }">
        <dataTourist :data="touristData" v-if="dataNumber == 0" />
        <!-- 设备 -->
        <layerContent 
          width="87%" 
          height="76%"
          oneHeight="12%" 
          marginTop="0" 
          :datas="deviceData"
          :isEvent="false"
          :isRatio="true" 
          v-if="dataNumber == 1" />
        <!-- 资源 -->
        <layerContent
          width="87%"
          height="76%"
          oneHeight="12%"
          marginTop="0"
          :datas="resourceData"
          :isRatio="true"
          :isEvent="false"
          v-if="dataNumber == 2" />
      </common>
    </transition>
    <transition name="el-zoom-in-top">
      <common
        v-if="isHidden == '隐藏浮窗'"
        :width="layer.width"
        :height="layer.height"
        :title="layer.title"
        :tabs="layer.tabs"
        slotHeight="50%"
        border="none"
        all="yes"
        :style="{ backgroundImage: layer.back }"
      >
        <layerContent :datas="names" />
      </common>
    </transition>
    <transition name="el-zoom-in-top">
      <common
        v-if="isHidden == '隐藏浮窗'"
        :width="hot.width"
        :height="hot.height"
        :title="hot.title"
        :tabs="hot.tabs"
        border="none"
        :style="{ backgroundImage: hot.back }"
        blue="none"
      >
      </common>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex"
import common from "@/components/control/common";
import dataTourist from "@/components/control/dataTourist";
import layerContent from "@/components/control/layerContent";
export default {
  components: { common, dataTourist, layerContent },
  data() {
    return {
      isHidden: '隐藏浮窗',
      datas: {
        width: "100%",
        height: "36%",
        title: "数据概览",
        tabs: ["游客数量", "设备数量", "资源数量"],
        back: "url(" + require("../../assets/control/datas.png") + ")"
      },
      layer: {
        width: "100%",
        height: "31%",
        title: "图层展示",
        tabs: ["图层名称"],
        back: "url(" + require("../../assets/control/layer.png") + ")"
      },
      hot: {
        width: "100%",
        height: "31%",
        title: "景区热力图",
        back: "url(" + require("../../assets/control/hot.png") + ")"
      },
      dataNumber: 0,
      touristData: [
        {
          link: "url(" + require("../../assets/control/men1.png") + ")",
          name: "今日：",
          num: 2479,
          unit: "人"
        },
        {
          link: "url(" + require("../../assets/control/men2.png") + ")",
          name: "昨日：",
          num: 4899,
          unit: "人"
        },
        {
          link: "url(" + require("../../assets/control/men3.png") + ")",
          name: "近一周累计：",
          num: 50797,
          unit: "人"
        },
        {
          link: "url(" + require("../../assets/control/men4.png") + ")",
          name: "本月累计：",
          num: 8080797,
          unit: "人"
        }
      ],
      names: [
        {
          link: "url(" + require("../../assets/control/layer1.png") + ")",
          link1: "url(" + require("../../assets/control/layer1x.png") + ")",
          isActive: true,
          name: "事件",
          marginLeft: "",
          width: "24%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        },
        {
          link: "url(" + require("../../assets/control/layer2.png") + ")",
          link1: "url(" + require("../../assets/control/layer2x.png") + ")",
          isActive: true,
          name: "监控",
          marginLeft: "25%",
          width: "26%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        },
        {
          link: "url(" + require("../../assets/control/layer3.png") + ")",
          link1: "url(" + require("../../assets/control/layer3x.png") + ")",
          isActive: true,
          name: "设备",
          marginLeft: "",
          width: "23%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        },
        {
          link: "url(" + require("../../assets/control/layer4.png") + ")",
          link1: "url(" + require("../../assets/control/layer4x.png") + ")",
          isActive: true,
          name: "Wi-Fi",
          marginLeft: "25%",
          width: "24%",
          height: "80%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        },
        {
          link: "url(" + require("../../assets/control/layer5.png") + ")",
          link1: "url(" + require("../../assets/control/layer5x.png") + ")",
          isActive: true,
          name: "景点",
          marginLeft: "",
          width: "23%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        },
        {
          link: "url(" + require("../../assets/control/layer6.png") + ")",
          link1: "url(" + require("../../assets/control/layer6x.png") + ")",
          isActive: true,
          name: "路灯",
          marginLeft: "25%",
          width: "18%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b"
        }
      ],
      deviceData: [
        {
          link: "url(" + require("../../assets/control/layer1.png") + ")",
          link1: "url(" + require("../../assets/control/layer1x.png") + ")",
          isActive: true,
          name: "事件",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(123/126)"
        },
        {
          link: "url(" + require("../../assets/control/layer2.png") + ")",
          link1: "url(" + require("../../assets/control/layer2x.png") + ")",
          isActive: true,
          name: "监控",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(103/136)"
        },
        {
          link: "url(" + require("../../assets/control/layer3.png") + ")",
          link1: "url(" + require("../../assets/control/layer3x.png") + ")",
          isActive: true,
          name: "设备",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(62/68)"
        },
        {
          link: "url(" + require("../../assets/control/layer4.png") + ")",
          link1: "url(" + require("../../assets/control/layer4x.png") + ")",
          isActive: true,
          name: "Wi-Fi",
          width: "15%",
          height: "80%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(62/126)"
        },
        {
          link: "url(" + require("../../assets/control/layer5.png") + ")",
          link1: "url(" + require("../../assets/control/layer5x.png") + ")",
          isActive: true,
          name: "景点",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(23/26)"
        },
        {
          link: "url(" + require("../../assets/control/layer6.png") + ")",
          link1: "url(" + require("../../assets/control/layer6x.png") + ")",
          isActive: true,
          name: "路灯",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          textColor1: "#fdc43b",
          ratio: "(62/87)"
        }
      ],
      resourceData: [
        {
          link: "url(" + require("../../assets/control/layer5.png") + ")", 
          isActive: true,
          name: "景点",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(27)"
        },
        {
          link: "url(" + require("../../assets/control/malu.png") + ")",
          isActive: true,
          name: "游步道",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(4)"
        },
        {
          link: "url(" + require("../../assets/control/wc.png") + ")",
          isActive: true,
          name: "卫生间",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(8)"
        },
        {
          link: "url(" + require("../../assets/control/mian.png") + ")",
          isActive: true,
          name: "餐饮住宿",
          width: "15%",
          height: "80%",
          textColor: "#fff",
          ratio: "(4)"
        },
        {
          link: "url(" + require("../../assets/control/customer.png") + ")",
          isActive: true,
          name: "游客中心",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(4)"
        },
        {
          link: "url(" + require("../../assets/control/an.png") + ")",
          isActive: true,
          name: "治安点",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(4)"
        },
        {
          link: "url(" + require("../../assets/control/p.png") + ")",
          isActive: true,
          name: "停车场",
          width: "15%",
          height: "100%",
          textColor: "#fff",
          ratio: "(4)"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      hiddenValue: state => state.control.hiddenValue
    })
  },
  watch: {
    hiddenValue(newValue, oldValue) {
      if (newValue != oldValue) {
        this.isHidden = newValue
      }
    }
  },
  methods: {
    receiveEvent(e) {
      this.dataNumber = e;
    }
  }
};
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
