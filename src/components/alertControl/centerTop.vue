<template>
  <div class="centerTop">
    <div class="title">
      <div class="warnBox">
        <div class="warn" :style="{ backgroundImage: info.warning }"></div>
        <div class="warnText" v-if="this.$store.state.eventAlert.tabNumber == 0">{{ info.title1 }}</div>
        <div class="warnText" v-if="this.$store.state.eventAlert.tabNumber == 1">{{ info.title2 }}</div>
        <div class="warnText" v-if="this.$store.state.eventAlert.tabNumber == 2">{{ info.title3 }}</div>
      </div>
      <div class="more">更多监控>></div>
    </div>
    <div class="movie cc" :style="{ border: this.$store.state.eventAlert.tabNumber == 1 ? '': '1px solid #325a74'}">
      <p v-if="this.$store.state.eventAlert.tabNumber != 1" class="movieText">{{ info.status }}</p>
      <p v-if="this.$store.state.eventAlert.tabNumber == 1" class="movieText2">{{ info.status2 }}</p>
      <div class="big" v-if="this.$store.state.eventAlert.tabNumber != 1" :style="{ backgroundImage: info.bigBack }"></div>
    </div>
    <div class="info">
      <p class="text">地点: {{ this.$store.state.tables.currentAddress }}</p>
      <p class="text">时间: {{ this.$store.state.tables.currentTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        title1: "报警柱被启动了",
        title2: "起火了",
        title3: "游客进入XX区域",
        warning: "url(" + require("../../assets/event/warning.png") + ")",
        bigBack: "url(" + require("../../assets/event/big.png") + ")",
        status: "调取报警柱的视频",
        status2:
          "着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！着火了！",
        location: "曲院风荷路与华星路交口",
        time: "2019-05-11 12:34:56"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.centerTop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .title {
    height: 17%;
    width: 100%;
    // background: black;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .warnBox {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      width: 49%;
      height: 100%;
      .warn {
        width: 25%;
        height: 83%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 6%;
      }
      .warnText {
        font-size: 24px;
        color: #db1515;
        font-weight: bold;
      }
    }
    .more {
      font-size: 18px;
      color: white;
      border-bottom: 1px solid #fff;
      cursor: pointer;
      position: relative;
    }
  }
  .movie {
    height: 66%;
    width: 100%;
    // background: orangered;
    // border: 1px solid #325a74;
    position: relative;
    .movieText {
      font-size: 18px;
      color: #7bd0ea;
      letter-spacing: 3px;
    }
    .movieText2 {
      font-size: 18px;
      color: #fff;
      padding-left: 4%;
    }
    .big {
      width: 4%;
      height: 9%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 2%;
      bottom: 5%;
      z-index: 999;
      cursor: pointer;
    }
  }
  .info {
    height: 11%;
    width: 100%;
    // background: orangered;
    .text {
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
