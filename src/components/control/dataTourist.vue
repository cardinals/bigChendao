<template>
  <div class="dataTourist">
    <div v-for="(item, index) in data" :key="index" class="box">
      <div class="img" :style="{ backgroundImage: item.link }"></div>
      <div class="name">{{ item.name }}</div>
      <div class="num">{{ item.num }}</div>
      <div class="unit">{{ item.unit }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.dataTourist {
  // width: 364px;
  width: 91%;
  height: 70%;
  // background: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 15%;
    .img {
      width: 26%;
      height: 100%;
      margin-right: 6%;
      margin-left: 2%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .name {
      font-size: 18px;
      margin-right: 4%;
    }
    .num {
      margin-right: 2%;
      font-size: 20px;
      font-weight: bolder;
    }
    .unit {
      font-size: 18px;
    }
  }
}
</style>
