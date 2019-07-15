<template>
  <div class="commandEvent">
    <div class="everyOne" v-for="(item, index) in this.$store.state.command.eventDateList" :key="index">
      <div class="titleBox">
        <p class="title">{{ item.title }}</p>
        <p class="titleNum">{{ item.num }}</p>
      </div>
      <div class="content">
        <p class="contentOne" :style="{ width: item.width }">
          <span class="text">{{ item.data[0].text }}</span>
          <span class="num">{{ item.data[0].num }}</span>
        </p>
        <p class="contentOne" :style="{ width: item.width }">
          <span class="text">{{ item.data[1].text }}</span>
          <span class="num">{{ item.data[1].num }}</span>
        </p>
        <p class="contentOne" :style="{ width: item.width }">
          <span class="text">{{ item.data[2].text }}</span>
          <span class="num">{{ item.data[2].num }}</span>
        </p>
      </div>
    </div>
    <div class="check" @click="eventLook">查看>></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          title: "总数量",
          num: 66,
          data: [
            { text: "待处理", num: 0 },
            { text: "处置中", num: 0 },
            { text: "已完结", num: 66 }
          ],
          width: "23%"
        },
        {
          title: "时间分组",
          data: [
            { text: "指挥", num: 30 },
            { text: "告警", num: 26 },
            { text: "其他", num: 16 }
          ],
          width: "18%"
        }
      ]
    }
  },
  methods: {
    eventLook() {
      this.$store.dispatch("saveTableAlertValue", 1);
    }
  }
}
</script>

<style lang="less" scoped>
  .commandEvent {
    width: 100%;
    height: 100%;
    // background: red;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .everyOne {
      width: 85%;
      height: 35%;
      // background: yellow;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .titleBox {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
          font-size: 18px;
          color: #ffffff;
          margin-right: 11%;
        }
        .titleNum {
          font-size: 24px;
          font-weight: bolder;
          color: #00e2ff;
        }
      }
      .content {
        height: 53%;
        width: 100%;
        border: 1px solid #417488;
        background: rgba(166, 166, 166, 0.1);
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        .contentOne {
          width: 24%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            color: #ffffff;
            font-size: 18px;
          }
          .num {
            color: #00e2ff;
            font-size: 16px;
          }
        }
      }
    }
    .check {
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 2%;
      width: 100%;
      text-align: right;
      margin-right: 15%;
      cursor: pointer;
    }
  }
</style>
