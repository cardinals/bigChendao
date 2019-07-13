<template>
  <div class="selectBox" :style="{ width: width, height: height }">
    <div class="show" @click="pointer">
      <div class="text">{{ title }}</div>
      <div class="jiao" :style="{ backgroundImage: jiaoBack }"></div>
    </div>
    <transition name="el-zoom-in-bottom">
      <div class="hiddenBox" v-if="isClick" @mouseenter="onenter">
        <div class="hiddenHeader">
          <div class="all cc" @click="allSelect">
            <!-- <input class="mt10" type="checkbox" name=""> -->
            <span>全选</span>
          </div>
          <div class="sure" @click="sure">确认</div>
        </div>
        <div class="hidden">
          <div class="hiddenItem" v-for="(item, index) in data" :key="index" @click="selectOption(item)">
            <p class="cc ppp" @click="pointBoss(item)">
              <!-- <input class="mt10" type="checkbox" :checked="item.ischeck" name="" id=""> -->
              <span>{{ item.name }}</span>
            </p>
            <div class="itemitem cc" v-for="(e, num) in item.children" :key="num" @click="pointE(e)">
              <input class="mt10" type="checkbox" :checked="e.ischeck" name="" id="">
              <span>{{ e.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "45%"
    },
    height: {
      type: String,
      default: "100%"
    },
    option: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      isClick: false,
      jiaoBack: "url(" + require("../../assets/event/jiao.png") + ")",
      title: "请选择",
      sendPeopleId: []
    };
  },
  methods: {
    // 请求预案
    pointer() {
      const self = this;
      this.isClick = !this.isClick;
      this.$store.dispatch("_allPeopleId", {
        organizationId: self.$store.state.init.organizationId
      });
    },
    selectOption(item) {},
    onenter() {
      this.isClick = true;
    },
    onleave() {
      this.isClick = false;
    },

    // 点选每一个人
    pointE(e) {
      console.log(e);
      e.ischeck = !e.ischeck
      let data = this.$store.state.eventAlert.departmentMens;
      let _sendPeopleId = []
      data.map(item => {
        // if (item.ischeck == false) { continue; }
        item.children.map(e => {
          if (e.ischeck) {
            _sendPeopleId.push(e.id);
          }
        })
      })
      this.sendPeopleId = Array.from(new Set(_sendPeopleId));
      console.log(this.sendPeopleId, "每一个")
    },
    // 点类
    pointBoss(item) {
      console.log(item, '1213')
      let everyBooleany = false;
      let everyBooleann = false;
      let someBoolean = false;
      item.ischeck = !item.ischeck;
      let data = this.$store.state.eventAlert.departmentMens;
      let _sendPeopleId = [];
      everyBooleany = item.children.every(e => {
        return e.ischeck == true
      })
      everyBooleann = item.children.every(e => {
        return e.ischeck == false
      })
      someBoolean = item.children.some(e => {
        return e.ischeck == false
      })
      if (everyBooleany) {
         item.children.map(e => {
           e.ischeck = false
         })
      }
      if (everyBooleann) {
        item.children.map(e => {
          e.ischeck = true
        })
      }
      if (someBoolean) {
        item.children.map(e => {
          e.ischeck = true
        })
      }
      data.map(item => {
        item.children.map(e => {
          if (e.ischeck) {
            _sendPeopleId.push(e.id);
          }
        })
      })
      this.sendPeopleId = Array.from(new Set(_sendPeopleId));
      console.log(this.sendPeopleId, 'boss')
    },
    // 确定
    sure() {
      const self = this;
      this.isClick = false
      this.$store.dispatch("_saveDisposalParamSendId", self.sendPeopleId);
    },
    // 所有全选
    allSelect() {
      let data = this.$store.state.eventAlert.departmentMens;
      let _sendPeopleId = [];
      data.map(item => {
        item.ischeck = !item.ischeck
        item.children.map(e => {
          e.ischeck = !e.ischeck
          if (e.ischeck) {
            _sendPeopleId.push(e.id)
          }
        })
      }) 
      this.sendPeopleId = Array.from(new Set(_sendPeopleId));
      console.log(this.sendPeopleId, 'all')
    }
  }
};
</script>

<style lang="less" scoped>
.selectBox {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  .show {
    width: 100%;
    height: 100%;
    background: #585c6a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 3px;
    .text {
      font-size: 16px;
      color: #d2d2d2;
      margin-left: 13%;
    }
    .jiao {
      width: 9%;
      height: 34%;
      margin-right: 13%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .hiddenBox {
    width: 100%;
    position: absolute;
    bottom: 100%;
    .hiddenHeader {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d2d2d2;
      background: #585c6a;
      .all {
        width: 40%;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .sure {
        width: 30%;
        cursor: pointer;
      }
      .all:hover {
        background: #898a8e;
      }
      .sure:hover {
        background: #898a8e;
      }
    }
    .hidden {
      width: 100%;
      .hiddenItem {
        width: 100%;
        height: 100%;
        background: #585c6a;
        border-bottom: 1px solid #d2d2d2;
        color: #d2d2d2;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        .ppp:hover {
          background: #898a8e;
          input {
            cursor: pointer;
          }
        }
        .itemitem {
          margin-left: 46%;
          width: 70%;
          display: flex;
          justify-content: flex-start;
          input {
            cursor: pointer;
          }
        }
        .itemitem:hover {
          background: #898a8e;
        }
      }
    }
  }
}
</style>
