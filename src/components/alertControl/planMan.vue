<template>
  <div class="planMan">
    <div class="out">
      <div class="title">{{ out.title }}</div>
      <div class="waring" :style="{ backgroundImage: out.waring }" />
      <p class="text">{{ out.text }}</p>
    </div>
    <div class="content" :style="{ backgroundImage: content.back }">
      <div class="header">
        <div class="name">{{ content.header[0] }}</div>
        <div class="name">{{ content.header[1] }}</div>
      </div>
      <div class="section1">
        <div class="top">
          <div class="s1name">{{ content.section1.title }}</div>
          <div class="selectBox">
            <selects></selects>
            <selects></selects>
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottom" v-for="(item, index) in content.section1.text" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="section2">123</div>
      <div class="section3">456</div>
      <div class="btn">123</div>
    </div>
  </div>
</template>

<script>
import selects from "@/components/common/select"
export default {
  components: { selects },
  data() {
    return {
      out: {
        title: "曲院风荷入口",
        waring: "url(" + require('../../assets/event/warning.png') + ")",
        text: "起火了"
      },
      content: {
        back: "url(" + require('../../assets/event/planOrmanBack.png') + ")",
        header: ["预案处理", "待处理"],
        section1: {
          title: "(1) 请选择预案",
          text: ["*预案内容", "(1)给工作人员发短信通知。", "(2)进行500米以内的人员和车辆调度。", "(3)请当日内填写《意外事故记录表》备案。"]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .planMan {
    color: white;
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .out {
      height: 6%;
      width: 100%;
      // background: olive;
      margin-bottom: 1.5%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .title {
        font-size: 20px;
        color: white;
        margin-left: 5%;
      }
      .waring {
        height: 100%;
        width: 6%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 5%;
        margin-right: 5%;
      }
      .text {
        font-size: 24px;
        color: #da5755;
        font-weight: bold;
        position: relative;
        top: 10%;
      }
    }
    .content {
      height: 90%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .header {
        width: 91%;
        height: 11%;
        // background: yellowgreen;
        border-bottom: 1px solid #6e727e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 24px;
          color: white;
          font-weight: bold;
        }
      }
      .section1 {
        width: 91%;
        height: 20%;
        background: yellowgreen;
        .top {
          height: 22%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .s1name {
            font-size: 19px;
            color: white;
          }
          .selectBox {
            width: 66%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .bottomBox {
          .bottom {
            font-size: 17px;
            color: white;
          }
        }
      }
      .section2 {
        width: 91%;
        height: 22%;
        background: yellowgreen;
      }
      .section3 {
        width: 91%;
        height: 28%;
        background: yellowgreen;
      }
      .btn {
        width: 84%;
        height: 7%;
        background: yellowgreen;
        margin-bottom: 3%;
      }
    }
  }
</style>
