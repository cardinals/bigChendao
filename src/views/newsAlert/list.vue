<template>
  <div class="newAlertList">
    <div class="everyList" v-for="(list, index) in lists" :key="index">
      <div class="listTop">
        <div class="titleDesc">
          <p class="title">【{{ list.title }}】</p>
          <p class="desc">{{ list.desc }}</p>
        </div>
        <p class="status0 cc" v-if="list.status == 0">待处理</p>
        <p class="status1 cc" v-if="list.status == 1">处置中</p>
        <p class="status2 cc" v-if="list.status == 2">已完结</p>
      </div>
      <div class="listBottom">
        <p class="num">{{ list.num }}</p>
        <p class="time">{{ list.time }}</p>
        <p class="add">{{ list.add }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          title: "指挥事件",
          desc: "游客掉进西湖1！！！",
          num: "0001",
          time: "2018-08-12 12:18:56",
          add: "断桥入口处",
          status: 0
        },
        {
          title: "指挥事件",
          desc: "游客掉进西湖2！！！",
          num: "0002",
          time: "2018-08-12 12:18:56",
          add: "断桥入口处",
          status: 1
        },
        {
          title: "指挥事件",
          desc: "游客掉进西湖3！！！",
          num: "0003",
          time: "2018-08-12 12:18:56",
          add: "断桥入口处",
          status: 2
        },
        {
          title: "指挥事件",
          desc: "游客掉进西湖4！！！",
          num: "0004",
          time: "2018-08-12 12:18:56",
          add: "断桥入口处",
          status: 0
        },
        {
          title: "指挥事件",
          desc: "游客掉进西湖4！！！",
          num: "0005",
          time: "2018-08-12 12:18:56",
          add: "断桥入口处",
          status: 0
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .newAlertList {
    color: #ffffff;
    width: 92%;
    height: 79%;
    // background: goldenrod;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .everyList {
      width: 100%;
      height: 18%;
      // background: red;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      border: 1px solid #7bd0ea;
      border-radius: 5px;
      .listTop {
        width: 100%;
        height: 65%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .titleDesc {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .title {
            color: white;
            font-size: 30px;
          }
          .desc {
            color: white;
            font-size: 30px;
          }
        }
        .status0 {
          width: 7%;
          height: 38%;
          background: #9f1e4c;
          border-radius: 5px;
          margin-right: 3%;
        }
        .status1 {
          width: 7%;
          height: 38%;
          background: #335a48;
          border-radius: 5px;
          margin-right: 3%;
        }
        .status2 {
          width: 7%;
          height: 38%;
          background: #625c4a;
          border-radius: 5px;
          margin-right: 3%;
        }
      }
      .listBottom {
        width: 40%;
        height: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 2%;
        .num {
          font-size: 18px;
          color: white;
        }
        .time {
          font-size: 18px;
          color: white;
        }
        .add {
          font-size: 18px;
          color: white;
        }
      }
    }
  }
</style>