<template>
  <div class="layerContent">
    <div class="everyOne" v-for="(name, index) in names" :key="index" @click="layerEvent(index)">
      <div class="img" 
        :style="{ backgroundImage: name.isActive ? name.link : name.link1, marginLeft: name.marginLeft, width: name.width, height: name.height }" />
      <div class="name" :style="{ color: name.isActive ? name.textColor : name.textColor1 }">{{ name.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      names: [
        {
          link: "url(" + require("../../assets/control/layer1.png") + ")",
          link1: "url(" + require("../../assets/control/layer1x.png") + ")",
          isActive: true,
          name: "事件",
          marginLeft: "",
          width: "24%",
          height: "100%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        },
        {
          link: "url(" + require("../../assets/control/layer2.png") + ")",
          link1: "url(" + require("../../assets/control/layer2x.png") + ")",
          isActive: true,
          name: "监控",
          marginLeft: "25%",
          width: "26%",
          height: "100%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        },
        {
          link: "url(" + require("../../assets/control/layer3.png") + ")",
          link1: "url(" + require("../../assets/control/layer3x.png") + ")",
          isActive: true,
          name: "设备",
          marginLeft: "",
          width: "23%",
          height: "100%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        },
        {
          link: "url(" + require("../../assets/control/layer4.png") + ")",
          link1: "url(" + require("../../assets/control/layer4x.png") + ")",
          isActive: true,
          name: "Wi-Fi",
          marginLeft: "25%",
          width: "24%",
          height: "80%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        },
        {
          link: "url(" + require("../../assets/control/layer5.png") + ")",
          link1: "url(" + require("../../assets/control/layer5x.png") + ")",
          isActive: true,
          name: "景点",
          marginLeft: "",
          width: "23%",
          height: "100%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        },
        {
          link: "url(" + require("../../assets/control/layer6.png") + ")",
          link1: "url(" + require("../../assets/control/layer6x.png") + ")",
          isActive: true,
          name: "路灯",
          marginLeft: "25%",
          width: "18%",
          height: "100%",
          textColor: '#fff',
          textColor1: '#fdc43b'
        }
      ]
    };
  },
  methods: {
    layerEvent(index) {
      this.names[index].isActive = !this.names[index].isActive
    },
    resetChecked(newValue) {
      const names = this.names;
      if (newValue == 0) {
        names.map(name => {
          name.isActive = true;
        })
      } else if (newValue == 1) {
        names.map(name => {
          name.isActive = false;
        })
      }
    }
  },
  computed: {
    ...mapState({
      layerNumber: state => state.control.layerNumber
    })
  },
  watch: {
    layerNumber(newValue, oldValue) {
      if (newValue != oldValue) {
        this.resetChecked(newValue);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.layerContent {
  // width: 227px;
  // height: 128px;
  width: 57%;
  height: 100%;
  // background: red;
  color: white;
  margin-top: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .everyOne {
    width: 50%;
    height: 20%;
    // background: black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .img {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 7%;
    }
    .name {
      width: 40%;
      font-size: 15px;
      margin-left: 1%;
    }
  }
}
</style>
