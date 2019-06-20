<template>
  <!-- 这个组件  暴露宽高 82px 20px-->
  <div class="allModule" :style="{ width: width, height: height }">
    <p class="text">{{ text }}</p>
    <div class="btn" :style="{ background: btnBack }">
      <p 
        class="btns"
        :style="item"
        v-for="(item, index) in btnStyle" :key="index"
        @click="checkBox(index)"
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
      btnBack: "#cacaca",
      btnStyle: [
        {
          width: "50%",
          height: "100%",
          background: "#00e2ff",
          borderRadius: "50%"
        },
        {
          width: "50%",
          height: "100%",
          background: "transparent",
          borderRadius: "50%"
        }
      ]
    };
  },
  methods: {
    checkBox(index) {
      index == 0
        ? (this.btnStyle[0].background = "#00e2ff") &&
          (this.btnStyle[1].background = "transparent") && (this.btnBack = "#cacaca")
        : (this.btnStyle[0].background = "transparent") &&
          (this.btnStyle[1].background = "#00e2ff") && (this.btnBack = "#101e47");

      // 状态值寸公共仓库 0 or 1
      this.$store.dispatch("layerChecked", index);
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
