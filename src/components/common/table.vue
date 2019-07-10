<template>
  <div class="tableModule" :style="{ height: moduleHeight, marginTop: moduleMt }">
    <div class="titleBox" :style="{ height: titleHeight }">
      <div class="title"
        v-for="(title, index) in tableTitle"
        :key="index">
          {{ title }}
      </div>
    </div>
    <div class="tableContent" :style="{ height: tableHeight }">
      <div class="content"
        :style="{ height: contentHeight }"
        v-for="(article, index) in record" 
        :key="index" 
        @click="pointEvent(index)">
        <p class="num">{{ article.number }}</p>
        <div class="descBox">
          <p class="desc">{{ article.desc }}</p>
          <p class="handle cc">{{ article.handle }}</p>
        </div>
        <p class="link" :style="{ backgroundImage: article.link }"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    tableTitle: {
      type: Array,
      default: () => {
        return [];
      }
    },
    record: {
      type: Array,
      default: () => {
        return [];
      }
    },
    contentHeight: {
      type: String,
      default: "15%"
    },
    titleHeight: {
      type: String,
      default: "10%"
    },
    tableHeight: {
      type: String,
      default: "90%"
    },
    moduleHeight: {
      type: String,
      default: "100%"
    },
    moduleMt: {
      type: String,
      default: "4%"
    }
  },
  data() {
    return {
      passAlert: {
        pointId: null,
        showAlert: true
      }
    }
  },
  computed: {
    ...mapState({
      alarmList: state => state.control.alarmList,
      emergencyList: state => state.control.emergencyList,
      otherList: state => state.control.otherList
    })
  },
  methods: {
    pointEvent(index) {
      // 取当前areaId 地点 时间
      const alarmList = this.alarmList;
      const currentAreaId = alarmList[index].areaId;
      const currentAddress = alarmList[index].eventAddr;
      const currentTime = alarmList[index].happenedTime;
      //把当前地址和时间存起来
      this.$store.dispatch("saveAddressTime", { currentAddress: currentAddress, currentTime: currentTime });

      // 去请求紧急联系人接口 - 附近人员 - 附近资源车辆
      this.$store.dispatch("_emergencyContact", { organizationId: 1, areaId: currentAreaId, groupId: 2, layerTypeId: 11 })
      this.passAlert.pointId = index;
      const passAlert = this.passAlert;
      this.$store.dispatch("showAlert", passAlert);
    }
  }
}
</script>

<style lang="less" scoped>
  .tableModule {
    color: #ffffff;
    width: 83%;
    // height: 100%;
    // background: red;
    // margin-top: 4%;
    .titleBox {
      display: flex;
      // height: 10%;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #31416d;
      .title {
        font-size: 18px;
        color: #ffffff;
      }
    }
    // 超出滚动
    .tableContent::-webkit-scrollbar {
      display: none;
    }
    .tableContent {
      // height: 90%;
      width: 100%;
      // 超出滚动
      overflow-y: scroll;
      .content {
        // height: 15%;
        width: 100%;
        border-bottom: 1px solid #31416d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .num {
          font-size: 16px;
          color: white;
        }
        .descBox {
          width: 60%;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .desc {
            width: 60%;
            font-size: 16px;
            color: white;
            margin-right: 5%;
            // 超出宽度文字...
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .handle {
            font-size: 16px;
            color: white;
            width: 36%;
            height: 50%;
            background: #6e2c63;
            border-radius: 5px;
          }
        }
        .link {
          width: 6%;
          height: 38%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: relative;
          right: 2%;
        }
      }
    }
  }
</style>
