<template>
  <newLayout>
    <div class="contentHeader" slot="headRight">
      <div class="headerItem lefts">
        <el-badge :value="7" class="item">
          <i class="el-icon-message-solid massage"></i>
        </el-badge>
      </div>
      <span class="headerItem">
        <img src="../../assets/icon/logout2.png" alt="" />
      </span>
      <span class="headerItem">
        <img src="../../assets/icon/user1.png" alt="" />
        <span>苏安</span>
      </span>
    </div>

    <div slot="menu">
      <newMenu :list="list" />
    </div>

    <!--<span class="headTitle" slot="headCenter">大陈岛应急管理平台</span>-->

    <div class="contentBox" slot="content">
      <div class="viewContent">
        <breadcrumb />
        <router-view />

      </div>

      <div class="viewBottomText">
        <!--Copyright ©2018 中国电信股份有限公司浙江分公司云计算分公司 & 浙江公众信息产业有限公司-->
        Copyright ©2019 中国电信股份有限公司浙江分公司 & 浙江省公众信息产业有限公司
      </div>
    </div>
  </newLayout>
</template>

<script>
import { newLayout, newMenu } from "@/components/antd";
// import menu from '@/components/menu'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: { newLayout, newMenu ,Breadcrumb},
  data() {
    return {
        navlist:[

        ],
      list: [
        { key: "console", title: "控制台",  },//icon: "home"
        {
          key: "dataManage",
          title: "地图管理",
          // icon: "area-chart",
          children: [
            {key: "mapManagement/lower",title: "底图管理"},
            { key: "mapManagement/layer", title: "图层管理" }
          ]
        },
        { key: "userInfo", title: "个人信息",},// icon: "user"
        {
          key: "system",
          title: "系统设置",
          // icon: "setting",
            children: [
                {
                    key: "dataResource",
                    title: "数据资源",
                    children: [
                        { key: "baseResource", title: "基础资源数据" },
                        { key: "collectSystem", title: "网络采集系统" },
                        { key: "ownSystem", title: "自有系统数据" },

                    ]
                },
                { key: "touristFlow", title: "数据源" }
            ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.headTitle {
  font-size: 20px;
  font-weight: bold;
}
.contentHeader {
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 64px;
  padding-right: 68px;
}
.headerItem {
  margin: 0 15px;
  cursor: pointer;
  display: inline-block;
  line-height: 16px;
}
.headerItem img {
  width: 16px;
  height: 16px;
  margin: 0 5px;
  position: relative;
  top: -1px;
}
.contentBox {
  width: calc(100% - 200px);;
  position: absolute;
  top: 64px;
  left: 200px;
  height: calc(100% - 64px);
  background-color: #ffffff;
}
.breadcrumbBox {
  border-top: 1px solid #f0f2f5;
  padding: 5px 10px;
}

.viewContent {
  .size(calc(100% - 20px) ; calc(100% - 65px));
  .margin(10px);
  /*position: relative;*/
}
.viewBottomText {
  .size(100%;20px);
  .font(12px; #000;);
  .lineHeight(20px);
  text-align: center;
  /*position: absolute;*/
  /*bottom: 0px;*/

}
  .massage {
    font-size: 20px;
    display: inline-block;
    height: 0;
    line-height: 0;
  }
  .contentHeader .lefts {
    padding-right: 20px;
  }
</style>
