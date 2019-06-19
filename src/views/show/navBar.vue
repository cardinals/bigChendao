<template>
  <div class="navBar">
    <div class="nameAndout">
      <div class="titleBox" :style="{ backgroundImage: titleBox.title.back }">
        <p class="title">{{ titleBox.title.name }}</p>
        <div class="options">
          <div 
            class="option" 
            v-for="(option, index) in options"
            :key="index"
            @click="navigator(index)"
            :style="{ backgroundImage: option.back, width: option.width, color: option.color }">
              {{ option.name }}
          </div>
        </div>
      </div>
      <div class="outBox">
        456
      </div>
    </div>
    <div class="option">789</div>
  </div>
</template>

<script>
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
      ]
    };
  },
  methods: {
    navigator(e) {
      const options = this.options;
      if (e == 0) {
        options[0].back = "url(" + require("../../assets/control/option1x.png") + ")";
        options[1].back = "url(" + require("../../assets/control/option2.png") + ")";
        options[2].back = "url(" + require("../../assets/control/option3.png") + ")";
        options[0].color = "#00e2ff";
        options[1].color = "#fff";
        options[2].color = "#fff";
      } else if (e == 1) {
        options[0].back = "url(" + require("../../assets/control/option1.png") + ")";
        options[1].back = "url(" + require("../../assets/control/option2x.png") + ")";
        options[2].back = "url(" + require("../../assets/control/option3.png") + ")";
        options[0].color = "#fff";
        options[1].color = "#00e2ff";
        options[2].color = "#fff";
      } else if (e == 2) {
        options[0].back = "url(" + require("../../assets/control/option1.png") + ")";
        options[1].back = "url(" + require("../../assets/control/option2.png") + ")";
        options[2].back = "url(" + require("../../assets/control/option3x.png") + ")";
        options[0].color = "#fff";
        options[1].color = "#fff";
        options[2].color = "#00e2ff";
      }
    }
  }
};
</script>

<style scoped lang="less">
.navBar {
  text-align: center;
  .size(100%; 140px);
  .font(30px; #fff);
  border-bottom: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto auto auto;
  .nameAndout {
    .titleBox {
      width: 42%;
      height: 110px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: center;
      .title {
        font-weight: bolder;
        position: relative;
        top: 23px;
      }
      .options {
        display: flex;
        width: 84%;
        height: 40px;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .option {
          height: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
