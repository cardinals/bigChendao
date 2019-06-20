<template>
  <!-- 这个组件  暴露宽高 82px 20px-->
  <div class="allModule" :style="{ width: width, height: height }" @click="checkBox()">
    <p class="text">{{ text }}</p>
    <div class="btn" :style="{ background: isActive ? btnBack : btnBack1 }">
      <p 
        class="btns"
        :style="{ background: isActive ? item.background : item.background1 }"
        v-for="(item, index) in btnStyle" :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "全选"
    },
    width: {
      type: String,
      default: "22%"
    },
    height: {
      type: String,
      default: "50%"
    }
  },
  data() {
    return {
      btnBack: "#101e47",
      btnBack1: "#cacaca",
      isActive: false,
      btnStyle: [
        {    
          background: "transparent",
          background1: "#00e2ff"
        },
        {  
          background: "#00e2ff",
          background1: "transparent"     
        }
      ]
    };
  },
  methods: {
    checkBox() {
      const self = this;
      this.isActive = !this.isActive;
      // 状态值寸公共仓库 0 or 1
      this.$store.dispatch("layerChecked", Number(self.isActive));
    }
  }
};
</script>

<style lang="less" scoped>
.allModule {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  right: 4%;
  .text {
    font-size: 18px;
    color: white;
  }
  .btn {
    width: 45%;
    height: 100%;
    // background: #101e47;
    border: 1px solid #00e2ff;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btns {
      width: 50%;
      height: 100%;
      background: #00e2ff;
      border-radius: 50%;
    }
  }
}
</style>
