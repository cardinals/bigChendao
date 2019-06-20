<template>
  <!--此组件外部可配置 
    背景图 尺寸 title tabName titleHeight tabs的居中方式 .slot的高度
  -->
  <div class="commonModule" 
    :style="{ backgroundImage: back, width: width, height: height }"
  >
    <div class="titleBox cc" 
      :style="{ backgroundImage: titleBack, height: titleHeight }">
      {{ title }}
    </div>
    <div class="blueLine" v-if="blue != 'none'">
      <P    
        class="tabName"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="border == 'none'? '' : defaultNum == index ? 'addClass' : ''"
        @click="border == 'none' ? '' : tabEvent(index)"
      >
          {{ tab }}
      </P>
      <!--全选切换-->
      <all v-if="all == 'yes'" text="全选" />
    </div>
    <!--插槽-->
    <div class="slot" :style="{ height: slotHeight }">
      <slot />
    </div>
  </div>
</template>

<script>
import all from "@/components/common/all";
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '36%'
    },
    title: {
      type: String,
      default: '数据预览'
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    },
    back: {
      type: String,
      default: "url(" + require("../../assets/control/datas.png") + ")"
    },
    titleHeight: {
      type: String,
      default: '11%'
    },
    border: {
      type: String,
      default: ''
    },
    all: {
      type: String,
      default: 'no'
    },
    blue: {
      type: String,
      default: ''
    },
    slotHeight: {
      type: String,
      default: '73%'
    }
  },
  components: { all },
  data() {
    return {
      titleBack: "url(" + require("../../assets/control/titleBack.png") +")",
      defaultNum: 0
    }
  },
  methods: {
    tabEvent(index) { 
      this.defaultNum = index;
      this.$emit('propEvent', index);
    }
  }
}
</script>

<style scoped lang="less">
  .commonModule {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .titleBox {
      width: 46%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      font-size: 19px;
      margin-bottom: 3%;
    }
    .blueLine {
      width: 100%;
      height: 13%;
      widows: 100%;
      background-color: rgba(0, 226, 255, 0.1);
      padding-left: 6%;
      padding-right: 6%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .tabName {
        font-size: 18px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin: 0 auto;
      }
      .addClass {
        color: #00e2ff;
        border-bottom: 2px solid #00e2ff;
      }
    }
    .slot {
      width: 100%;
      // height: 73%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
