<template>
  <div class="endBox">
    <div class="out">
      <div class="title" v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 0">预案处理</div>
      <div class="title" v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 1">人工处理</div>
      <div class="waring" :style="{ backgroundImage: out.waring }" />
      <p class="text">{{ out.text }}</p>
    </div>
    <div class="content" :style="{ backgroundImage: content.back }">
      <div class="header">
        <div class="name">{{ content.header[0] }}</div>
        <div class="name">{{ content.header[1] }}</div>
      </div>
      <div class="section11">
        <div class="top">
          <div class="s1name">{{ content.section1.title }}</div>
          <div class="selectBox">
            <selects />
          </div>
        </div>
      </div>
      <div class="section2">
        <div class="section2Top">
          <div class="section2Title">{{ content.section2.title }}</div>
          <div class="section2short cc">
            <input type="radio" id="radis">
            <label for="radis"><span>{{ content.section2.short[0] }}</span></label>
          </div>
        </div>
        <div class="section2BottomBox">
          <div class="title">{{ content.section2.short[1] }}</div>
          <div class="section2Bottom cc">{{ content.section2.text }}</div>
        </div>
      </div>
      <div class="section3">
        <div class="section3Top">{{ content.section3.title[0] }}</div>
        <div class="section3Bottom">
          <div class="section3Title">{{ content.section3.title[1] }}</div>
          <div class="contentBox">
            <p class="p1">
              <span>查看选择分组</span>
              <span>查看名单</span>
            </p>
            <p class="p2">
              <span>附近人员</span>
              <span>附近车辆</span>
            </p>
            <p class="p3">
              <span>所有名单</span>
              <span>查看名单</span>
            </p>
          </div>
        </div>
      </div>
      <div class="section4">
        <div class="section4Top">{{ content.section4.title[0] }}</div>
        <textarea name="" id="" cols="30" rows="10" :placeholder="content.section4.title[1]"></textarea>
      </div>
      <div class="btn">
        <div class="btn1 cc" @click="handle">{{ content.btn[0] }}</div>
        <div class="btn2 cc" @click="lastStep">{{ content.btn[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import selects from "@/components/common/select"
export default {
  components: { selects },
  data() {
    return {
      out: {
        title: "曲院风荷入口",
        waring: "url(" + require('../../assets/event/warning.png') + ")",
        text: "起火了"
      },
      content: {
        back: "url(" + require('../../assets/event/planOrmanBack.png') + ")",
        header: ["预案处理", "待处理"],
        section1: {
          title: "(1) 请选择预案",
          text: ["*预案内容", "(1)给工作人员发短信通知。", "(2)进行500米以内的人员和车辆调度。", "(3)请当日内填写《意外事故记录表》备案。"]
        },
        section2: {
          title: "(2) 请进行操作",
          short: ["短信通知", "短信内容"],
          edit: "url(" + require('../../assets/event/edit.png') + ")",
          text: "【停水停电】尊敬的领导和同事们:因近期雨雪天气,景区内将出现短时停水停电,请知悉。"
        },
        section3: {
          title: ["(3) 发送对象", "快捷选择对象"],
          list: ["请选择分组", "附近人员", "附近车辆"]
        },
        section4: {
          title: ["(4) 请对完结情况描述下", "请输入描述..."]
        },
        btn: ["完成调拨", "上一步"]
      }
    }
  },
  methods: {
    lastStep() {
      this.$store.dispatch("savePlanOrmanOrNo", 3);
    },
    handle() {
      this.$store.dispatch("showAlert", false);
      this.$store.dispatch("savePlanOrmanOrNo", 6);
    }
  }
}
</script>

<style lang="less" scoped>
  .endBox {
    color: white;
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .out {
      height: 6%;
      width: 100%;
      // background: olive;
      margin-bottom: 1.5%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .title {
        font-size: 20px;
        color: white;
        margin-left: 5%;
      }
      .waring {
        height: 100%;
        width: 10%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: 5%;
        margin-right: 5%;
      }
      .text {
        font-size: 24px;
        color: #da5755;
        font-weight: bold;
        position: relative;
        top: 10%;
      }
    }
    .content {
      height: 90%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .header {
        width: 91%;
        height: 11%;
        // background: yellowgreen;
        border-bottom: 1px solid #6e727e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 24px;
          color: white;
          font-weight: bold;
        }
      }
      .section11 {
        width: 91%;
        // height: 20%;
        .top {
          height: 22%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .s1name {
            font-size: 20px;
            color: white;
          }
          .selectBox {
            width: 66%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .bottomBox {
          margin-left: 5%;
          margin-top: 1%;
          .bottom {
            font-size: 16px;
            color: white;
          }
        }
      }
      .section1 {
        width: 91%;
        height: 20%;
        margin-bottom: 2%;
        // background: yellowgreen;
        .top {
          height: 22%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1%;
          .s1name {
            font-size: 20px;
            color: white;
          }
          .selectBox {
            width: 66%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        .bottomBox {
          margin-left: 5%;
          margin-top: 1%;
          .bottom {
            font-size: 16px;
            color: white;
          }
        }
      }
      .section2 {
        width: 91%;
        height: 22%;
        margin-bottom: 2%;
        // background: yellowgreen;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .section2Top {
          width: 100%;
          height: 22%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .section2Title {
            font-size: 20px;
            color: white;
          }
          .section2short {
            width: 25%;
            font-size: 19px;
            color: white;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            input {
              height: 20px;
              width: 20px;
              margin-right: 4%;
            }
          }
          .edit {
            height: 100%;
            width: 5%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
        .section2BottomBox {
          width: 100%;
          height: 78%;
          .title {
            font-size: 16px;
            color: #ffffff;
            margin-left: 2%;
            margin-top: 1%;
            margin-bottom: 1%;
          }
          .section2Bottom {
            width: 100%;
            height: 68%;
            border: 1px solid #7bd0ea;
            font-size: 14px;
            color: #ffffff;
            padding-left: 5%;
            padding-right: 5%;
          }
        }

      }
      .section3 {
        width: 91%;
        height: 28%;
        margin-bottom: 2%;
        // background: yellowgreen;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .section3Top {
          width: 100%;
          height: 10%;
          font-size: 20px;
          color: white;
          margin-bottom: 2%;
        }
        .section3Bottom {
          width: 100%;
          height: 74%;
          border: 1px solid #7bd0ea;
          .section3Title {
            font-size: 16px;
            color: white;
            height: 32%;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 5%;
          }
          .contentBox {
            height: 68%;
            width: 100%;
            .p1 {
              margin-left: 3%;
            }
            .p1 span:nth-child(1) {
              margin-left: 3%;
              font-size: 16px;
            }
            .p1 span:nth-child(2) {
              font-size: 16px;
              color: #67aec5;
              border-bottom: 1px solid #67aec5;
              cursor: pointer;
              margin-left: 3%;
            }
            .p2 span:nth-child(1) {
              margin-left: 6%;
              font-size: 16px;
            }
            .p2 span:nth-child(2) {
              font-size: 16px;
              margin-left: 6%;
            }
            .p3 span:nth-child(1) {
              margin-left: 6%;
              font-size: 16px;
            }
            .p3 span:nth-child(2) {
              font-size: 16px;
              color: #67aec5;
              border-bottom: 1px solid #67aec5;
              margin-left: 3%;
              cursor: pointer;
            }
          }
        }
      }
      .section4 {
        width: 91%;
        height: 28%;
        // background: yellowgreen;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .section4Top {
          width: 100%;
          height: 10%;
          font-size: 20px;
          color: white;
          margin-bottom: 4%;
        }
        textarea {
          overflow: auto;
          resize: vertical;
          height: 50%;
          width: 100%;
          background: transparent;
          color: white;
          border: 0.1rem solid #7bd0ea;
        }
      }
      .btn {
        width: 84%;
        height: 7%;
        // background: yellowgreen;
        margin-bottom: 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn1 {
          width: 40%;
          height: 100%;
          border-radius: 5px;
          background: #1858b8;
          color: white;
          font: 18px;
          cursor: pointer;
        }
        .btn2 {
          width: 40%;
          height: 100%;
          border-radius: 5px;
          background: transparent;
          color: white;
          border: 1px solid #1858b8;
          font: 18px;
          cursor: pointer;
        }
      }
    }
  }
</style>
