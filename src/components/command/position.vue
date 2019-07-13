<template>
  <div class="commandPosition">
    <div class="oneBox" v-for="(item, index) in this.$store.state.command.carPersonList" :key="index">
      <div class="oneBoxTop">
        <div class="oneLeft">
          <p class="text">{{ item.text1 }}</p>
          <p class="number">{{ item.num1 }}</p>
        </div>
        <div class="oneRight" :style="{ background: item.back, border: item.border }">
          <p class="text">{{ item.text2 }}</p>
          <p class="number">{{ item.num2 }}</p>
        </div>
      </div>
      <div class="oneBoxBottom">{{ item.check }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          text1: "人员",
          num1: 66,
          text2: "",
          num2: '',
          check: "查看>>",
          back: "transparent",
          border: 'none'
        },
        {
          text1: "车辆",
          num1: 46,
          text2: "在线车辆",
          num2: 16,
          check: "查看>>"
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .commandPosition {
    width: 100%;
    height: 100%;
    // background: blueviolet;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .oneBox {
      width: 74%;
      height: 35%;
      // background: orangered;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      .oneBoxTop {
        width: 100%;
        height: 55%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .oneLeft {
          width: 26%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            font-size: 18px;
            color: white;
          }
          .number {
            font-size: 24px;
            color: #00e2ff;
            font-weight: bolder;
          }
        }
        .oneRight {
          width: 55%;
          height: 100%;
          border: 1px solid #417488;
          background: rgba(166, 166, 166, 0.1);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          .text {
            font-size: 18px;
            color: white;
            margin-right: 5%
          }
          .number {
            font-size: 16px;
            color: #00e2ff;
            font-weight: bolder;
          }
        }
      }
      .oneBoxBottom {
        width: 100%;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        text-align: right;
      }
    }
  }
</style>
