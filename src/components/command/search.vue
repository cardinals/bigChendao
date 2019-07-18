<template>
  <div class="commandSearch">
    <input class="text" type="text" placeholder="事件名称" />
    <div class="jiao" :style="{ backgroundImage: jiaoBack }"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jiaoBack: "url(" + require("../../assets/control/sousuo.png") + ")"
    };
  }
};
</script>

<style lang="less" scoped>
.commandSearch {
  width: 64%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
  align-items: center;
  .text {
    width: 80%;
    border: none;
    background: transparent;
    padding-left: 5%;
    color: #fff;
    outline: none;
  }
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #fff;
  }
  .jiao {
    width: 13%;
    height: 54%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 2%;
    cursor: pointer;
  }
}
</style>
