<template>
  <div class="commandRightModule">
    <transition name="el-zoom-in-top">
      <common
        v-if="isHidden == '隐藏浮窗'"
        :width="datas.width"
        :height="datas.height"
        :title="datas.title"
        :tabs="datas.tabs"
        blueLineHeight="10%"
        titleHeight="9%"
        slotHeight="76%"
        mb="2%"
        :isAlert="true"
        @propEvent="receiveEvent"
        :style="{ backgroundImage: datas.back }">
        <tableModule contentHeight="35%" titleHeight="17%" tableHeight="84%" moduleHeight="95%" moduleMt="0%" :tableTitle="tableTitle1" :record="record1" v-if="dataNumber == 0" />
        <tableModule contentHeight="35%" titleHeight="17%" tableHeight="84%" moduleHeight="95%" moduleMt="0%" :tableTitle="tableTitle2" :record="record2" v-if="dataNumber == 1" />
        <tableModule contentHeight="35%" titleHeight="17%" tableHeight="84%" moduleHeight="95%" moduleMt="0%" :tableTitle="tableTitle3" :record="record3" v-if="dataNumber == 2" />
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
        <layerContent :datas="names" :isColumn="true" />
      </common>
    </transition>
    <ranging />
  </div>
</template>

<script>
import { mapState } from "vuex"
import common from "@/components/control/common";
import tableModule from "@/components/common/table"
import ranging from "@/components/common/ranging"
import layerContent from "@/components/control/layerContent";
export default {
  components: { common, tableModule, ranging, layerContent },
  data() {
    return {
      isHidden: '隐藏浮窗',
      datas: {
        width: "100%",
        height: "40%",
        title: "事件",
        tabs: ['应急', '告警', '其他'],
        back: "url(" + require("../../assets/command/event.png") + ")"
      },
      tableTitle1: ['编号', '事件描述', '定位'],
      record1: [
        {
          number: '0006',
          desc: '游客掉进西湖6',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0005',
          desc: '游客掉进西湖5',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0004',
          desc: '游客掉进西湖4',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客掉进西湖3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客掉进西湖2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客掉进西湖1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客掉进西湖3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客掉进西湖2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客掉进西湖1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        }
      ],
      tableTitle2: ['编号', '告警描述', '定位'],
      record2: [
        {
          number: '0006',
          desc: '游客告警6',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0005',
          desc: '游客告警5',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0004',
          desc: '游客告警4',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客告警3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客告警2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客告警1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客告警3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客告警2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客告警1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        }
      ],
      tableTitle3: ['编号', '其他描述', '定位'],
      record3: [
        {
          number: '0006',
          desc: '游客其他消息6',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0005',
          desc: '游客其他消息5',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0004',
          desc: '游客其他消息4',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客其他消息3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客其他消息2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客其他消息1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0003',
          desc: '游客其他消息3',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0002',
          desc: '游客其他消息2',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        },
        {
          number: '0001',
          desc: '游客其他消息1',
          handle: '待处理',
          link: "url(" + require('../../assets/control/position.png') + ")"
        }
      ],
      dataNumber: 0,
      layer: {
        width: "100%",
        height: "31%",
        title: "图层展示",
        tabs: ["图层名称"],
        back: "url(" + require("../../assets/control/layer.png") + ")"
      },
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
          marginLeft: "",
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
        }
      ],
    }
  },
  computed: {
    ...mapState({
      hiddenValue: state => state.control.hiddenValue
    })
  },
  watch: {
    hiddenValue(newValue, oldValue) {
      this.isHidden = newValue
    }
  },
  methods: {
    receiveEvent(e) {
      this.dataNumber = e;
    }
  }
}
</script>

<style lang="less" scoped>
  .commandRightModule {
    // background: palevioletred;
    color: white;
    // width: 402px;
    // height: 890px;
    width: 21%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
    pointer-events: none;
  }
</style>
