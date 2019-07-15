<template>
  <div class="monitorLeft">
    <div class="title cc">
      <p v-for="(item, index) in titles" :key="index" :style="item">
        {{ item.value }}
      </p>
    </div>
    <div class="monitorList">
      <div class="monitorItem cc" @click="selectMonitor(index)" :style="{ background: item.backcolor }" v-for="(item, index) in monitorItem" :key="index">
        <div class="imgbox cc">
          <img class="img" :src="item.back" alt="" srcset="">
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        { value: '', width: '8px', height: '8px', background: '#17ffff', borderRadius: '50%', fontWight: '', color: '', fontSize: '', marginLeft: '', marginRight: '' },
        { value: "监控及周边", fontWight: 'bold', color: 'white', fontSize: '30px', marginLeft: '4%', marginRight: '4%' },
        { value: '', width: '8px', height: '8px', background: '#17ffff', borderRadius: '50%', fontWight: '', color: '', fontSize: '', marginLeft: '', marginRight: '' }
      ],
      monitorItem: [
        { back: require("../../assets/monitor/mw.png"), name: '西湖入口组', backcolor: "rgba(255, 255, 255, 0.6)" },
        { back: require("../../assets/monitor/mb.png"), name: '灵隐区域组', backcolor: "transparent" },
        { back: require("../../assets/monitor/mb.png"), name: '雷峰塔组', backcolor: "transparent" },
        { back: require("../../assets/monitor/mb.png"), name: '柳暗花组', backcolor: "transparent" }
      ]
    }
  },
  methods: {
    selectMonitor(index) {
      this.monitorItem.map(item => {
        item.back = require("../../assets/monitor/mb.png");
        item.backcolor = "transparent"
      })
      this.monitorItem[index].back = require("../../assets/monitor/mw.png");
      this.monitorItem[index].backcolor = "rgba(255, 255, 255, 0.6)";
    }
  }
}
</script>

<style lang="less" scoped>
  .monitorLeft {
    width: 20%;
    height: 100%;
    // background: salmon;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 100%;
      height: 13%;
      // background: darkblue;
      border-right: 1px solid #7bd0ea;
      margin-bottom: 4%;
    }
    .monitorList {
      width: 100%;
      height: 87%;
      // background: darkgoldenrod;
      border-right: 1px solid #7bd0ea;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .monitorItem {
        width: 85%;
        height: 9%;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        margin-bottom: 3%;
        cursor: pointer;
        .imgbox {
          width: 44%;
          height: 100%;
          .img {
            width: 40%;
            height: 60%;
          }
        }
        .name {
          width: 56%;
          height: 100%;
          color: white;
          font-size: 24px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
</style>
