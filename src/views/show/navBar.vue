<template>
  <div class="navBar">
    <div class="nameAndout">
      <div class="titleBox" :style="{ backgroundImage: titleBox.title.back }">
        <p class="title">{{ titleBox.title.name }}</p>
        <div class="options">
          <div 
            class="option cc"
            v-for="(option, index) in options"
            :key="index"
            @click="navigator(index)"
            :style="{ backgroundImage: option.back, width: option.width, color: option.color }">
              {{ option.name }}
          </div>
        </div>
      </div>
      <div class="outBox">
        用户 登出
      </div>
    </div>
    <div class="option4" :style="{ backgroundImage: holdUp.back }">
      <div class="hiddenTime">
        <div class="hidden cc" 
          :style="{ backgroundImage: holdUp.hidden.back, color: holdUp.hidden.color }" 
          @click="showOption('hidden')">
          {{ holdUp.hidden.name }}
        </div>
        <div class="time cc" :style="{ backgroundImage: holdUp.time.back }">
          {{ holdUp.time.name }}
        </div>
      </div>
      <div class="mapSearch">
        <div class="map cc" :style="{ backgroundImage: holdUp.map.back, color: holdUp.map.color }" @click="showOption('map')">
          {{ holdUp.map.name }}
        </div>
        <div class="movie cc" :style="{ backgroundImage: holdUp.movie.back, color: holdUp.movie.color }" @click="showOption('movie')">
          {{ holdUp.movie.name }}
        </div>
        <div class="search" :style="{ backgroundImage: holdUp.search.back }">
          <input class="ipt" type="text" :placeholder="holdUp.search.placeholder">
          <div class="sousuo" :style="{ backgroundImage: holdUp.search.back2 }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
