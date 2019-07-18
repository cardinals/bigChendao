<template>
  <div class="lastOne cc">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "事件处置完成"
    }
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.$store.dispatch("savePlanOrmanOrNo", 5);
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
  .lastOne {
     width: 16%;
    height: 19%;
    // background: #ffffff;
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    z-index: 999;
    background: linear-gradient(to right, #02143a, #02020f);
    color: white;
    font-size: 30px;
    border-radius: 10px;
    border: 1px solid #fff;
  }
</style>
