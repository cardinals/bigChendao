<template>
  <div 
    :class="position == 'bottom' ? 'listModule1' : 'listModule'" 
    :style="{ backgroundImage: option.back }">
      <div 
        class="title"
        :style="{ backgroundImage: option.titleBack, top: titleTop, left: titleLeft }">
        {{ option.title }}
      </div>
      <div class="blueLine cc" v-if="isBlue">
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
      <div class="slotBox cc" :style="{ height: slotHeight, bottom: positionBottom }">
        <slot />
      </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    position: {
      type: String,
      default: "top"
    },
    titleTop: {
      type: String,
      default: "0"
    },
    titleLeft: {
      type: String,
      default: "3%"
    },
    slotHeight: {
      type: String,
      default: "87%"
    },
    positionBottom: {
      type: String,
      default: "0"
    },
    isBlue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultNum: 0,
      tabs: ["物资", "车辆"]
    };
  },
  methods: {
    tabEvent(index) {
      this.defaultNum = index;
      this.$emit("propEvent", index);
    }
  }
};
</script>

<style lang="less" scoped>
.listModule {
  width: 100%;
  height: 51%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
}
.listModule1 {
  width: 100%;
  height: 51%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 0;
}
.title {
  width: 40%;
  height: 11%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 4%;
}
.blueLine {
  width: 100%;
  height: 13%;
  position: absolute;
  left: 0%;
  top: 24%;
  background-color: rgba(0, 226, 255, 0.1);
  padding-left: 6%;
  padding-right: 6%;
  z-index: 999;
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
.slotBox {
  width: 100%;
  // background: red;
  position: absolute;
}
</style>
