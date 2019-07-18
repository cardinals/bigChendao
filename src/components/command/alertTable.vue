<template>
  <div class="alertTable cc">
    <div 
      class="horn"
      v-for="(horn, index) in alerts.horns"
      :key="index"
      :style="horn" />
      <div class="content cc">
        <div class="light" :style="{ backgroundImage: alerts.light }" />
        <div class="off" :style="{ backgroundImage: alerts.off }" @click="offAlert" />
        <titleModule :title="title" width="50%" />
        <commandTable />
      </div>
  </div>
</template>

<script>
import titleModule from "@/components/alertControl/titleModule"
import commandTable from "./table"
export default {
  components: { titleModule, commandTable },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      alerts: {
        horns: [
          {
            backgroundImage:
              "url(" + require("../../assets/event/horn1.png") + ")",
            position: "absolute",
            top: "-3%",
            left: "-2%"
          },
          {
            backgroundImage:
              "url(" + require("../../assets/event/horn2.png") + ")",
            position: "absolute",
            top: "-3%",
            right: "-2%"
          },
          {
            backgroundImage:
              "url(" + require("../../assets/event/horn4.png") + ")",
            position: "absolute",
            bottom: "-3%",
            left: "-2%"
          },
          {
            backgroundImage:
              "url(" + require("../../assets/event/horn3.png") + ")",
            position: "absolute",
            bottom: "-3%",
            right: "-2%"
          }
        ],
        light: "url(" + require('../../assets/event/light.png') + ")",
        off: "url(" + require('../../assets/event/off.png') + ")"
      }
    };
  },
  methods: {
    offAlert() {
      const passAlert = { showAlert: false };
      this.$store.dispatch("saveTableAlertValue", null);
    }
  }
};
</script>

<style lang="less" scoped>
.alertTable {
  pointer-events: auto;
  width: 71%;
  height: 95%;
  // background: #ffffff;
  position: absolute;
  top: -4%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 999;
  .horn {
    width: 5%;
    height: 8%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .content {
    width: 96%;
    height: 94%;
    border: 1px solid #103da6;
    background: linear-gradient(to right, #02143a, #02020f);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .light {
      width: 68%;
      height: 4%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .off {
      width: 2%;
      height: 3%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      right: 0;
      margin: 1%;
      cursor: pointer;
      z-index: 999;
    }
  }
}
</style>
