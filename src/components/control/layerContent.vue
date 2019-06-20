<template>
  <div class="layerContent">
    <div class="everyOne" v-for="(name, index) in names" :key="index">
      <div class="img" 
        :style="{ backgroundImage: name.link, marginLeft: name.marginLeft, width: name.width }" />
      <div class="name">{{ name.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: [
        {
          link: "url(" + require("../../assets/control/layer1.png") + ")",
          name: "事件",
          marginLeft: '',
          width: '22%'
        },
        {
          link: "url(" + require("../../assets/control/layer2.png") + ")",
          name: "监控",
          marginLeft: '25%',
          width: '23%'
        },
        {
          link: "url(" + require("../../assets/control/layer3.png") + ")",
          name: "设备",
          marginLeft: '',
          width: '23%'
        },
        {
          link: "url(" + require("../../assets/control/layer4.png") + ")",
          name: "Wi-Fi",
          marginLeft: '25%',
          width: '26%'
        },
        {
          link: "url(" + require("../../assets/control/layer5.png") + ")",
          name: "景点",
          marginLeft: '',
          width: '23%'
        },
        {
          link: "url(" + require("../../assets/control/layer6.png") + ")",
          name: "路灯",
          marginLeft: '25%',
          width: '18%'
        },
      ]
    }
  }
}
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
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 5%;
      }
      .name {
        width: 40%;
        font-size: 15px;
        color: white;
        margin-left: 1%;
      }
    }
  }
</style>