export default {
  data() {
    return {
      titleBox: {
        title: {
          name: "大陈岛管控指挥可视化平台",
          back:
            "url(" + require("../../../static/img/control/titleImg.png") + ")"
        }
      },
      options: [
        {
          name: "管控",
          width: "220px",
          color: "#00e2ff",
          back: "url(" + require("../../assets/control/option1x.png") + ")"
        },
        {
          name: "指挥",
          width: "210px",
          color: "#fff",
          back: "url(" + require("../../assets/control/option2.png") + ")"
        },
        {
          name: "大数据",
          width: "220px",
          color: "#fff",
          back: "url(" + require("../../assets/control/option3.png") + ")"
        }
      ],
      holdUp: {
        back: "url(" + require("../../assets/control/hold.png") + ")",
        hidden: {
          name: "隐藏浮窗",
          back: "url(" + require("../../assets/control/hidden.png") + ")",
          color: "#fff"
        },
        time: {
          name: moment().format("HH:mm:ss"),
          back: "url(" + require("../../assets/control/time.png") + ")"
        },
        map: {
          name: "地图",
          back: "url(" + require("../../assets/control/map.png") + ")",
          color: "#fff",
        },
        movie: {
          name: "影像",
          back: "url(" + require("../../assets/control/movie.png") + ")",
          color: "#fcff03",
        },
        search: {
          placeholder: "查询景点、设备、资源等",
          back: "url(" + require("../../assets/control/search.png") + ")",
          back2: "url(" + require("../../assets/control/sousuo.png") + ")"
        }
      },
      map: { d2: false, d3: true }
    };
  },
  mounted() {
    let self = this;
    this.timer = setInterval(() => {
      self.holdUp.time.name = moment().format("HH:mm:ss");
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    navigator(e) {
      const options = this.options;
      if (e == 0) {
        options[0].back =
          "url(" + require("../../assets/control/option1x.png") + ")";
        options[1].back =
          "url(" + require("../../assets/control/option2.png") + ")";
        options[2].back =
          "url(" + require("../../assets/control/option3.png") + ")";
        options[0].color = "#00e2ff";
        options[1].color = "#fff";
        options[2].color = "#fff";
      } else if (e == 1) {
        options[0].back =
          "url(" + require("../../assets/control/option1.png") + ")";
        options[1].back =
          "url(" + require("../../assets/control/option2x.png") + ")";
        options[2].back =
          "url(" + require("../../assets/control/option3.png") + ")";
        options[0].color = "#fff";
        options[1].color = "#00e2ff";
        options[2].color = "#fff";
      } else if (e == 2) {
        options[0].back =
          "url(" + require("../../assets/control/option1.png") + ")";
        options[1].back =
          "url(" + require("../../assets/control/option2.png") + ")";
        options[2].back =
          "url(" + require("../../assets/control/option3x.png") + ")";
        options[0].color = "#fff";
        options[1].color = "#fff";
        options[2].color = "#00e2ff";
      }
    },
    showOption(name) {
      let self = this;
      let hiddenColor = self.holdUp.hidden.color;
      let mapColor = self.holdUp.map.color;
      let movieColor = self.holdUp.movie.color;
      if (name == 'hidden') {
        if (hiddenColor == '#fff') {
          // 这里我曾遇到过坑
          self.holdUp.hidden.color = '#fcff03'
          self.holdUp.hidden.name = '显示浮窗'
          self.$store.dispatch("saveHidden", self.holdUp.hidden.name);

        } else if (hiddenColor == "#fcff03") {
          self.holdUp.hidden.color = "#fff"
          self.holdUp.hidden.name = '隐藏浮窗'
          self.$store.dispatch("saveHidden", self.holdUp.hidden.name);
        }
      } else if (name == 'map') {
        // map: { d2: false, d3: true }
        self.holdUp.map.color = "#fcff03"
        self.holdUp.movie.color = "#fff"
        self.map.d2 = true
        self.map.d3 = false
        self.$store.dispatch("save23d", self.map)
      } else if (name == 'movie') {
        self.holdUp.movie.color = "#fcff03"
        self.holdUp.map.color = "#fff"
        self.map.d2 = false
        self.map.d3 = true
        self.$store.dispatch("save23d", self.map)
      }
    }
  }
};
</script>

<style scoped lang="less">
  // 140 1080 13% 87%
.navBar {
  text-align: center;
  .size(100%; 14.2%);
  .font(30px; #fff);
  // border-bottom: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto auto auto;
  .nameAndout {
    width: 100%;
    height: 79%;
    .titleBox {
      width: 42%;
      height: 100%;
      // height: 110px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: center;
      .title {
        font-weight: bolder;
        position: relative;
        top: 18%;
      }
      .options {
        display: flex;
        width: 84%;
        height: 36%;
        margin: 0 auto;
        position: absolute;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        z-index: 999;
        .option {
          height: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          font-size: 24px;
          text-align: center;
        }
      }
    }
    .outBox {
      position: absolute;
      top: 17px;
      right: 20px;
      font-size: 18px;
    }
  }
  .option4 {
    width: 100%;
    height: 54.3%; // 76px
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    // 48px / 140px
    top: -32%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    .hiddenTime {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 30%;
      height: 100%;
      .hidden {
        width: 31%;
        // height: 50px;
        height: 66%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 38px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
      }
      .time {
        width: 36%;
        // height: 50px;
        height: 66%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 27px;
        text-align: center;
        cursor: pointer;
      }
    }
    .mapSearch {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 30%;
      height: 100%;
      .map {
        width: 19%;
        // height: 50px;
        height: 66%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
      }
      .movie {
        width: 19%;
        // height: 50px;
        height: 66%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        right: 8px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
      }
      .search {
        width: 49%;
        // height: 50px;
        height: 66%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 30px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .ipt {
          width: 80%;
          height: 100%;
          background: none;
          border: none;
          outline: none;
          font-size: 18px;
          line-height: 100%;
          position: relative;
          left: -5px;
          cursor: pointer;
        }
        .ipt::-webkit-input-placeholder {
          color: #dfe3e0;
          border-bottom: 1px solid #dfe3e0;
        }
        .sousuo {
          width: 6%;
          height: 32%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
