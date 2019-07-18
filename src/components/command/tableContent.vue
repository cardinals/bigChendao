<template>
  <div class="tableContent">
    <div class="header">
      <div class="cc headerOne" v-for="(item, index) in titles" :key="index" :style="{ width: item.width, height: item.height }">{{ item.name }}</div>
    </div>
    <div class="list">
      <div class="id"></div>
      <div class="number"></div>
      <div class="address"></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        { name: '序号',  width: '8%', height: '100%' },
        { name: '事件编号',  width: '8%', height: '100%' },
        { name: '事件发生地',  width: '13%', height: '100%' },
        { name: '事件名称',  width: '13%', height: '100%' },
        { name: '事件分组',  width: '8%', height: '100%' },
        { name: '事件状态',  width: '8%', height: '100%' },
        { name: '完结描述',  width: '15%', height: '100%' },
        { name: '发生时间',  width: '19%', height: '100%' },
        { name: '操作',  width: '8%', height: '100%' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .tableContent::-webkit-scrollbar {
    display: none;
  }
  .tableContent {
    width: 100%;
    height: 80%;
    background: #163040;
    overflow-y: scroll;
    .header {
      width: 100%;
      height: 7%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #ffffff;
      .headerOne {
        border: 1px solid #ffffff;
      }
    }
  }
</style>
