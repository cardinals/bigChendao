<template>
  <div class="commandLeftModule">
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
        
      </common>
    </transition>
    <transition name="el-zoom-in-top">
      <common
        titleHeight="14%"
        v-if="isHidden == '隐藏浮窗'"
        :width="layer.width"
        :height="layer.height"
        :title="layer.title"
        :tabs="layer.tabs"
        border="none"
        blue="none"
        :style="{ backgroundImage: layer.back }"
      >
        <BaseEchart :options="chartsData1" />
      </common>
    </transition>
    <transition name="el-zoom-in-top">
      <common
        titleWidth="60%"
        titleHeight="14%"
        :isBack="true"
        v-if="isHidden == '隐藏浮窗'"
        :width="hot.width"
        :height="hot.height"
        :title="hot.title"
        :tabs="hot.tabs"
        border="none"
        :style="{ backgroundImage: hot.back }"
        blue="none"
      >
        <BaseEchart :options="chartsData2" />
      </common>
    </transition>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from "vuex";
import common from "@/components/control/common";
import dataTourist from "@/components/control/dataTourist";
import BaseEchart from "@/components/echarts/BaseEchart";
export default {
  components: { common, dataTourist, BaseEchart },
  data() {
    return {
      isHidden: "隐藏浮窗",
      datas: {
        width: "100%",
        height: "36%",
        title: "数据概览",
        tabs: ["事件统计", "定位统计"],
        back: "url(" + require("../../assets/control/datas.png") + ")"
      },
      layer: {
        width: "100%",
        height: "31%",
        title: "时间处理率",
        back: "url(" + require("../../assets/control/layer.png") + ")"
      },
      hot: {
        width: "100%",
        height: "31%",
        title: "近一周发生事件数",
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
      ],
      chartsData1: {
        grid: {
          top: "10%",
          right: "10%",
          bottom: "20%",
          left: "15%"
        },
        xAxis: {
          type: "category",
          data: ["1001", "1102", "1103", "1104", "1105", "1106", "1107"],
          axisLabel: {
            textStyle: {
              color: "#859db1"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#859db1"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#859db1"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#859db1"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            symbol: "none",
            lineStyle: {
              color: "#d46b74" //改变折线颜色
            }
          }
        ]
      },
      chartsData2: {
        grid: {
          top: "10%",
          right: "10%",
          bottom: "20%",
          left: "15%"
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisLabel: {
            textStyle: {
              color: "#859db1"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#859db1"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#859db1"
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#859db1"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0293fe" },
                  { offset: 1, color: "#78ceea" }
                ])
              }
            },
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
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
        this.isHidden = newValue;
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
.commandLeftModule {
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
