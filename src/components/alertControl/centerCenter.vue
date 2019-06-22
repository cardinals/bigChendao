<template>
  <div class="centerCenter cc">
    <div class="btn cc">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "启用中, 可直接对话"
    }
  }
}
</script>

<style lang="less" scoped>
  .centerCenter {
    width: 100%;
    height: 100%;
    .btn {
      width: 49%;
      height: 100%;
      background: #124492;
      border-radius: 5px;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
  }
</style>
