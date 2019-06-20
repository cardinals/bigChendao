<template>
  <!-- 此可以当做一个组件 暴露数据 宽高 isActive接口-->
  <div class="layerContent" :style="{ width: width, height: height, marginTop: marginTop }">
    <div
      :style="{ height: oneHeight }"
      class="everyOne" 
      v-for="(name, index) in datas"
      :key="index" 
      @click="layerEvent(index)">
      <div class="img" 
        :style="{ backgroundImage: name.isActive ? name.link : name.link1, marginLeft: name.marginLeft, width: name.width, height: name.height }" />
      <div class="name" :style="{ color: name.isActive ? name.textColor : name.textColor1 }">{{ name.name }}</div>
      <span class="ratio" v-if="isRatio">{{ name.ratio }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    datas: {
      type: Array,
      default: () => {
        return [];
      }
    },
    width: {
      type: String,
      default: "57%"
    },
    height: {
      type: String,
      default: "90%"
    },
    oneHeight: {
      type: String,
      default: "20%"
    },
    marginTop: {
      type: String,
      default: "10%"
    },
    isRatio: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    layerEvent(index) {
      this.datas[index].isActive = !this.datas[index].isActive;
    },
    resetChecked(newValue) {
      const datas = this.datas;
      if (newValue == 0) {
        datas.map(name => {
          name.isActive = true;
        });
      } else if (newValue == 1) {
        datas.map(name => {
          name.isActive = false;
        });
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
  color: white;
  // margin-top: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .everyOne {
    width: 50%;
    // height: 20%;
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
      margin-right: 5%;
      font-size: 15px;
      margin-left: 1%;
    }
    .ratio {
      color: #00e2ff;
      font-size: 18px;
    }
  }
}
</style>
