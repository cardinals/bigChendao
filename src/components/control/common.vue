<template>
  <!--此组件外部可配置 背景图 尺寸 title tabName titleHeight-->
  <div class="commonModule" 
    :style="{ backgroundImage: back, width: width, height: height }"
  >
    <div class="titleBox cc" 
      :style="{ backgroundImage: titleBack, height: titleHeight }">
      {{ title }}
    </div>
    <div class="blueLine">
      <P
        class="tabName"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="defaultNum == index ? 'addClass' : ''"
        @click="tabEvent(index)"
      >
          {{ tab }}
      </P>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data() {
    return {
      titleBack: "url(" + require("../../assets/control/titleBack.png") +")",
      defaultNum: 0
    }
  },
  methods: {
    tabEvent(index) { this.defaultNum = index }
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
      height: 13%;
      widows: 100%;
      background-color: rgba(0, 226, 255, 0.1);
      padding-left: 6%;
      padding-right: 6%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tabName {
        font-size: 18px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }
      .addClass {
        color: #00e2ff;
        border-bottom: 2px solid #00e2ff;
      }
    }
  }
</style>
