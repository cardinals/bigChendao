<template>
  <div class="planMan">
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
      <div :class="this.$store.state.eventAlert.planOrmanOrNoNumber == 0 ? 'section1' : 'section11' ">
        <div class="top">
          <div class="s1name">{{ content.section1.title }}</div>
          <div class="selectBox">
            <selects1 :data="this.$store.state.eventAlert.planGroup" />
            <selects2 :data="this.$store.state.eventAlert.planSelf" v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 0" />
          </div>
        </div>
        <div class="bottomBox" v-if="this.$store.state.eventAlert.planOrmanOrNoNumber == 0">
          <div class="bottom" v-for="(item, index) in content.section1.text" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="section2">
        <div class="section2Top">
          <div class="section2Title">{{ content.section2.title }}</div>
          <div class="section2short cc">
            <input type="radio" id="radis" :checked="true">
            <label for="radis"><span>{{ content.section2.short[0] }}</span></label>
          </div>
          <div class="edit" :style="{ backgroundImage: content.section2.edit }" @click="editEvent"></div>
        </div>
        <div class="section2BottomBox">
          <div class="title">{{ content.section2.short[1] }}</div>
          <textarea :class="isTextArea ? 'noback' : '' " :disabled="isTextArea ? 'disabled' : false " class="section2Bottom cc" v-model="content.section2.text"></textarea>
        </div>
      </div>
      <div class="section3">
        <div class="section3Top">{{ content.section3.title[0] }}</div>
        <div class="section3Bottom">
          <div class="section3Title">{{ content.section3.title[1] }}</div>
          <div class="contentBox">
            <div class="section3ItemBox">
              <div class="section3Item" v-for="(item, index) in content.section3.list" :key="index">
                <input type="checkbox" :id="index" :checked="item.check" @click="addTwo(item)">
                <span>{{ item.name }}</span>
              </div>
            </div>
            <selects3 width="28%" height="40%" :data="this.$store.state.eventAlert.departmentMens" />
          </div>
        </div>
      </div>
      <div class="btn">
        <div class="btn1 cc" @click="handle">{{ content.btn[0] }}</div>
        <div class="btn2 cc" @click="lastStep">{{ content.btn[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import selects1 from "@/components/common/select"
import selects2 from "@/components/common/select2"
import selects3 from "@/components/common/select3"
export default {
  components: { selects1, selects2, selects3 },
  data() {
    return {
      data3: [
        {
          name: '领导组',
          children: [ { name: '张领导' }, { name: '李领导' }, { name: '王领导' } ]
        },
        {
          name: '技术部',
          children: [ { name: '张技术' }, { name: '李技术' }, { name: '王技术' } ]
        },
        {
          name: '测试部',
          children: [ { name: '张测试' }, { name: '李测试' }, { name: '王测试' } ]
        }
      ],
      checkList: ['请选择分组'],
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
          list: [{ name: "请选择分组", check: true }, { name: "附近人员", check: false }, { name: "附近车辆", check: false }]
        },
        btn: ["处置", "上一步"]
      },
      isTextArea: true
    }
  },
  methods: {
    lastStep() {
      this.$store.dispatch("savePlanOrmanOrNo", 5);
    },
    handle() {
      const self = this;
      this.$store.dispatch("_saveDisposalParamStatus", 1);
      this.$store.dispatch("_saveDisposalParamMassage", self.content.section2.text);
      this.$store.dispatch("_SubmitDisposal", { id: self.$store.state.control.currentEventId, data: self.$store.state.eventAlert.disposalParameters });
      console.log(this.$store.state.eventAlert.disposalParameters, '提交的都是啥')
      this.$store.dispatch("savePlanOrmanOrNo", 3);
    },
    editEvent() {
      this.isTextArea = !this.isTextArea
    },
    addTwo(item) {
      item.check = !item.check
      console.log(item, '附近人员，附近车辆')
      if (item.name == '附近人员' && item.check) {
        this.$store.dispatch("_pushNearby", 'personnel')
      }
      if (item.name == '附近车辆' && item.check) {
        this.$store.dispatch("_pushNearby", 'car')
      }
      if (item.name == '附近人员' && !item.check) {
        this.$store.dispatch("_popNearby", 'personnel')
      }
      if (item.name == "附近车辆" && !item.check) {
        this.$store.dispatch("_popNearby", 'car')
      }
      console.log(this.$store.state.eventAlert.disposalParameters, 'push和pop')
    }
  }
}
</script>

<style lang="less" scoped>
  .planMan {
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
        height: 24%;
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
        height: 30%;
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
              margin-right: 4%;
              cursor: pointer;
              margin-top: 3%;
            }
          }
          .edit {
            height: 76%;
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
            background: transparent;
          }
          .noback {
            background: rgba(255, 255, 255, 0.6);
            color: black;
          }
        }
      }
      .section3 {
        width: 91%;
        height: 28%;
        // background: yellowgreen;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .section3Top {
          width: 100%;
          height: 14%;
          font-size: 20px;
          color: white;
          margin-bottom: 2%;
        }
        .section3Bottom {
          width: 100%;
          height: 67%;
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
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .section3ItemBox {
              width: 25%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              margin-right: 7%;
              margin-left: 5%;
              .section3Item {
                width: 100%;
                font-size: 16px;
                color: white;
                // margin-bottom: 10%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                input {
                  margin-right: 10%;
                }
              }
            }
          }
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
