<template>
  <div class="tableModule">
    <div class="titleBox">
      <div class="title"
        v-for="(title, index) in tableTitle"
        :key="index">
          {{ title }}
      </div>
    </div>
    <div class="tableContent">
      <div class="content" 
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
  methods: {
    pointEvent(index) {
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
    height: 100%;
    // background: red;
    margin-top: 4%;
    .titleBox {
      display: flex;
      height: 10%;
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
      height: 90%;
      width: 100%;
      // 超出滚动
      overflow-y: scroll;
      .content {
        height: 15%;
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
